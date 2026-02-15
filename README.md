<h1 align="center">
    <a>
      <img src="./.github/assets/outbound-logo.svg" width="15%">
    </a>
  <br>
    <a>
      Outbound 2.0
    </a>
</h1>

<p align="center">
  <i align="center">Extensão que adiciona novas funcionalidades para o sistema SSP (Outbound)</i>
</p>
<br>

## Como Instalar

No seu navegador (Firefox ou Google Chrome):

1° Etapa: [Clique aqui](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/) para instalar o Tampermonkey.

<div>
  <img src="https://github.com/user-attachments/assets/a3476345-5c1d-4a5f-9650-d9d98e55f00b" width="408" align="top">
  <img src="https://github.com/user-attachments/assets/3d2b813a-3b59-4c58-9494-6524b9a87c7b" width="208" align="top">
</div>

<br>

2° Etapa: [Clique aqui](https://github.com/Jhoni23/Outbound/raw/refs/heads/main/outboundScriptTampermonkey.user.js) para instalar a Extensão.

<img src="https://github.com/user-attachments/assets/8c21b5a6-e508-4a1f-acc7-19a00a3055f0" width="408">

<p>

3° Etapa: Feche todas as abas e abra o Navegador novamente.

<b> Pronto! A extensão está ativada! </b> 

<br>

## Funções 

### Vale Pallet

Adiciona um botão de "Vale Pallet" no menu lateral que gera o documento automaticamente.

(Para os carros que já estiverem no sistema)

<div>
    <img width="408" src="https://github.com/user-attachments/assets/d57a2d6a-c2e9-400a-afb6-637ef4ed260f" align="top"/>
    <img width="200" src="https://github.com/user-attachments/assets/51347cd2-9000-434d-9930-ecaa2a3c68a4" align="top"/>
</div>

> [!NOTE]
> Deve ser impresso antes do Checkout do veículo, após isso a placa deve ser inserida manualmente.

### Design Atualizado

Pequenas atualizações na interface e tradução das tipologias do veículo.

Ex: "Forty Foot Truck" traduzido para "VUC"


### Ícones de Start

Os carregamentos que já tiveram "Start" ou "Iniciar" têm seus ícones de doca verde: 

<img width="400" src="https://github.com/user-attachments/assets/749ec08f-9439-4c6a-aa4d-86232d29ee5f" />

### Hard e Soft Cap

Adiciona o Soft e Hard Cap de cada rota no menu lateral para análise de volume e demanda de cada carregamento a partir dos dados do CRISP.

<img width="355" height="226" alt="image" src="https://github.com/user-attachments/assets/1b16f150-9b2b-40d0-84d3-03cbebcbd2f4" />

> [!WARNING]
> Antes de tomadas de decisões importantes como AdHoc, confirme os valores diretamente no CRISP.

### Monitoramento via GPS

Quando o veículo entrar na área de proximidade do FC e o FMC constar como reported via GPS (G), um sinal aparecerá na linha do VRID.

Sinalizando que o veículo está nas proximidades, porém não foi realizadoo check-in.

<img width="285" height="186" src="https://github.com/user-attachments/assets/1f2a0636-0588-4582-9c9f-e1fee1e3bdca" />


<br>

## Próximas Funções - Em andamento

### Botões de Tickets

Adiciona uma secção de botões no menu lateral para modelos de abertura de Tickets:

Late Position, Late Departure, AdHoc e Cancel VRID

## Como desativar

- No canto superior direito do navegador, clique no ícone de quebra-cabeça.

<img width="300" src="https://github.com/user-attachments/assets/09685a2e-5368-4a50-bb5c-ed942288c132" />


- Selecione o Tampermonkey.

<img width="300" src="https://github.com/user-attachments/assets/b76b349a-dc6e-4f6a-b219-0659ba019d40" />


- Desabilite a extensão.

<img width="300" src="https://github.com/user-attachments/assets/f79878e2-84aa-4b8e-a8be-270e68e0ff5e" />

<p>

Recarregue a página do SSP.

<br>

## Mais informações

> Nenhuma parte da extensão altera dados internos importantes da Amazon ou o código-fonte do SSP.

Em caso de dúvidas, erros/bugs ou sugestões: <br><br>
 Slack [@rsanjhon](https://github.com/) &nbsp;&middot;&nbsp;
 Email [rsanjhon@amazon.com](https://twitter.com/)
