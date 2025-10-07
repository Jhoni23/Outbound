function aplicarCloudscapeDesign() { 
    //Remove Elementos
    document.querySelectorAll('div.floatL.topHelpLinks, span.floatL.relatedUI, #topPaneContent span.floatL.textBold')
        .forEach(el => el.remove());
    
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
    
    document.body.style.fontFamily = '"Open Sans", Helvetica, Arial, sans-serif';
    const tabela = document.querySelector('table.dataTable');
    if (!tabela) return;
    
    //GRU8 Select
    const nodeTimeDiv = document.querySelector('.floatL.nodeTime');
    if (nodeTimeDiv) {
        nodeTimeDiv.style.marginTop = '5px';
        nodeTimeDiv.style.marginLeft = '0';
    }
    const selectEl = document.getElementById('availableNodeName');
    if(selectEl) {
        selectEl.style.height = '26px';
        selectEl.style.backgroundColor = '#ffffff';
        selectEl.style.border = '1px solid #8c8c94';
        selectEl.style.borderRadius = '8px';
    }
    const departDiv = document.querySelector('.pageHeaderNode');
    if (departDiv) {
        departDiv.classList.remove('marL20');
        departDiv.style.marginLeft = '40px';
    }
    
    //Refresh
    const el = document.getElementById('manualRefresh');
    if (el) {
        el.classList.remove('ui-icon-refresh', 'floatR');
        el.innerHTML = '⟳';
        el.style.lineHeight = '1.1';
        el.style.fontSize = '35px';
        el.style.color = '#006ce0';
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
        input.style.setProperty("padding", "4px 15px 4px 15px", "important");
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
            div.style.backgroundColor = '#FFFFFF';
        });
    }
    
    //Next CPT
    const nextCPT = document.querySelector('#nextPrevCptData');
    if(nextCPT) {nextCPT.style.backgroundColor = '#FFFFFF'};
    const spans = document.querySelectorAll('#nextPrevCptData span');
    spans.forEach(span => {
        if (span.textContent.trim() === 'Next CPT' || span.textContent.trim() === 'Próximo CPT') {
            span.textContent = 'Próximo CPT';
            span.style.fontSize = '19px';
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
    const load = document.querySelector('div.col-md-4.topDetailPane table tbody tr td.loadHead');
    if (loaDiv) {
        loaDiv.style.backgroundColor = '#FFFFFF';
        loaDiv.classList.remove("col-md-4");
        loaDiv.style.width = '33%';
    }
    if (load) {
        load.classList.remove("col-md-4");
        load.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                if (node.textContent.includes('Load Issues') || node.textContent.includes('Problemas de carregamento')) {
                    const span = document.createElement('span');
                    span.textContent = 'Problemas de Carga ';
                    span.style.fontSize = '19px';
                    span.style.fontWeight = '700';
                    span.style.color = '#0f141a';
                    load.replaceChild(span, node);
                }
            }
        });
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
        aView.style.borderRadius = '50px';
        aView.style.border = '2px solid #006ce0';
        aView.style.backgroundColor = 'transparent';
        aView.textContent = "Ver na Tabela";
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
        el.style.color = "#666666";
        const span = el.querySelector("span");
        if (span) span.style.color = "#f2cd54";
    });
    document.querySelectorAll(".alertBg2").forEach(el => {
        el.style.backgroundColor = "transparent";
        el.style.color = "#666666";
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
    if (td && !td.innerHTML.includes('<br>Packages')) {
        td.innerHTML = td.innerHTML.replace('Packages', '<br>Packages');
        td.classList.remove('textCenter');
    }
    const overDueDiv = document.getElementById('overDueCount');
    if (overDueDiv) {
        overDueDiv.style.fontSize = '38px';
        overDueDiv.style.fontWeight = '700';
        //overDueDiv.style.color = '#006ce0';
    }
    const titulo = document.getElementById('selectedUt');
    if (titulo) {
        const textoSpan = document.createElement('span');
        textoSpan.textContent = 'Pacotes Atrasados';
        textoSpan.style.fontSize = '17px';
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
    container.style.backgroundColor = '#FFFFFF';
    
    const search = document.querySelector('input.filterSearchLoads');
    if (search) {
        search.style.appearance = "none";
        search.style.MozAppearance = "none";
        search.style.height = "30px";
        search.style.lineHeight = "30px";
        search.style.padding = "0 10px";
        search.style.border = "1px solid #8c8c94";
        search.style.borderRadius = "6px";
        search.style.boxSizing = "border-box";
        search.placeholder = "Pesquisar";
        search.style.boxShadow = "none";
        search.style.marginTop = "0px";
    };
    
    const conf = document.querySelector('button#alui-columnToggle-btn');
    if (conf) {
        conf.style.backgroundColor = '#fff';
        conf.style.border = "1px solid #DDDDDD";
        conf.style.height = "30px";
    };
    
    const selectPage = document.querySelector('select[name="dashboard_length"]');
    if (selectPage) {
        selectPage.style.setProperty('background-color', '#fff', 'important');
        selectPage.style.height = '24px';
        selectPage.style.border = '1px solid #DDDDDD';
        selectPage.style.borderRadius = '8px';
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
        if (texto.includes("Since")) {
            el.textContent = texto.replace("Since", "Desde");
        } else if (texto.includes(" Hour")) {
            el.textContent = texto.replace(" Hour", "h");
        }
    });
    document.querySelectorAll('[data-status="SCHEDULED"]').forEach(el => {
        if (el.textContent.trim() === "Scheduled") {
            el.textContent = "Programado";
        }
    });
    
    //Div Right
    const rightContent = document.getElementById("rightContent");
    if (rightContent) {
        rightContent.style.borderRadius = "16px";
        rightContent.style.border = "1px solid #c6c6cd";
        rightContent.style.paddingTop = "20px";
        rightContent.style.fontSize = '14px';
    }
}
