// cloudscape-style.js
function aplicarCloudscapeDesign() {
  function removerElementos() {
        const elems = document.querySelectorAll('.classe-para-remover');
        elems.forEach(el => el.remove());
    }

    function adicionarElementos() {
        // Exemplo: adicionar botão no header da tabela
        const container = document.querySelector('table.dataTable thead tr');
        if (!container) return;
        if (!document.querySelector('#meu-botao-custom')) {
            const botao = document.createElement('button');
            botao.id = 'meu-botao-custom';
            botao.textContent = 'Botão Custom';
            botao.style.marginLeft = '10px';
            botao.style.padding = '3px 6px';
            botao.style.backgroundColor = '#004b8d';
            botao.style.color = '#fff';
            botao.style.border = 'none';
            botao.style.borderRadius = '3px';
            container.appendChild(botao);
        }
    }

    function alterarEstilos() {
        const tabela = document.querySelector('table.dataTable');
        if (!tabela) return;

        // ========================
        // Tamanho do texto
        // ========================
        tabela.querySelectorAll('th, td').forEach(cell => {
            cell.style.fontSize = '13px';
        });

        // ========================
        // Cabeçalhos
        // ========================
        tabela.querySelectorAll('thead tr th').forEach(th => {
            th.style.backgroundColor = '#fff';
            th.style.color = '#424650';
            th.style.fontWeight = 'bold';
            th.style.borderTop = 'none'; // remove borda superior

            // largura específica da coluna Location
            if (th.textContent.includes('Location')) {
                th.style.width = '8%';
            }
        });

        // ========================
        // Linhas pares (even)
        // ========================
        tabela.querySelectorAll('tbody tr.even td').forEach(td => {
            td.style.backgroundColor = '#ffffff';
        });
    }

    removerElementos();
    adicionarElementos();
    alterarEstilos();
}
