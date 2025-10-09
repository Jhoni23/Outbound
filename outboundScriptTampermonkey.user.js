// ==UserScript==
// @name         Outbound 2.0
// @namespace    http://tampermonkey.net/
// @updateURL    https://github.com/Jhoni23/Outbound/raw/refs/heads/main/outboundScriptTampermonkey.user.js
// @downloadURL  https://github.com/Jhoni23/Outbound/raw/refs/heads/main/outboundScriptTampermonkey.user.js
// @version      3.3
// @description  Update Outbound Management System
// @author       rsanjhon
// @match        https://trans-logistics.amazon.com/ssp/dock/hrz/ob
// @grant        GM_xmlhttpRequest
// @connect      trans-logistics.amazon.com
// @connect      github.com
// @connect      raw.githubusercontent.com
// @require      https://sdk.amazonaws.com/js/aws-sdk-2.1480.0.min.js
// @require      https://github.com/Jhoni23/Outbound/raw/refs/heads/new-version/cloudscape-design.js
// ==/UserScript==

(function () {
    'use strict';
    let aaData;

    //Verificação de atualização
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://raw.githubusercontent.com/Jhoni23/Outbound/main/outboundScriptTampermonkey.user.js",
        onload: function(response) {
            if (response.status === 200) {
                const text = response.responseText;
                const match = text.match(/@version\s+([^\s]+)/);
                if (GM_info.script.version.toString() != match[1].toString()) {
                    const container = document.createElement("div");
                    container.style.position = "fixed";
                    container.style.top = "20px";
                    container.style.left = "50%";
                    container.style.transform = "translateX(-50%)";
                    container.style.background = "#0f141a";
                    container.style.color = "white";
                    container.style.padding = "15px 20px";
                    container.style.borderRadius = "10px";
                    container.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
                    container.style.zIndex = "999999";
                    container.style.fontFamily = "Arial, sans-serif";
                    container.style.fontSize = "15px";
                    container.style.textAlign = "center";

                    const message = document.createElement("div");
                    message.style.marginBottom = "10px";
                    message.textContent = "🚀 Nova versão disponível!";
                    container.appendChild(message);

                    const button = document.createElement("button");
                    button.textContent = "Atualizar";
                    button.style.background = "#2F6EE2";
                    button.style.color = "white";
                    button.style.border = "none";
                    button.style.padding = "8px 12px";
                    button.style.borderRadius = "6px";
                    button.style.cursor = "pointer";
                    button.style.fontWeight = "bold";

                    button.addEventListener("click", () => {
                        // abre o link para atualizar
                        window.open(
                            "https://github.com/Jhoni23/Outbound/raw/main/outboundScriptTampermonkey.user.js",
                            "_blank"
                        );

                        // altera o texto e cria botão para recarregar
                        message.textContent = "🔄 Recarregue a página!";

                        const reloadBtn = document.createElement("button");
                        reloadBtn.textContent = "Recarregar";
                        reloadBtn.style.background = "#2F6EE2";
                        reloadBtn.style.color = "white";
                        reloadBtn.style.border = "none";
                        reloadBtn.style.padding = "8px 12px";
                        reloadBtn.style.borderRadius = "6px";
                        reloadBtn.style.cursor = "pointer";
                        reloadBtn.style.fontWeight = "bold";
                        reloadBtn.style.marginLeft = "10px";

                        reloadBtn.addEventListener("click", () => {
                            location.reload();
                        });

                        container.appendChild(reloadBtn);

                        button.remove();
                    });

                    container.appendChild(button);
                    document.body.appendChild(container);
                }
            }
        },
        onerror: function(err) {
            console.error("Erro na requisição GM_xmlhttpRequest:", err);
        }
    });

    const value = `; ${document.cookie}`;
    const parts = value.split(`; switch=`);
    if (parts.length === 1) {document.cookie = "switch=false; path=/";}

    function criaSwitch() {
        if (document.getElementById("switch")) return;
        const emailSpan = document.querySelector('.a-color-link.a-text-bold');

        const switchLabel = document.createElement('label');
        switchLabel.id = "switch";
        switchLabel.style.display = "inline-flex";
        switchLabel.style.alignItems = "center";
        switchLabel.style.cursor = "pointer";
        switchLabel.style.marginRight = "8px";
        switchLabel.style.fontWeight = "100";

        const switchInput = document.createElement('input');
        switchInput.type = "checkbox";
        switchInput.style.display = "none";
        const switchSlider = document.createElement('span');
        switchSlider.style.width = "35px";
        switchSlider.style.height = "20px";
        switchSlider.style.background = "none";
        switchSlider.style.border = "2px #c5c5c5 solid";
        switchSlider.style.borderRadius = "20px";
        switchSlider.style.position = "relative";
        switchSlider.style.transition = "background 0.3s";
        const knob = document.createElement('span');
        knob.style.width = "14px";
        knob.style.height = "14px";
        knob.style.background = "#c5c5c5";
        knob.style.borderRadius = "50%";
        knob.style.position = "absolute";
        knob.style.top = "1px";
        knob.style.left = "2px";
        knob.style.transition = "left 0.3s";
        knob.textContent = "✦";
        knob.style.display = "flex";
        knob.style.alignItems = "center";
        knob.style.justifyContent = "center";
        knob.style.fontSize = "13px";
        knob.style.color = "#fff";
        switchSlider.appendChild(knob);
        switchLabel.appendChild(switchInput);
        switchLabel.appendChild(switchSlider);

        switchInput.addEventListener("change", () => {
            if (switchInput.checked) {
                document.cookie = "switch=true; path=/";
                switchSlider.style.border = "2px #006ce0 solid";
                knob.style.background = "#006ce0";
                knob.style.left = "15px";
            } else {
                document.cookie = "switch=false; path=/";
                switchSlider.style.border = "2px #c5c5c5 solid";
                knob.style.background = "#c5c5c5";
                knob.style.left = "2px";
                location.reload();
            }
        });

        emailSpan.parentNode.insertBefore(switchLabel, emailSpan);

        let value = `; ${document.cookie}`.split(`; switch=`);
        value = value.pop().split(';').shift();
        if (value === "true") {
            switchSlider.style.border = "2px #006ce0 solid";
            knob.style.background = "#006ce0";
            knob.style.left = "15px";
            document.querySelector('#switch input[type="checkbox"]').checked = true;
        }
    }

    function formatarDatas() {
        const meses = {
            Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
            Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
        };

        document.querySelectorAll('td').forEach(td => {
            const texto = td.textContent.trim();
            const match = texto.match(/^(\d{2})-([A-Za-z]{3})-(\d{2})\s+(\d{2}:\d{2})$/);
            if (match) {
                const dia = match[1];
                const mes = meses[match[2]];
                const ano = match[3];
                const hora = match[4];
                td.textContent = `${dia}/${mes}/${ano} ${hora}`;
            }
        });

        //Remove ícone bandeira
        document.querySelectorAll('td span').forEach(span => {
            const title = span.getAttribute('title')?.toLowerCase() || '';
            if (title.includes('última carga') || span.classList.contains('driverPresent')) {
                span.remove();
            }
        });
    }

    //Conexão banco de dados
    AWS.config.update({
        region: 'sa-east-1',
        accessKeyId: 'AKIA2NVKJ4QJ2YYIQ4NY',
        secretAccessKey: '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'
    });
    const docClient = new AWS.DynamoDB.DocumentClient();

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
                callback(nome.replace(/\[C\]/g, ""));
            },
            onerror: function(err) {
                console.error("Erro ao buscar a página:", err);
                callback(null);
            }
        });
    }

    //Seleciona FC
    let FC = ""
    function selecionarFC() {
        const select = document.getElementById("availableNodeName");
        if (select) {
            const opcaoSelecionada = select.options[select.selectedIndex];
            FC = opcaoSelecionada.text;
        }
    }

    let criouObsever = false;
    let divRight = null;
    function adicionarBotaoValePallet() {
        if (divRight == null){
            divRight = document.getElementById("rightContent");
        } else {
            if(!criouObsever){
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.type === "attributes" && mutation.attributeName === "class") {
                            if (!divRight.classList.contains("displaynone")) {
                                const linhaSelecionada = document.querySelector('tr.selectedTableRow');

                                //Botão copiar
                                const h4 = document.querySelector("#rightContent h4");
                                if (!h4.querySelector(".btn-copiar")) {
                                    const span = document.createElement("span");
                                    span.textContent = " ⿻";
                                    span.className = "btn-copiar";
                                    span.style.cursor = "pointer";
                                    span.style.marginLeft = "6px";
                                    span.style.color = "#2F6EE2";
                                    span.title = "Copiar dados";

                                    const texto = h4.innerText.trim();
                                    const vrid = texto.split("-").pop().trim();

                                    const laneSpan = linhaSelecionada.querySelector("span.floatL.goodLane");
                                    const rota = laneSpan.textContent.trim();

                                    const tdLoadId = linhaSelecionada.querySelector('td.loadIdCol');
                                    const tdTransportadora = tdLoadId?.nextElementSibling?.nextElementSibling;
                                    const carrier = tdTransportadora?.textContent.trim() || "";

                                    const theadRow = document.querySelector("thead tr");
                                    const ths = theadRow.querySelectorAll("th");
                                    let posicao = -1;
                                    ths.forEach((th, index) => {
                                        if (th.getAttribute("title") === "Critical Pull Time" || th.getAttribute("title") === "Horário de envio programado") {
                                            posicao = index;
                                        }
                                    });
                                    const tds = linhaSelecionada.querySelectorAll("td");
                                    const cpt = tds[posicao].textContent.trim();

                                    const textoCopiar = `VRID ${vrid}\nLANE ${rota}\nCARRIER ${carrier}\nCPT ${cpt}`;

                                    span.addEventListener("click", () => {
                                        navigator.clipboard.writeText(textoCopiar);

                                        span.textContent = " ✓";
                                        setTimeout(() => {
                                            span.textContent = " ⿻";
                                        }, 1500);
                                    });

                                    h4.appendChild(span);
                                }

                                //Botão vale pallet
                                const tdTrailerNum = linhaSelecionada.querySelector('td.trailerNumCol');
                                const temSpan = tdTrailerNum?.querySelector('span');

                                const container = document.querySelector(".actionButtonItems.floatL.backGroundNone");

                                const divColMd = document.querySelectorAll('div.backGroundNone > div.col-md-12.backGroundNone')[1];
                                const actionDivs = divColMd.querySelectorAll('div.actionButtonItems.floatL.clear.backGroundNone');
                                const botaoView = actionDivs[1].querySelector('a#viewDocButton');

                                if (document.getElementById("novoBotao") || !temSpan) return;

                                const novoBotao = document.createElement("a");
                                novoBotao.href = "javascript:void(0)";
                                novoBotao.id = "novoBotao";
                                novoBotao.title = "Vale Pallet";
                                novoBotao.className = "btnValePallet aluiBtn standardBtn floatL";
                                novoBotao.textContent = "Vale Pallet";

                                novoBotao.addEventListener("click", () => {
                                    // cria o CSS do spinner via JS
                                    const style = document.createElement("style");
                                    style.textContent = `
.spinner {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #333;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  animation: spin 0.8s linear infinite;
  display: inline-block;
  vertical-align: middle;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
                                    document.head.appendChild(style);
                                    const largura = novoBotao.offsetWidth + "px";
                                    novoBotao.style.width = largura;
                                    novoBotao.innerHTML = '<span class="spinner"></span>';
                                    novoBotao.style.display = "flex";
                                    novoBotao.style.justifyContent = "center";
                                    novoBotao.style.alignItems = "center";
                                    novoBotao.style.pointerEvents = "none";
                                    novoBotao.style.opacity = "0.7";

                                    const goodLaneSpan = linhaSelecionada.querySelector('span.goodLane');
                                    let rota = "";
                                    switch(FC) {
                                                case "GRU8":
                                                    rota = goodLaneSpan?.className.match(/laneGRU8-([A-Z0-9]+)/)?.[1] || "";
                                                    break;
                                                case "GRU5":
                                                    rota = goodLaneSpan?.className.match(/laneGRU5-([A-Z0-9]+)/)?.[1] || "";
                                                    break;
                                                case "GRU9":
                                                    rota = goodLaneSpan?.className.match(/laneGRU9-([A-Z0-9]+)/)?.[1] || "";
                                                    break;
                                            }

                                    const tdLoadId = linhaSelecionada.querySelector('td.loadIdCol');
                                    const tdTransportadora = tdLoadId?.nextElementSibling?.nextElementSibling;
                                    const transportadora = tdTransportadora?.textContent.trim() || "";

                                    const spanPlaca = linhaSelecionada.querySelector('span.trailerNo');
                                    const placa = spanPlaca?.textContent.trim().replace("OTHR", "").trim() || "";

                                    //if (placa == "") {getIDBOL();};

                                    const tdMotorista = linhaSelecionada.querySelector('td.motoristaCol');
                                    let motorista = tdMotorista?.textContent.trim() || "";
                                    if (motorista == "—") {motorista = ""};

                                    const tdTRT = linhaSelecionada.querySelector('td.trtColumn');
                                    const tdAnterior = tdTRT?.previousElementSibling;
                                    let pallet = tdAnterior?.querySelector('a')?.textContent.trim() || "";
                                    if (pallet == "") {pallet = "0"};

                                    const spanVrid = linhaSelecionada.querySelector('span.loadId');
                                    const vrid = spanVrid?.textContent.trim() || "";

                                    contarGaylords(linhaSelecionada).then(({ gaylordCount }) => {
                                        let scuttles = gaylordCount;
                                        if (scuttles == "") {scuttles = "0"};

                                        const WT = linhaSelecionada.querySelector(".highlightTransType.floatL");
                                        if (WT) {
                                            if(WT.textContent.trim() === "WT") {
                                                scuttles = pallet;
                                            };
                                        };

                                        if (transportadora == "AZLBR") {
                                            rota = "AZULBR";
                                        };

                                        buscarNomeYard(function(nomeYard) {
                                            let dados = {
                                                Vrid: vrid,
                                                Transportadora: transportadora,
                                                Rota: rota,
                                                Placa: placa,
                                                Motorista: motorista,
                                                Pallet: pallet,
                                                Scuttles: scuttles,
                                                Yard: nomeYard || ""
                                            };

                                            GM_xmlhttpRequest({
                                                method: "GET",
                                                url: "https://github.com/Jhoni23/Outbound/raw/refs/heads/main/Modelos%20Vale%20Pallet/" + FC + ".html",
                                                onload: function (response) {
                                                    let html = response.responseText;

                                                    html = html.replace(/{{TRANSPORTADORA}}/gi, dados.Transportadora || "")
                                                        .replace(/{{VRID}}/gi, dados.Vrid || "")
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
                                                    novoBotao.textContent = "Vale Pallet";
                                                    novoBotao.style.width = "";
                                                    novoBotao.style.display = "";
                                                    novoBotao.style.justifyContent = "";
                                                    novoBotao.style.alignItems = "";
                                                    novoBotao.style.pointerEvents = "auto";
                                                    novoBotao.style.opacity = "1";
                                                },
                                                onerror: function (err) {
                                                    console.error("Erro ao buscar HTML para impressão:", err);
                                                    alert("Erro ao carregar conteúdo da impressão.");
                                                }
                                            });
                                        });
                                    });
                                });

                                if (botaoView.classList.contains('hidden')) {
                                    container.appendChild(novoBotao);
                                } else {
                                    botaoView.insertAdjacentElement('afterend', novoBotao);
                                }
                            }
                        }
                    });
                });

                observer.observe(divRight, { attributes: true });
                criouObsever = true;
            }
        }
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
                nodeId: FC,
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
                        resolve(total);
                    } catch (e) {
                        reject(e);
                    }
                },
                onerror: function(err) {
                    reject(err);
                }
            });
        });
    }

    const traducoes = {
        "Equipment Type": "Tipologia",
        "Tipo de equipamento": "Tipologia",
        "Location": "Doca",
        "Sort/Route": "Rota",
        "Classificar/Rotear": "Rota",

        "Scheduled Departure Window": "Janela de Partida",

        "twenty six foot box truck": "TRUCK",
        "forty eight foot truck": "CARRETA",
        "twenty foot box truck": "TOCO",
        "forty foot truck": "VUC",
        "fourteen foot van": "3/4",
    };

    function traduzirCampos() {
        //Notifications
        const el = document.querySelector('.seStatus.alertContentHeight');
        if (el && el.textContent.trim() === "No events impacting the operations") {
            el.textContent = "Sem eventos impactando a operação";
        }

        //Títulos tabela
        document.querySelectorAll('.DataTables_sort_wrapper').forEach(el => {
            for (let node of el.childNodes) {
                if (node.nodeType === Node.TEXT_NODE) {
                    for (const [origem, traducao] of Object.entries(traducoes)) {
                        if (node.textContent.includes(origem)) {
                            node.textContent = node.textContent.replace(origem, traducao);
                            break;
                        }
                    }
                }
            }
        });

        //Schedule departure window
        document.querySelectorAll('.sdtGroupWindow').forEach(div => {
            div.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE && node.nodeValue.includes('Scheduled Departure Window')) {
                    node.nodeValue = node.nodeValue.replace('Scheduled Departure Window', 'Janela de Partida');
                }
            });
        });

        //Tipologias
        document.querySelectorAll('div.capitalizeWord').forEach(div => {
            const texto = div.textContent.trim();
            if (traducoes[texto]) {
                div.textContent = traducoes[texto];
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
                        const params = {
                            TableName: 'nome-motoristas',
                            Key: { placa: trailerId }
                        };

                        docClient.get(params, (err, data) => {
                            if (data.Item && data.Item.nome) {
                                tdMotorista.textContent = data.Item.nome;
                            }
                        });
                    }

                    //Correção desordem colunas
                    const observer = new MutationObserver(mutations => {
                        mutations.forEach(mutation => {
                            if (mutation.type === 'characterData' || mutation.type === 'childList') {
                                const texto = tdMotorista.textContent.trim();
                                if (!isNaN(texto) && texto !== '') {
                                    document.getElementById('manualRefresh').click();
                                }
                            }
                        });
                    });
                    observer.observe(tdMotorista, { characterData: true, subtree: true, childList: true });

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
                            const now = Math.floor(Date.now() / 1000);
                            const expireAt = now + 9 * 60 * 60;
                            const nomeUpper = nome.trim().toUpperCase();
                            if (nomeUpper) {
                                const params = {
                                    TableName: 'nome-motoristas',
                                    Item: {
                                        placa: trailerId,
                                        nome: nomeUpper,
                                        expireAt: expireAt
                                    }
                                };
                                docClient.put(params, (err) => {
                                    if (err) {
                                        console.error("Erro ao salvar:", err);
                                    } else {
                                        console.log(`Salvo: ${trailerId} = ${nomeUpper}`);
                                    }
                                });
                            } else {
                                const params = {
                                    TableName: 'nome-motoristas',
                                    Key: { placa: trailerId }
                                };
                                docClient.delete(params, (err) => {
                                    if (err) {
                                        console.error("Erro ao remover:", err);
                                    } else {
                                        console.log(`Removido: ${trailerId}`);
                                    }
                                });
                            }
                            tdMotorista.textContent = nomeUpper || '—';
                        }

                        input.addEventListener('keydown', (e) => {
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

    //CheckStart
    const open = XMLHttpRequest.prototype.open;
    const send = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
        this._url = url;
        return open.apply(this, [method, url, ...rest]);
    };

    XMLHttpRequest.prototype.send = function(body) {
        this.addEventListener("load", function() {
            if (this._url.includes("/ssp/dock/hrz/ob/fetchdata")) {
                const dados = JSON.parse(this.responseText);
                if (dados && dados.ret && Array.isArray(dados.ret.aaData)) {
                    const aaData = dados.ret.aaData;
                    organizaLinhas(aaData);
                    aaData.forEach(item => {
                        const vrId = item.load.vrId;
                        const status = item.load.status;
                        const seal = item.load.seal;
                        if (status == "LOADING_IN_PROGRESS") {
                            let loadSpan = document.querySelector(`span.loadId[data-vrid="${vrId}"]`);
                            if (loadSpan) {
                                loadSpan = loadSpan.parentElement.parentElement;

                                const locationWarp = loadSpan.querySelector('span.locationWarp');
                                if (locationWarp) {
                                    locationWarp.style.border = "2px solid #00802f";
                                } else {
                                    const span = loadSpan.querySelector(".DOCK_DOOR");
                                    const img = document.createElement("img");
                                    img.src = `data:image/png;base64,${"iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAAkUlEQVR4nGNgoDJgxBDxkp7MYCqSxcDIwIRX53+Gfwyn30xj2PY0F78V9fp/GfhYpQk6hY9VhqFe/y+6MAuGQkYGJoZPv58yNOj/x2tgw0VGbL7ANBBdE1Zx3JYRMJCAK0k3kHQX4o9JmMYG/f8obJIAMRrxqBn8YUhnF3ZcEcQqXqHzHpcWTC+R6ipcwUItAADdxzMqJxC35wAAAABJRU5ErkJggg=="}`;
                                    img.alt = "Iniciado";
                                    img.style.width = "20px";
                                    img.style.height = "14px";
                                    span.replaceWith(img);
                                }
                            }
                        }
                    });
                }
            }
        });
        return send.apply(this, [body]);
    };

    function organizaLinhas(aaData) {
        const index = 4; // índice da coluna "Rota"
        const asc = true;
        const tabela = document.getElementById('dashboard');
        if (!tabela) return console.error("Tabela não encontrada");

        const tbody = tabela.querySelector('tbody');
        if (!tbody) return console.error("tbody não encontrado");

        const ths = tabela.querySelectorAll('th');
        const nomeColuna = ths[index] ? (ths[index].innerText.trim() || "Desconhecida") : "Desconhecida";

        const linhas = Array.from(tbody.querySelectorAll('tr'));
        const grupos = [];
        let grupoAtual = null;

        linhas.forEach(tr => {
            if (tr.classList.contains('groupRow')) {
                grupoAtual = { header: tr, rows: [] };
                grupos.push(grupoAtual);
            } else if (grupoAtual) {
                grupoAtual.rows.push(tr);
            }
        });

        grupos.forEach(grupo => {
            grupo.rows.sort((a, b) => {
                const a_val = a.children[index]?.innerText.trim() || "";
                const b_val = b.children[index]?.innerText.trim() || "";
                return asc ? a_val.localeCompare(b_val) : b_val.localeCompare(a_val);
            });
        });

        tbody.innerHTML = "";
        grupos.forEach(grupo => {
            tbody.appendChild(grupo.header);
            grupo.rows.forEach(tr => tbody.appendChild(tr));
        });

        document.querySelectorAll('.DataTables_sort_wrapper').forEach(wrapper => {
            if (wrapper.textContent.trim().startsWith("Rota")) {
                const icon = wrapper.querySelector('.DataTables_sort_icon');
                if (icon && icon.classList.contains('ui-icon-carat-2-n-s')) {
                    icon.classList.remove('ui-icon-carat-2-n-s');
                    icon.classList.add('ui-icon-triangle-1-s');
                }
            }
        });

        // Contagem de rota

        aaData.forEach(item => {
            const rota = item.load.route;
            if (item.trailer != null) {
                const placa = item.trailer.trailerNumber;
            } else {
                const placa = "";
            }
            const chegada = item.load.actualArrivalTime;
        });

        // Seleciona todos os grupos da tabela
        const gruposL = document.querySelectorAll('tr.groupRow');

        gruposL.forEach((grupo) => {
            // Começa da próxima linha após o cabeçalho do grupo
            let linha = grupo.nextElementSibling;
            let linhasDoGrupo = [];

            // Coleta todas as linhas até o próximo grupo
            while (linha && !linha.classList.contains('groupRow')) {
                linhasDoGrupo.push(linha);
                linha = linha.nextElementSibling;
            }

            // Mapeia cada linha para seu respectivo "item" (ajuste conforme seu contexto)
            const rotasComHora = linhasDoGrupo.map(linha => {
                const span = linha.querySelector('td.sorting_2 .hideLane span.goodLane');
                const rota = span ? span.textContent.trim() : null;

                // obtém o item associado à linha
                const item = linha._item || null;
                const horaStr = item?.load?.actualArrivalTime || null;

                let horaObj = null;
                if (horaStr) {
                    // Converte a string de hora para objeto Date
                    const parsed = Date.parse(horaStr.replace(/-/g, ' '));
                    if (!isNaN(parsed)) horaObj = new Date(parsed);
                }

                return { linha, rota, horaObj };
            }).filter(item => item.rota && item.horaObj); // só considera linhas com hora válida

            // Agrupa por rota
            const rotasAgrupadas = {};
            rotasComHora.forEach(item => {
                if (!rotasAgrupadas[item.rota]) rotasAgrupadas[item.rota] = [];
                rotasAgrupadas[item.rota].push(item);
            });

            // Para cada rota com múltiplas entradas, ordena por hora e adiciona numeração
            Object.keys(rotasAgrupadas).forEach(rota => {
                const grupoRota = rotasAgrupadas[rota];
                if (grupoRota.length > 1) {
                    // Ordena por hora (mais antiga primeiro)
                    grupoRota.sort((a, b) => a.horaObj - b.horaObj);

                    // Adiciona numeração (1°, 2°, 3°...)
                    grupoRota.forEach((item, idx) => {
                        const span = item.linha.querySelector('td.sorting_2 .hideLane span.goodLane');

                        if (span && !span.querySelector('.ordemRota')) {
                            const ordemSpan = document.createElement('span');
                            ordemSpan.className = 'ordemRota';
                            ordemSpan.style.marginLeft = '9px';
                            ordemSpan.style.fontSize = '13px';
                            ordemSpan.style.fontWeight = '700';
                            ordemSpan.style.color = '#CACACA';
                            ordemSpan.textContent = `${idx + 1}°`;
                            span.appendChild(ordemSpan);
                        }
                    });
                }
            });
        });
    }

    async function processarPagina() {
        criaSwitch();
        selecionarFC();
        formatarDatas();
        traduzirCampos();
        adicionarBotaoValePallet();
        if (FC == "GRU8" ) {adicionarColunaMotorista();}
        if (document.querySelector('#switch input[type="checkbox"]').checked) {aplicarCloudscapeDesign();};
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
})();
