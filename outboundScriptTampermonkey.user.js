// ==UserScript==
// @name         Outbound Script Tampermonkey
// @namespace    http://tampermonkey.net/
// @updateURL    https://github.com/Jhoni23/Outbound/blob/main/outboundScriptTampermonkey.user.js
// @downloadURL  https://github.com/Jhoni23/Outbound/blob/main/outboundScriptTampermonkey.user.js
// @version      2025-08-03
// @description  Integração com Firebase no sistema da Amazon com seleção de linha e impressão customizada
// @author       rsanjhon
// @match        https://trans-logistics.amazon.com/ssp/dock/hrz/ob
// @grant        GM_xmlhttpRequest
// @connect      trans-logistics.amazon.com
// @connect      jhoni23.github.io
// ==/UserScript==

(function () {
    'use strict';

    const firebaseScripts = [
        "https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js",
        "https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"
    ];

    const firebaseConfig = {
        apiKey: "AIzaSyB6IcAguk-JBzHTKGgrMyYcz_mYM8lljIE",
        authDomain: "outbound-82fe7.firebaseapp.com",
        databaseURL: "https://outbound-82fe7-default-rtdb.firebaseio.com",
        projectId: "outbound-82fe7",
        storageBucket: "outbound-82fe7.appspot.com",
        messagingSenderId: "581083999271",
        appId: "1:581083999271:web:0f1fcf44cb5e7f9cb37202"
    };

    function loadFirebaseScripts(callback) {
        let loaded = 0;
        firebaseScripts.forEach(src => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                loaded++;
                if (loaded === firebaseScripts.length) callback();
            };
            document.head.appendChild(script);
        });
    }

    loadFirebaseScripts(() => {
        if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

        criarCookie();

        function criarCookie() {
            const nomeCookie = "dadosLinha";
            const cookieExiste = document.cookie
                .split("; ")
                .some(row => row.startsWith(nomeCookie + "="));

            if (!cookieExiste) {
                const dadosIniciais = {
                    Transportadora: "",
                    Rota: "",
                    Placa: "",
                    Motorista: "",
                    Pallet: "",
                    Scuttles: "",
                    Yard: ""
                };
                const valor = encodeURIComponent(JSON.stringify(dadosIniciais));
                const dias = 7;
                const expira = new Date(Date.now() + dias * 24 * 60 * 60 * 1000).toUTCString();
                document.cookie = `${nomeCookie}=${valor}; expires=${expira}; path=/`;
            }
        }

        function lerCookie() {
            const nomeCookie = "dadosLinha";
            const cookieStr = document.cookie
                .split("; ")
                .find(row => row.startsWith(nomeCookie + "="));

            if (cookieStr) {
                try {
                    const valorCodificado = cookieStr.split("=")[1];
                    return JSON.parse(decodeURIComponent(valorCodificado));
                } catch (e) {
                    console.error("❌ Erro ao decodificar cookie:", e);
                    return null;
                }
            } else {
                console.warn("⚠️ Cookie 'dadosLinha' não encontrado.");
                return null;
            }
        }

        function buscarNomeYard(callback) {
            GM_xmlhttpRequest({
                method: "GET",
                url: "https://trans-logistics.amazon.com/dashboard/v2",
                onload: function(response) {
                    const htmlDaPagina = response.responseText;
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(htmlDaPagina, "text/html");
                    const inputFullName = doc.querySelector('input#fullName');
                    const nome = inputFullName ? inputFullName.value.toUpperCase() : null;
                    callback(nome);
                },
                onerror: function(err) {
                    console.error("Erro ao buscar a página:", err);
                    callback(null);
                }
            });
        }

        function adicionarBotaoValePallet() {
            const container = document.querySelector(".actionButtonItems.floatL.backGroundNone");
            if (!container || container.querySelector(".btnValePallet")) return;

            const novoBotao = document.createElement("a");
            novoBotao.href = "javascript:void(0)";
            novoBotao.title = "Vale Pallet";
            novoBotao.className = "btnValePallet aluiBtn standardBtn floatL";
            novoBotao.textContent = "Vale Pallet";

            novoBotao.addEventListener("click", () => {
                const dados = lerCookie();
                if (!dados || !dados.Transportadora) {
                    alert("⚠️ Nenhuma linha selecionada.");
                    return;
                }

                GM_xmlhttpRequest({
                    method: "GET",
                    url: "https://jhoni23.github.io/Outbound/",
                    onload: function (response) {
                        let html = response.responseText;

                        html = html.replace(/{{TRANSPORTADORA}}/gi, dados.Transportadora || "")
                            .replace(/{{ROTA}}/gi, dados.Rota || "")
                            .replace(/{{PLACA}}/gi, dados.Placa || "")
                            .replace(/{{MOTORISTA}}/gi, dados.Motorista || "")
                            .replace(/{{YARD}}/gi, dados.Yard || "")
                            .replace(/{{PALLET}}/gi, dados.Pallet || "")
                            .replace(/{{SCUTTLES}}/gi, dados.Scuttles || "");

                        // Cria um iframe oculto para impressão
                        const iframe = document.createElement("iframe");
                        iframe.style.position = "fixed";
                        iframe.style.right = "0";
                        iframe.style.bottom = "0";
                        iframe.style.width = "0";
                        iframe.style.height = "0";
                        iframe.style.border = "0";
                        document.body.appendChild(iframe);

                        const doc = iframe.contentWindow.document;
                        doc.open();
                        doc.write(html);
                        doc.close();

                        iframe.onload = function () {
                            iframe.contentWindow.focus();
                            iframe.contentWindow.print();
                            setTimeout(() => document.body.removeChild(iframe), 1000);
                        };
                    },
                    onerror: function (err) {
                        console.error("Erro ao buscar HTML para impressão:", err);
                        alert("Erro ao carregar conteúdo da impressão.");
                    }
                });
            });

            container.appendChild(novoBotao);
        }

        function contarGaylords(linha) {
            return new Promise((resolve, reject) => {
                const linhaSelecionada = linha;
                const tdLoadId = linhaSelecionada.querySelector('td.loadIdCol');
                const loadId = tdLoadId?.textContent.trim() || "";

                const trailerSpan = linhaSelecionada.querySelector('span.trailerNo');
                const trailerId = trailerSpan?.getAttribute("rel") || "";

                const planId = linhaSelecionada.getAttribute("data-planid") || "";
                const loadGroupId = linhaSelecionada.getAttribute("data-loadgroupid") || "";
                const vrId = linhaSelecionada.getAttribute("data-vrid") || "";

                const params = new URLSearchParams({
                    entity: "getOutboundLoadContainerDetails",
                    nodeId: "GRU8",
                    loadGroupId: loadGroupId,
                    planId: planId,
                    vrId: vrId,
                    status: "",
                    trailerId: trailerId,
                    trailerNumber: ""
                }).toString();

                GM_xmlhttpRequest({
                    method: "POST",
                    url: "https://trans-logistics.amazon.com/ssp/dock/hrz/ob/fetchdata",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "X-Requested-With": "XMLHttpRequest"
                    },
                    data: params,
                    onload: function(response) {
                        try {
                            const responseText = response.responseText;
                            const responseJSON = typeof responseText === "string" ? JSON.parse(responseText) : responseText;

                            function contarPalletsEGaylords(nodes) {
                                let gaylordCount = 0;

                                function percorrer(lista) {
                                    lista.forEach(node => {
                                        if (node.container) {
                                            const tipo = node.container.contType || "";
                                            if (tipo === "GAYLORD") {
                                                gaylordCount++;
                                            }
                                        }
                                        if (node.childNodes && node.childNodes.length > 0) {
                                            percorrer(node.childNodes);
                                        }
                                    });
                                }

                                percorrer(nodes);
                                return { gaylordCount };
                            }

                            const nodes = responseJSON.ret?.aaData?.ROOT_NODE || [];
                            const total = contarPalletsEGaylords(nodes);
                            resolve(total); // <- Aqui resolve a Promise
                        } catch (e) {
                            reject(e); // Se JSON falhar
                        }
                    },
                    onerror: function(err) {
                        reject(err); // <- Aqui rejeita a Promise
                    }
                });
            });
        }

        function traduzirCampos() {
            document.querySelectorAll('.DataTables_sort_wrapper').forEach(el => {
                for (let node of el.childNodes) {
                    if (node.nodeType === Node.TEXT_NODE && node.textContent.includes('Equipment Type')) {
                        node.textContent = node.textContent.replace('Equipment Type', 'Tipologia');
                        break;
                    }
                }
            });

            document.querySelectorAll('div.capitalizeWord').forEach(div => {
                const texto = div.textContent.trim();
                const traducoes = {
                    "Progress": "Progreso",
                    "twenty six foot box truck": "TRUCK",
                    "forty eight foot truck": "CARRETA",
                    "twenty foot box truck": "TOCO",
                    "forty foot truck": "VUC",
                    "fourteen foot van": "3/4",
                };
                if (traducoes[texto]) {
                    div.textContent = traducoes[texto];
                }
            });
        }

        function removerTermos() {
            document.querySelectorAll('td div[title][alt]').forEach(div => {
                if (div.textContent.trim() === '[ATS_CONTRACTED]') {
                    div.remove();
                }
            });

            document.querySelectorAll('span.trailerNo').forEach(span => {
                if (span.textContent.includes('OTHR')) {
                    span.textContent = span.textContent.replace('OTHR', '').trim();
                }
            });
        }

        function adicionarColunaMotorista() {
            const tabela = document.querySelector('table#dashboard');
            if (!tabela) return;

            const thTrailer = tabela.querySelector('thead th.trailerIdCol');
            if (thTrailer && !tabela.querySelector('th.motoristaCol')) {
                const thMotorista = document.createElement('th');
                thMotorista.className = 'motoristaCol ui-state-default';
                thMotorista.style.width = '10%';
                thMotorista.innerHTML = '<div class="DataTables_sort_wrapper">Motorista<span class="DataTables_sort_icon css_right ui-icon ui-icon-carat-2-n-s"></span></div>';
                thTrailer.insertAdjacentElement('afterend', thMotorista);
            }

            tabela.querySelectorAll('tbody tr').forEach(tr => {
                if (!tr.querySelector('td.motoristaCol')) {
                    const tdMotorista = document.createElement('td');
                    tdMotorista.className = 'motoristaCol';
                    tdMotorista.textContent = '—';

                    const tdTrailer = tr.querySelector('td.trailerNumCol');
                    if (tdTrailer) {
                        tdTrailer.insertAdjacentElement('afterend', tdMotorista);

                        const trailerId = tdTrailer.querySelector('span.trailerNo')?.textContent.trim();
                        if (trailerId) {
                            firebase.database().ref("motoristas/" + trailerId).once("value").then(snapshot => {
                                const nome = snapshot.val();
                                if (nome) {
                                    tdMotorista.textContent = nome;
                                }
                            });
                        }

                        tdMotorista.addEventListener('click', () => {
                            const trailerId = tdTrailer.querySelector('span.trailerNo')?.textContent.trim();
                            if (!trailerId) return;

                            const input = document.createElement('input');
                            input.type = 'text';
                            input.value = tdMotorista.textContent !== '—' ? tdMotorista.textContent : '';
                            input.style.width = '90%';

                            tdMotorista.textContent = '';
                            tdMotorista.appendChild(input);
                            input.focus();

                            function salvar(nome) {
                                const nomeUpper = nome.trim().toUpperCase();
                                if (nomeUpper) {
                                    firebase.database().ref("motoristas/" + trailerId).set(nomeUpper).then(() => {
                                        console.log(`Salvo no Firebase: ${trailerId} = ${nomeUpper}`);
                                    });
                                } else {
                                    firebase.database().ref("motoristas/" + trailerId).remove().then(() => {
                                        console.log(`Removido do Firebase: ${trailerId}`);
                                    });
                                }
                                tdMotorista.textContent = nomeUpper || '—';
                            }

                            input.addEventListener('keydown', async (e) => {
                                if (e.key === 'Enter') {
                                    salvar(input.value);
                                } else if (e.key === 'Escape') {
                                    tdMotorista.textContent = input.value || '—';
                                }
                            });

                            input.addEventListener('blur', () => {
                                salvar(input.value);
                            });
                        });
                    }
                }
            });
        }

        function adicionarEventoCliqueNasLinhas() {
            const linhas = document.querySelectorAll("table#dashboard tbody tr");

            linhas.forEach(linha => {
                if (linha.dataset.listenerAdicionado === "true") return; // Evita múltiplos binds

                linha.dataset.listenerAdicionado = "true"; // Marca a linha como tratada

                linha.addEventListener("click", () => {
                    setTimeout(() => {
                        const linhaSelecionada = document.querySelector('tr.selectedTableRow');
                        if (!linhaSelecionada) return;

                        const goodLaneSpan = linhaSelecionada.querySelector('span.goodLane');
                        const rota = goodLaneSpan?.className.match(/laneGRU8-([A-Z0-9]+)/)?.[1] || "";

                        const tdLoadId = linhaSelecionada.querySelector('td.loadIdCol');
                        const tdTransportadora = tdLoadId?.nextElementSibling?.nextElementSibling;
                        const transportadora = tdTransportadora?.textContent.trim() || "";

                        const spanPlaca = linhaSelecionada.querySelector('span.trailerNo');
                        const placa = spanPlaca?.textContent.trim().replace("OTHR", "").trim() || "";

                        const tdMotorista = linhaSelecionada.querySelector('td.motoristaCol');
                        const motorista = tdMotorista?.textContent.trim() || "";

                        const tdTRT = linhaSelecionada.querySelector('td.trtColumn');
                        const tdAnterior = tdTRT?.previousElementSibling;
                        let pallet = tdAnterior?.querySelector('a')?.textContent.trim() || "";
                        if (pallet === "") pallet = "0";

                        contarGaylords(linhaSelecionada).then(({ gaylordCount }) => {
                            const scuttles = gaylordCount;

                            buscarNomeYard(function(nomeYard) {
                                const dados = {
                                    Transportadora: transportadora,
                                    Rota: rota,
                                    Placa: placa,
                                    Motorista: motorista,
                                    Pallet: pallet,
                                    Scuttles: scuttles,
                                    Yard: nomeYard || ""
                                };

                                const nomeCookie = "dadosLinha";
                                const valor = encodeURIComponent(JSON.stringify(dados));
                                const dias = 7;
                                const expira = new Date(Date.now() + dias * 24 * 60 * 60 * 1000).toUTCString();
                                document.cookie = `${nomeCookie}=${valor}; expires=${expira}; path=/`;

                                console.table(dados);
                                adicionarBotaoValePallet();
                            });
                        });
                    }, 100);
                });
            });
        }

        async function processarPagina() {
            traduzirCampos();
            removerTermos();
            adicionarColunaMotorista();
            adicionarEventoCliqueNasLinhas();
        }

        window.addEventListener('load', () => {
            setTimeout(processarPagina, 1000);
        });

        let debounceTimer = null;
        const observer = new MutationObserver(() => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                processarPagina();
            }, 300);
        });

        observer.observe(document.body, { childList: true, subtree: true });
    });
})();
