// ==UserScript==
// @name         Outbound 2.0
// @namespace    http://tampermonkey.net/
// @updateURL    https://github.com/Jhoni23/Outbound/raw/refs/heads/main/outboundScriptTampermonkey.user.js
// @downloadURL  https://github.com/Jhoni23/Outbound/raw/refs/heads/main/outboundScriptTampermonkey.user.js
// @version      2.2
// @description  Update Outbound Management System
// @author       rsanjhon
// @match        https://trans-logistics.amazon.com/ssp/dock/hrz/ob
// @grant        GM_xmlhttpRequest
// @connect      trans-logistics.amazon.com
// @connect      jhoni23.github.io
// @connect      raw.githubusercontent.com
// @require      https://sdk.amazonaws.com/js/aws-sdk-2.1480.0.min.js
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

                    container.innerHTML = `<div style="margin-bottom: 10px;">🚀 Nova versão do script disponível!</div>`;
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
                        window.open(
                            "https://github.com/Jhoni23/Outbound/raw/main/outboundScriptTampermonkey.user.js",
                            "_blank"
                        );
                        container.remove();
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

    //
    // DESIGN
    //

    function aplicarCloudscapeDesign() {
        function removerElementos() {
            //Need help?
            document.querySelectorAll('div.floatL.topHelpLinks, span.floatL.relatedUI, #topPaneContent span.floatL.textBold')
                .forEach(el => el.remove());

            //Textos na coluna Status
            const statusParaRemover = [
                "READY_FOR_LOADING",
                "LOADING_IN_PROGRESS",
                "TRAILER_ATTACHED"
            ];
            document.querySelectorAll('div.originalStatusCheck').forEach(div => {
                const status = div.getAttribute("data-status");
                if (statusParaRemover.includes(status)) {
                    div.remove();
                }
            });
        }

        function adicionarElementos() {

        }

        function alterarEstilos() {
            document.body.style.fontFamily = '"Open Sans", Helvetica, Arial, sans-serif';

            const tabela = document.querySelector('table.dataTable');
            if (!tabela) return;

            //GRU8 Select
            const nodeTimeDiv = document.querySelector('.floatL.nodeTime');
            nodeTimeDiv.style.marginTop = '5px';
            nodeTimeDiv.style.marginLeft = '0';
            const selectEl = document.getElementById('availableNodeName');
            if(selectEl) {
            selectEl.style.height = '29px';
            selectEl.style.backgroundColor = '#ffffff';
            selectEl.style.border = '1px solid #8c8c94';
            selectEl.style.borderRadius = '8px';
            }

            //Refresh
            const el = document.getElementById('manualRefresh');
            el.classList.remove('ui-icon-refresh', 'floatR');
            el.innerHTML = '⟳';
            el.style.lineHeight = '1.1';
            el.style.fontSize = '35px';
            el.style.color = '#006ce0';
            el.style.cursor = 'pointer';
            el.style.marginLeft = '5px';
            const man = document.querySelector('.refreshButton');
            man.style.paddingRight = '25px';

            // Tamanho do texto
            tabela.querySelectorAll('th, td').forEach(cell => {
                cell.style.fontSize = '12px';
            });

            //Botões superiores
            const botoes = document.querySelectorAll('.topButtonLinks input[type="button"]');
            botoes.forEach((input, index) => {
                input.style.boxSizing = 'border-box';
                input.style.paddingTop = '4px';
                input.style.paddingBottom = '4px';
                input.style.minWidth = '100px';
                input.style.textAlign = 'center';
                input.style.height = '32px';
                input.style.display = 'inline-block';
                input.style.borderRadius = '50px';
                input.style.border = '2px solid #006ce0';
                input.style.color = '#006ce0';
                input.style.backgroundColor = 'transparent';
            });
            const botaoRefresh = document.getElementById('disableRefresh');
            if (botaoRefresh) {
                botaoRefresh.style.minWidth = '160px';
                botaoRefresh.style.width = 'auto';
            }

            //Bordas divs superiores
            document.querySelectorAll('.topDetailPane table').forEach(table => {
                table.removeAttribute('border');
                table.style.border = 'none';
            });
            const topDetail = document.querySelector('#topDetailList');
            if(topDetail){
                topDetail.style.display = 'flex';
                topDetail.style.gap = '10px';
                topDetail.style.flexWrap = 'nowrap';
                topDetail.style.alignItems = 'stretch';
                document.querySelectorAll('#topDetailList > div').forEach(div => {
                    div.style.height = '190px';
                    div.style.borderRadius = '16px';
                    div.style.border = '1px solid #c6c6cd';
                    div.style.padding = '20px';
                    div.style.display = 'flex';
                    div.style.flexDirection = 'column';
                });
            }

            //Next CPT
            const spans = document.querySelectorAll('#nextPrevCptData span');
            spans.forEach(span => {
                if (span.textContent.trim() === 'Next CPT') {
                    span.textContent = 'Próximo CPT';
                    span.style.fontSize = '19px';
                    span.style.fontWeight = '700';
                    span.style.color = '#0f141a';
                    span.style.marginBottom = '8px';
                }
            });

            //Load Issues
            const load = document.querySelector('div.col-md-4.topDetailPane table tbody tr td.loadHead');
            if (load) {
                load.childNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE && node.textContent.includes('Load Issues')) {
                        // Cria um span com o texto
                        const span = document.createElement('span');
                        span.textContent = 'Problemas de Carga ';
                        span.style.fontSize = '19px';
                        span.style.fontWeight = '700';
                        span.style.color = '#0f141a';

                        // Substitui o nó de texto pelo span estilizado
                        load.replaceChild(span, node);
                    }
                });
            }

            //Notification
            document.querySelectorAll('.specialEventsDiv').forEach(el => {
                el.classList.remove('specialEventsDiv');
                el.classList.remove('col-md-4');
                el.style.width = '36%';
                el.style.padding = '20px';
                el.style.textAlign = 'left';
                el.firstElementChild.style.backgroundColor = "#FFFFFF";
                el.firstElementChild.style.paddingBottom = "10px";
                el.firstElementChild.style.border = "none";
                const span = el.firstElementChild.querySelector('span');
                span.textContent = "Notificações";
                span.style.fontSize = '19px';
                span.style.fontWeight = '700';
                span.style.color = '#0f141a';
                span.style.padding = '0px';
            });

            //Overdue Packages
            const td = document.getElementById('selectedUt');
            if (td && !td.innerHTML.includes('<br>Packages')) {
                td.innerHTML = td.innerHTML.replace('Packages', '<br>Packages');
            }
            const overDueDiv = document.getElementById('overDueCount');
            if (overDueDiv) {
                overDueDiv.style.fontSize = '42px';
                overDueDiv.style.fontWeight = '700';
                overDueDiv.style.color = '#006ce0';
            }
            const titulo = document.getElementById('selectedUt');
            if (titulo) {
                const textoSpan = document.createElement('span');
                textoSpan.textContent = 'Pacotes Atrasados';
                textoSpan.style.fontSize = '14px';
                textoSpan.style.fontWeight = '700';
                textoSpan.style.display = 'block';
                textoSpan.style.marginBottom = '25px';
                textoSpan.style.color = '#0f141a';

                const overDueDiv = titulo.querySelector('#overDueCount');
                titulo.innerHTML = '';
                titulo.appendChild(textoSpan);
                if (overDueDiv) {
                    titulo.appendChild(overDueDiv);
                }
            }

            //TABELA
            tabela.style.border = 'none';
            let container = tabela.parentElement;
            container.style.overflow = 'hidden';
            container.style.borderRadius = '16px';
            container.style.border = '1px solid #c6c6cd';
            container.style.padding = '20px';

            //CABEÇALHO
            tabela.querySelectorAll('thead tr:first-child th').forEach(th => {
                //texto
                th.style.fontSize = '14px';
                th.style.lineHeight = '18px';
                th.style.fontWeight = 'Bold';
                th.style.letterSpacing = 'normal';
                th.style.border = 'none';
                th.style.backgroundColor = '#fff';
                th.style.color = '#424650';

                // Largura das colunas
                if (th.textContent.includes('Doca')) {
                    th.style.width = '8%';
                }
            });

            // Linhas cinzas
            document.querySelectorAll('tr.even').forEach(tr => {
                tr.classList.remove('even');
                tr.classList.add('odd');
            });

            //Linhas grupos
            document.querySelectorAll('td.group').forEach(tdGroup => {
                tdGroup.style.background = "#F7F7F7";
                tdGroup.style.lineHeight = "28px";
            });

        }

        alterarEstilos();
        removerElementos();
        adicionarElementos();
    }

    //
    // FIM DESIGN ⤴
    //

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

    function adicionarBotaoValePallet() {
        const divRight = document.getElementById("rightContent");

        const observer = new MutationObserver(() => {
            if (!divRight.classList.contains("displaynone")) {
                const linhaSelecionada = document.querySelector('tr.selectedTableRow');
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
                            let dados = {
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
                    });
                });

                if (botaoView.classList.contains('hidden')) {
                    container.appendChild(novoBotao);
                } else {
                    botaoView.insertAdjacentElement('afterend', novoBotao);
                }
            }
        });

        observer.observe(divRight, { attributes: true, attributeFilter: ["class"] });

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
        "Location": "Doca",
        "Sort/Route": "Rota",

        "Scheduled Departure Window": "Janela de Partida Programada",

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
                    node.nodeValue = node.nodeValue.replace('Scheduled Departure Window', 'Janela de Partida Programada');
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
                        const params = {
                            TableName: 'nome-motoristas',
                            Key: { placa: trailerId }
                        };

                        docClient.get(params, (err, data) => {
                            if (data.Item && data.Item.nome) {
                                tdMotorista.textContent = data.Item.nome;
                                console.log("Puxei do banco meo");
                            }
                        });
                    }

                    //Correção desordem colunas
                    const observer = new MutationObserver(mutations => {
                        mutations.forEach(mutation => {
                            if (mutation.type === 'characterData' || mutation.type === 'childList') {
                                const texto = tdMotorista.textContent.trim();
                                if (!isNaN(texto) && texto !== '') {
                                    GM_xmlhttpRequest({
                                        method: "POST",
                                        url: "https://trans-logistics.amazon.com/ssp/dock/hrz/ob/fetchdata",
                                        headers: {
                                            "Content-Type": "application/x-www-form-urlencoded"
                                        },
                                        data: `entity=getDefaultOutboundDockView&nodeId=GRU8`,
                                        onload: function(response) {
                                            if (response.status === 200) {
                                                const dados = JSON.parse(response.responseText);
                                                aaData = dados.ret.aaData;
                                            }
                                        }
                                    });
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
                            const nomeUpper = nome.trim().toUpperCase();
                            if (nomeUpper) {
                                const params = {
                                    TableName: 'nome-motoristas',
                                    Item: {
                                        placa: trailerId,
                                        nome: nomeUpper
                                    }
                                };
                                docClient.put(params, (err) => {
                                    if (err) {
                                        console.error("Erro ao salvar no DynamoDB:", err);
                                    } else {
                                        console.log(`Salvo no DynamoDB: ${trailerId} = ${nomeUpper}`);
                                    }
                                });
                            } else {
                                const params = {
                                    TableName: 'nome-motoristas',
                                    Key: { placa: trailerId }
                                };
                                docClient.delete(params, (err) => {
                                    if (err) {
                                        console.error("Erro ao remover no DynamoDB:", err);
                                    } else {
                                        console.log(`Removido do DynamoDB: ${trailerId}`);
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

    GM_xmlhttpRequest({
        method: "POST",
        url: "https://trans-logistics.amazon.com/ssp/dock/hrz/ob/fetchdata",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: `entity=getDefaultOutboundDockView&nodeId=GRU8`,
        onload: function(response) {
            if (response.status === 200) {
                const dados = JSON.parse(response.responseText);
                aaData = dados.ret.aaData;
            }
        }
    });

    function checkStart() {
        if (aaData) {
            aaData.forEach(item => {
                const vrId = item.load.vrId;
                const status = item.load.status;
                const seal = item.load.seal;
                if (status === "LOADING_IN_PROGRESS" && seal != null) {
                    const loadSpan = document.querySelector(`span.loadId[data-vrid="${vrId}"]`);
                    const locationWarp = loadSpan.closest('tr').querySelector('span.locationWarp');
                    locationWarp.style.border = "2px solid #00802f";
                }
            });
        }
    }

    async function processarPagina() {
        formatarDatas();
        traduzirCampos();
        removerTermos();
        adicionarColunaMotorista();
        adicionarBotaoValePallet();
        aplicarCloudscapeDesign();
        checkStart();
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
