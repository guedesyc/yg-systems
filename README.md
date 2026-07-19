# YG Systems

Projeto novo do ecossistema YG Systems.

Esta pasta e independente do repositorio de exemplo `pedirdelivery`. O projeto de exemplo informado pelo usuario sera usado apenas como referencia funcional para o primeiro produto do ecossistema: **YG Restaurante**.

## Como visualizar localmente

Use o atalho:

```text
abrir-site.bat
```

Ele inicia um servidor local em Node e abre o site no navegador. Isso evita tela branca em demos
com build moderno, como o Restaurante.

## Publicar no GitHub Pages

1. Crie um repositorio chamado `yg-systems`.
2. Envie os arquivos desta pasta para a branch principal.
3. No GitHub, abra `Settings > Pages`.
4. Escolha publicar a partir da branch principal e pasta raiz.

## Estrutura

```text
yg-systems/
|-- assets/
|   |-- yg-systems-logo.png
|   `-- yg-systems-monogram.png
|-- index.html
|-- local-server.mjs
|-- script.js
|-- styles.css
`-- README.md
```

## Primeiro produto

- Produto: YG Restaurante
- Referencia funcional: `https://github.com/guedesyc/https-pedir-delivery-app-hotflash-menu`
- Papel da referencia: base funcional da demo personalizada em `demos/restaurante`.

## Referencias por ecossistema

Estas referencias orientam a criacao das demos, mas nao devem ser abertas para o visitante final.
Quando alguem clicar em uma demonstracao, o site deve pedir nome, logo e cor da empresa e exibir
uma demo personalizada em uma nova pagina do proprio site.

- Restaurante: `guedesyc/https-pedir-delivery-app-hotflash-menu`
- Eventos: `guedesyc/bolao-lemos`
- Bar: `guedesyc/git`
- Estoque e Controle: `guedesyc/brownie-keise`
- Financeiro: futuro
- Feedbacks: pendente

## Fluxo de personalizacao

1. O visitante escolhe um ecossistema.
2. O site abre uma tela para informar nome da empresa, logo opcional e cor principal.
3. A configuracao fica salva temporariamente no navegador em `localStorage`, sempre com uma sessao unica.
4. O site abre uma nova pagina em `demos/{modelo}/index.html`.
5. A demo carrega a configuracao e aplica nome, logo e cor por cima da base funcional daquele modelo.
6. Cada pagina de demo usa chaves proprias por sessao, para nao misturar testes de clientes diferentes nem alterar o portal principal.

As demos atualmente conectadas a bases funcionais copiadas dos exemplos sao:

- `demos/restaurante`
- `demos/bar`
- `demos/estoque`
- `demos/eventos`

As demos `financeiro` e `feedbacks` existem como primeira estrutura local; podem ser substituidas por bases funcionais completas quando os respectivos repositorios/implementacoes forem definidos.
