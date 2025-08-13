// cloudscape-style.js
function aplicarCloudscapeDesign() {
  // =========================
  // Helpers
  // =========================
  const isReadyForLoadingText = (el) => {
    const t = (el.textContent || '').trim();
    return /^ready\s*for\s*loading$/i.test(t);
  };

  const removeReadyForLoading = (root = document) => {
    // 1) Por atributo + classe (mais específico)
    root.querySelectorAll('div.originalStatusCheck[data-status="READY_FOR_LOADING"]').forEach(el => el.remove());

    // 2) Por atributo apenas (caso a classe mude)
    root.querySelectorAll('div[data-status="READY_FOR_LOADING"]').forEach(el => el.remove());

    // 3) Por texto (fallback extra)
    root.querySelectorAll('div.originalStatusCheck, div[data-status]').forEach(el => {
      if (isReadyForLoadingText(el)) el.remove();
    });
  };

  // =========================
  // Remover / Adicionar / Estilizar
  // =========================
  function removerElementos() {
    removeReadyForLoading();
  }

  function adicionarElementos() {
    }
  }

  function alterarEstilos() {
    const tabela = document.querySelector('table.dataTable');
    if (!tabela) return;

    // Tamanho do texto
    tabela.querySelectorAll('th, td').forEach(cell => {
      cell.style.fontSize = '13px';
    });

    // Cabeçalhos
    tabela.querySelectorAll('thead tr th').forEach(th => {
      th.style.backgroundColor = '#fff';
      th.style.color = '#424650';
      th.style.fontWeight = 'bold';
      th.style.borderTop = 'none';

      if (th.textContent.includes('Location')) {
        th.style.width = '8%';
      }
    });

    // Linhas pares (even)
    tabela.querySelectorAll('tbody tr.even td').forEach(td => {
      td.style.backgroundColor = '#ffffff';
    });
  }

  // Primeira aplicação
  removerElementos();
  adicionarElementos();
  alterarEstilos();

  // =========================
  // Observer contínuo (idempotente)
  // =========================
  if (!window.__cloudscapeObserver__) {
    window.__cloudscapeObserver__ = new MutationObserver((mutList) => {
      for (const m of mutList) {
        // Remoção rápida apenas nos nós adicionados
        m.addedNodes.forEach(node => {
          if (node && node.nodeType === 1) {
            removeReadyForLoading(node);
          }
        });
      }
      // E uma passada leve no documento para garantir consistência
      removeReadyForLoading(document);
      alterarEstilos();
    });

    window.__cloudscapeObserver__.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // =========================
  // CSS de reforço (fallback)
  // =========================
  if (!document.getElementById('cloudscape-hide-ready-for-loading')) {
    const style = document.createElement('style');
    style.id = 'cloudscape-hide-ready-for-loading';
    style.textContent = `
      /* Esconde mesmo que o JS ainda não tenha removido */
      div.originalStatusCheck[data-status="READY_FOR_LOADING"],
      div[data-status="READY_FOR_LOADING"] {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }
}
