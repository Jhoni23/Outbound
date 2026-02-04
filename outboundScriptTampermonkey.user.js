// ==UserScript==
// @name         Outbound 2.0
// @icon         https://raw.githubusercontent.com/Jhoni23/Outbound/refs/heads/main/.github/assets/outbound-logo.svg
// @namespace    http://tampermonkey.net/
// @updateURL    https://github.com/Jhoni23/Outbound/raw/refs/heads/main/outboundScriptTampermonkey.user.js
// @downloadURL  https://github.com/Jhoni23/Outbound/raw/refs/heads/main/outboundScriptTampermonkey.user.js
// @version      6.0
// @description  Update Outbound Management System
// @author       rsanjhon
// @match        https://trans-logistics.amazon.com/ssp/dock/hrz/ob
// @grant        GM_xmlhttpRequest
// @connect      trans-logistics.amazon.com
// @connect      github.com
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function () {
    'use strict';

    //Verificação de atualização
    (function verificaAtualizacao() {
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
                        container.style.background = "#ffffff";
                        container.style.color = "#232f3e";
                        container.style.padding = "15px 20px";
                        container.style.borderRadius = "4px";
                        container.style.border = '1px solid #B1BAC3';
                        container.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
                        container.style.zIndex = "999999";
                        container.style.fontFamily = "Arial, sans-serif";
                        container.style.fontSize = "15px";
                        container.style.textAlign = "center";

                        const message = document.createElement("div");
                        message.style.marginBottom = "10px";
                        message.textContent = "Nova versão da extensão disponível!";
                        container.appendChild(message);

                        const button = document.createElement("button");
                        button.textContent = "Atualizar";
                        button.style.background = "#2F6EE2";
                        button.style.color = "white";
                        button.style.border = "none";
                        button.style.padding = "8px 12px";
                        button.style.borderRadius = "4px";
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
    })();

    // MERIDIAN DESIGN

    function aplicarMeridianDesign() {
        const css = `
  #legacy .legacyBody {
    font-family: "Amazon Ember", sans-serif !important;
  }
`;
        const style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);

        //Remove Elementos
        document.querySelectorAll('div.floatL.topHelpLinks, span.floatL.relatedUI, #topPaneContent span.floatL.textBold')
            .forEach(el => el.remove());

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

        const tabela = document.querySelector('table.dataTable');
        if (!tabela) return;

        //Departing Loads
        const departLoads = document.querySelector('.pageHeader');
        if (departLoads) {
            departLoads.style.fontSize = '28px';
            departLoads.style.fontWeight = '400';
            departLoads.style.color = '#232F3E';
        }

        //FC Select
        const nodeTimeDiv = document.querySelector('.floatL.nodeTime');
        if (nodeTimeDiv) {
            nodeTimeDiv.style.marginTop = '5px';
        }
        const selectEl = document.getElementById('availableNodeName');
        if(selectEl) {
            selectEl.style.height = '28px';
            selectEl.style.backgroundColor = '#ffffff';
            selectEl.style.border = '1px solid #6e777f';
            selectEl.style.borderRadius = '4px';
            selectEl.style.padding = '0px 8px';
            selectEl.style.fontSize = '12px';
            selectEl.style.color = '#575F67';
        }
        const departDiv = document.querySelector('.pageHeaderNode');
        if (departDiv) {
            departDiv.classList.remove('marL20');
            departDiv.style.marginLeft = '40px';
        }

        const advise = document.getElementById('16450-stripe');
        if (advise) advise.remove();

        //Refresh
        const el = document.getElementById('manualRefresh');
        if (el) {
            el.classList.remove('ui-icon-refresh', 'floatR');
            el.innerHTML = '⟳';
            el.style.lineHeight = '1.1';
            el.style.fontSize = '35px';
            el.style.color = '#00688D';
            el.style.cursor = 'pointer';
            el.style.marginLeft = '5px';
        }
        const man = document.querySelector('.refreshButton');
        if (man) {
            man.style.paddingRight = '25px';
        }

        // Tamanho do texto
        tabela.querySelectorAll('th, td').forEach(cell => {
            cell.style.fontSize = '12px';
        });

        //Botões superiores
        const botoes = document.querySelectorAll('.topButtonLinks input[type="button"]');
        botoes.forEach((input) => {
            input.style.boxSizing = 'border-box';
            input.style.fontSize = '14px';
            input.style.fontWeight = '400';
            input.style.setProperty("padding", "0px 16px", "important");
            input.style.fontFamily = "Amazon Ember";
            input.style.minWidth = '100px';
            input.style.textAlign = 'center';
            input.style.height = '32px';
            input.style.display = 'inline-block';
            input.style.borderRadius = '4px';
            input.style.border = '2px solid #00688D';
            input.style.color = '#00688D';
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
                div.style.borderRadius = '4px';
                div.style.border = '1px solid #B1BAC3';
                div.style.padding = '20px';
                div.style.display = 'flex';
                div.style.flexDirection = 'column';
                div.style.backgroundColor = '#FFFFFF';
            });
        }

        //Next CPT
        const nextCPT = document.querySelector('#nextPrevCptData');
        if(nextCPT) {nextCPT.style.backgroundColor = '#FFFFFF'};
        const spans = document.querySelectorAll('#nextPrevCptData span');
        spans.forEach(span => {
            if (span.textContent.trim() === 'Next CPT' || span.textContent.trim() === 'Próximo CPT') {
                span.style.fontSize = '18px';
                span.style.fontWeight = '700';
                span.style.color = '#0f141a';
                span.style.marginBottom = '8px';
            }
        });
        document.querySelectorAll("#nextCPT, #prevCPT").forEach(el => {
            el.classList.remove("standardBtn");
        });

        //Load Issues
        const loaDiv = document.querySelector('div.col-md-4.topDetailPane');
        if (loaDiv) {
            loaDiv.style.backgroundColor = '#FFFFFF';
            loaDiv.classList.remove("col-md-4");
            loaDiv.style.width = '33%';

            const load = loaDiv.querySelector('td.loadHead');
            if (load) {
                const textNode = Array.from(load.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '');
                if (textNode) {
                    const span = document.createElement('span');
                    span.textContent = textNode.textContent.trim();
                    span.style.color = '#0f141a';
                    span.style.fontSize = '18px';
                    span.style.fontWeight = '700';
                    load.replaceChild(span, textNode);
                }
            }
        }
        const aView = document.querySelector('a#viewAlertTable');
        if (aView) {
            aView.classList.remove("aluiBtn", "standardBtn");
            aView.style.boxSizing = 'border-box';
            aView.style.paddingTop = '8px';
            aView.style.marginLeft = '10px';
            aView.style.minWidth = '100px';
            aView.style.textAlign = 'center';
            aView.style.height = '27px';
            aView.style.display = 'inline-block';
            aView.style.borderRadius = '4px';
            aView.style.border = '2px solid #00688D';
            aView.style.color = '#00688D';
            aView.style.backgroundColor = 'transparent';
        }
        document.querySelectorAll(".lateDetailsHeight").forEach(el => {
            el.style.margin = "0px 0px 10px 0px";
        });
        document.querySelectorAll(".topPaneFontBig").forEach(el => {
            el.classList.remove('topPaneFontBig');
            el.style.fontSize = "40px";
        });
        document.querySelectorAll(".alertBg1").forEach(el => {
            el.style.backgroundColor = "transparent";
            el.style.color = "#666";
            const span = el.querySelector("span");
            if (span) span.style.color = "#f2cd54";
        });
        document.querySelectorAll(".alertBg2").forEach(el => {
            el.style.backgroundColor = "transparent";
            el.style.color = "#666";
            const span = el.querySelector("span");
            if (span) span.style.color = "#db0000";
        });

        //Notification
        document.querySelectorAll('.specialEventsDiv').forEach(el => {
            el.classList.remove('specialEventsDiv');
            el.classList.remove('col-md-4');
            el.style.width = '36%';
            el.style.padding = '20px';
            el.style.textAlign = 'left';
            if (el.firstElementChild) {
                el.firstElementChild.style.backgroundColor = "transparent";
                el.firstElementChild.style.paddingBottom = "10px";
                el.firstElementChild.style.border = "none";
                const span = el.firstElementChild.querySelector('span');
                if (span) {
                    span.textContent = "Notificações";
                    span.style.fontSize = '19px';
                    span.style.fontWeight = '700';
                    span.style.color = '#0f141a';
                    span.style.padding = '0px';
                }
            }
        });

        //Overdue Packages
        const td = document.getElementById('selectedUt');
        if (td) {
            const divPai = td.closest("div.col-md-1.topDetailPane");
            if (divPai) {
                divPai.style.width = '10%';
                divPai.style.backgroundColor = "#FFFFFF";
            }
        };
        const ut = document.querySelector('#selectedUt');
        if (ut) {
            ut.style.color = '#0f141a';
            ut.style.fontSize = '16px';
            ut.style.fontWeight = '700';
        }
        const overDueDiv = document.getElementById('overDueCount');
        if (overDueDiv) {
            overDueDiv.style.fontSize = '34px';
            overDueDiv.style.fontWeight = '700';
            overDueDiv.style.marginTop = "20px";
        }

        //TABELA
        tabela.style.border = 'none';
        let container = tabela.parentElement;
        container.style.overflow = 'hidden';
        container.style.borderRadius = '4px';
        container.style.border = '1px solid #c6c6cd';
        container.style.padding = '20px';
        container.style.backgroundColor = '#FFFFFF';

        const search = document.querySelector('input.filterSearchLoads');
        if (search) {
            search.style.appearance = "none";
            search.style.MozAppearance = "none";
            search.style.height = "30px";
            search.style.lineHeight = "30px";
            search.style.padding = "0 10px";
            search.style.border = "1px solid #b6bdc5";
            search.style.borderRadius = "4px";
            search.style.boxSizing = "border-box";
            search.placeholder = "Pesquisar";
            search.style.boxShadow = "none";
            search.style.marginTop = "0px";
        };

        const conf = document.querySelector('button#alui-columnToggle-btn');
        if (conf) {
            conf.style.backgroundColor = '#fff';
            conf.style.border = "1px solid #b6bdc5";
            conf.style.height = "30px";
        };

        const selectPage = document.querySelector('select[name="dashboard_length"]');
        if (selectPage) {
            selectPage.style.setProperty('background-color', '#fff', 'important');
            selectPage.style.height = '24px';
            selectPage.style.border = '1px solid #b6bdc5';
            selectPage.style.borderRadius = '4px';
        }

        const label = document.querySelector('label[for="dashboard_length"]')
        || document.querySelector('label:has(select[name="dashboard_length"])');
        if (label) {
            if (label.childNodes[0]) label.childNodes[0].textContent = "";
            if (label.lastChild) label.lastChild.textContent = " Linhas";
        }

        document.querySelectorAll(
            '.alui-skin .tabletoolbar .dataTables_paginate .previous.ui-button, ' +
            '.alui-skin .tabletoolbar .dataTables_paginate .next.ui-button'
        ).forEach(el => {
            el.style.setProperty('border', 'none', 'important');
        });

        //CABEÇALHO
        tabela.querySelectorAll('thead tr:first-child th').forEach(th => {
            th.style.fontSize = '14px';
            th.style.lineHeight = '18px';
            th.style.fontWeight = 'Bold';
            th.style.letterSpacing = 'normal';
            th.style.border = 'none';
            th.style.backgroundColor = '#fff';
            th.style.color = '#424650';

            if (th.textContent.includes('Doca') || th.textContent.includes('Local')) {
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
            const span = tdGroup.firstElementChild.querySelector('span');
            if (span) {
                span.style.fontWeight = '200';
                span.style.color = '#000000';
            }
        });

        //Status
        document.querySelectorAll(".dwellProgressStatusTime").forEach(el => {
            let texto = el.textContent.trim();
            if (texto.includes(" Hour")) {
                el.textContent = texto.replace(" Hour", "h");
            }
        });

        //Div Right
        const rightContent = document.getElementById("rightContent");
        if (rightContent) {
            rightContent.style.borderRadius = "4px";
            rightContent.style.border = "1px solid #c6c6cd";
            rightContent.style.paddingTop = "20px";
            rightContent.style.fontSize = '14px';
        }
    }

    // FIM MERIDIAN DESIGN

    //Ler FC
    function obterFC() {
        const cookies = document.cookie.split("; ");
        const cookie = cookies.find(row => row.startsWith("setNodeId="));
        if (cookie) return decodeURIComponent(cookie.split("=")[1]);

        const select = document.querySelector("#availableNodeName");
        const optionSelecionado = select?.options?.[select.selectedIndex];
        return optionSelecionado?.text;
    }

    //Formata datas
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
            if (title.includes('última carga') || title.includes('last load for cpt') || span.classList.contains('driverPresent')) {
                span.remove();
            }
        });
    }

    //Buscar Nome do Yard
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

    //Botão Vale Pallet
    function adicionarBotaoValePallet(linhaSelecionada) {
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

        novoBotao.addEventListener("click", async () => {
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

            await new Promise(r => setTimeout(r, 0));

            const gaylordCount = linhaSelecionada.querySelectorAll('.trailerCount')[1]?.textContent?.trim() || "0";

            buscarNomeYard(function(nomeYard) {

                const goodLaneSpan = linhaSelecionada.querySelector('span.goodLane');
                let rota = goodLaneSpan?.className.match(new RegExp(`lane${obterFC()}-([A-Z0-9]+)`))?.[1] || "";

                const tdLoadId = linhaSelecionada.querySelector('td.loadIdCol');
                const tdTransportadora = tdLoadId?.nextElementSibling?.nextElementSibling;
                const transportadora = tdTransportadora?.textContent.trim() || "";

                const spanPlaca = linhaSelecionada.querySelector('span.trailerNo');
                const placa = spanPlaca?.textContent.trim().replace("OTHR", "").trim() || "";

                const tdTRT = linhaSelecionada.querySelector('td.trtColumn');
                const tdAnterior = tdTRT?.previousElementSibling;
                let pallet = tdAnterior?.querySelector('a')?.textContent.trim() || "";
                if (pallet == "") {pallet = "0"};

                const spanVrid = linhaSelecionada.querySelector('span.loadId');
                const vrid = spanVrid?.textContent.trim() || "";

                let scuttles = gaylordCount;
                if (scuttles == "") {scuttles = "0"};

                if (transportadora == "AZLBR") {
                    rota = "AZULBR";
                };

                const WT = linhaSelecionada.querySelector(".highlightTransType.floatL");
                if (WT) {
                    if(WT.textContent.trim() === "WT") {
                        scuttles = pallet;
                    };
                };

                let dados = {
                    Vrid: vrid,
                    Transportadora: transportadora,
                    Rota: rota,
                    FC: obterFC(),
                    Placa: placa,
                    Pallet: pallet,
                    Scuttles: scuttles,
                    Yard: nomeYard || ""
                };

                GM_xmlhttpRequest({
                    method: "GET",
                    url: "https://raw.githubusercontent.com/Jhoni23/Outbound/refs/heads/main/modeloValePallet.html",
                    onload: function (response) {
                        let html = response.responseText;

                        html = html.replace(/{{TRANSPORTADORA}}/gi, dados.Transportadora || "")
                            .replace(/{{VRID}}/gi, dados.Vrid || "")
                            .replace(/{{ROTA}}/gi, dados.Rota || "")
                            .replace(/{{FC}}/gi, dados.FC || "")
                            .replace(/{{PLACA}}/gi, dados.Placa || "")
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

            novoBotao.textContent = "Vale Pallet";
            novoBotao.style.width = "";
            novoBotao.style.display = "";
            novoBotao.style.justifyContent = "";
            novoBotao.style.alignItems = "";
            novoBotao.style.pointerEvents = "auto";
            novoBotao.style.opacity = "1";
        });

        if (botaoView.classList.contains('hidden')) {
            container.appendChild(novoBotao);
        } else {
            botaoView.insertAdjacentElement('afterend', novoBotao);
        }
    }

    // Traduzir Campos
    function traduzirCampos() {
        const traducoes = {
            "Equipment Type": "Tipologia",
            "Tipo de equipamento": "Tipologia",
            "Location": "Doca",
            "Sort/Route": "Rota",
            "Classificar/Rotear": "Rota",

            "twenty six foot box truck": "TRUCK",
            "forty eight foot truck": "CARRETA",
            "twenty foot box truck": "TOCO",
            "forty foot truck": "VUC",
            "fourteen foot van": "3/4",
            "seven foot van": "3/4",
        };

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

        //Tipologias
        document.querySelectorAll('div.capitalizeWord').forEach(div => {
            const texto = div.textContent.trim();
            if (traducoes[texto]) {
                div.textContent = traducoes[texto];
            }
        });
    }

    // Organizar Linhas
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

        // Separa os grupos repetidos
        const gruposRepetidos = [];
        document.querySelectorAll('tr.groupRow').forEach((cabecalho) => {
            let linha = cabecalho.nextElementSibling;
            let grupo = [];
            while (linha && !linha.classList.contains('groupRow')) {
                grupo.push(linha);
                linha = linha.nextElementSibling;
            }
            for (let i = 0; i < grupo.length; ) {
                const linhaAtual = grupo[i];
                const valorAtual = linhaAtual.querySelector('.goodLane')?.textContent.trim();
                const grupo2 = [linhaAtual];
                let j = i + 1;
                while (j < grupo.length && grupo[j].querySelector('.goodLane')?.textContent.trim() === valorAtual) {
                    grupo2.push(grupo[j]);
                    j++;
                }
                if (grupo2.length > 1) gruposRepetidos.push(grupo2);
                i = j;
            }
        });

        // Adiciona numeração (1°, 2°, 3°...)
        function getData(lin) {
            const spanVrid = lin.querySelector('span.loadId');
            if (!spanVrid) return null;

            const vrid = spanVrid.getAttribute('data-vrid');
            const match = aaData.find(item => item.load.vrId == vrid);

            return match ? match.load.actualArrivalTime : null;
        }
        gruposRepetidos.forEach((grupoRepetido) => {
            if (grupoRepetido.length >= 1) {
                let linhasComHora = grupoRepetido.map(linha => ({
                    linha,
                    data: getData(linha)
                }));

                linhasComHora = linhasComHora.filter(item => {
                    if (!item.data) return false;
                    const d = new Date(item.data.replace(/-/g, ' '));
                    return !isNaN(d); // mantém só se for data válida
                });

                linhasComHora.forEach(item => {
                    item.dateObj = new Date(item.data.replace(/-/g, ' '));
                });

                linhasComHora.sort((a, b) => a.dateObj - b.dateObj);

                linhasComHora.forEach((item, idx) => {
                    const span = item.linha.querySelector('span.goodLane');
                    if (!span) return;

                    const old = span.querySelector('.ordemRota');
                    if (old) old.remove();

                    const ordemSpan = document.createElement('span');
                    ordemSpan.className = 'ordemRota';
                    ordemSpan.style.marginLeft = '9px';
                    ordemSpan.style.fontSize = '13px';
                    ordemSpan.style.fontWeight = '700';
                    ordemSpan.style.color = '#CACACA';
                    ordemSpan.textContent = `${idx + 1}º`;
                    ordemSpan.title = `Chegou em ${idx + 1}º`;

                    span.appendChild(ordemSpan);
                });
            }
        });
    }

    // Check Start
    function checkStart(aaData) {
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

    /// Observer Div Lateral ///
    let observerCreated = false;
    function observerDivRight() {
        if(!observerCreated){
            const divRight = document.getElementById("rightContent");
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === "attributes" && mutation.attributeName === "class") {
                        if (!divRight.classList.contains("displaynone")) {
                            const linha = document.querySelector('tr.selectedTableRow');
                            adicionarBotaoValePallet(linha);
                        }
                    }
                });
            });
            observer.observe(divRight, { attributes: true });
            observerCreated = true;
        }
    }

    /// Monitora as requisições HTTP //
    const send = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function(body) {
        this.addEventListener("load", function() {
            if (body.includes("getDefaultOutboundDockView") || body.includes("getOutboundDockView")) {
                const dados = JSON.parse(this.responseText);
                const aaData = dados.ret.aaData;

                checkStart(aaData);
                organizaLinhas(aaData);
            } else if (body.includes("getSubscribedNotifications")) {
                formatarDatas();
                traduzirCampos();
                aplicarMeridianDesign();
                observerDivRight();
            }
        });
        return send.apply(this, [body]);
    };

})();
