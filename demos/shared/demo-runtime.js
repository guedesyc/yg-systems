(function () {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("demoSession");
  const fallback = {
    businessName: "Empresa Demonstracao",
    brandColor: "#168bff",
    logo: "",
    product: "YG Systems",
  };

  function getConfig() {
    if (!sessionId) return fallback;
    try {
      const raw = window.localStorage.getItem(`yg-systems:demo:${sessionId}`);
      return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
    } catch {
      return fallback;
    }
  }

  function makeDemoBets() {
    const now = new Date();
    return [
      {
        id: "demo-1",
        name: "Mariana Costa",
        contact: "71999990001",
        pix_name: "Mariana Costa",
        score: "2x1",
        status: "confirmed",
        official_order: 1,
        confirmed_at: now.toISOString(),
        created_at: now.toISOString(),
      },
      {
        id: "demo-2",
        name: "Joao Silva",
        contact: "71999990002",
        pix_name: "Joao Silva",
        score: "1x0",
        status: "pending",
        official_order: null,
        confirmed_at: null,
        created_at: now.toISOString(),
      },
    ];
  }

  function installEventosApiMock() {
    const key = `${window.YG_DEMO_STORAGE_PREFIX}:eventos:bets`;
    const read = () => {
      const raw = window.localStorage.getItem(key);
      if (raw) return JSON.parse(raw);
      const bets = makeDemoBets();
      window.localStorage.setItem(key, JSON.stringify(bets));
      return bets;
    };
    const write = (bets) => window.localStorage.setItem(key, JSON.stringify(bets));
    const json = (payload, status = 200) =>
      Promise.resolve(new Response(JSON.stringify(payload), {
        status,
        headers: { "content-type": "application/json" },
      }));

    const originalFetch = window.fetch.bind(window);
    window.fetch = async (resource, options = {}) => {
      const path = typeof resource === "string" ? resource : resource?.url || "";
      if (!path.startsWith("/api/")) return originalFetch(resource, options);

      const bets = read();
      if (path === "/api/bets" && (!options.method || options.method === "GET")) {
        const scoreCounts = bets.reduce((acc, bet) => {
          if (bet.status === "pending" || bet.status === "confirmed") {
            acc[bet.score] = (acc[bet.score] || 0) + 1;
          }
          return acc;
        }, {});
        return json({ bets: bets.filter((bet) => bet.status === "confirmed"), scoreCounts });
      }

      if (path === "/api/bets" && options.method === "POST") {
        const body = JSON.parse(options.body || "{}");
        const next = {
          id: `demo-${Date.now()}`,
          name: body.name,
          contact: body.contact,
          pix_name: body.pixName,
          score: body.score,
          status: "pending",
          official_order: null,
          confirmed_at: null,
          created_at: new Date().toISOString(),
        };
        write([next, ...bets]);
        return json({ bet: next });
      }

      if (path === "/api/admin") {
        const body = JSON.parse(options.body || "{}");
        if (body.action === "list") return json({ bets });
        const nextBets = bets.map((bet) => {
          if (bet.id !== body.betId) return bet;
          if (body.action === "confirm") {
            return {
              ...bet,
              status: "confirmed",
              official_order: bets.filter((item) => item.status === "confirmed").length + 1,
              confirmed_at: new Date().toISOString(),
            };
          }
          if (body.action === "cancel") return { ...bet, status: "cancelled" };
          return bet;
        });
        write(nextBets);
        return json({ bets: nextBets, bet: nextBets.find((bet) => bet.id === body.betId) });
      }

      return json({ error: "Endpoint demo nao encontrado." }, 404);
    };
  }

  function initials(name) {
    return (
      name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase() || "YG"
    );
  }

  function logoHtml(config) {
    if (config.logo) {
      return `<img class="yg-demo-logo-img" src="${config.logo}" alt="Logo de ${config.businessName}">`;
    }
    return `<span class="yg-demo-logo-text">${initials(config.businessName)}</span>`;
  }

  function replaceText(root, replacements) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      let text = node.nodeValue;
      replacements.forEach(([from, to]) => {
        text = text.replaceAll(from, to);
      });
      node.nodeValue = text;
    });
  }

  function installBar(config) {
    replaceText(document.body, [
      ["YG Bar", config.businessName],
      ["Tiago Diferenciado", config.businessName],
      ["TD", initials(config.businessName)],
    ]);
    const brandMark = document.querySelector(".brand-mark");
    if (brandMark) brandMark.outerHTML = logoHtml(config);
  }

  function installEstoque(config) {
    replaceText(document.body, [
      ["YG Estoque e Controle", config.businessName],
      ["Brownie da Keise", config.businessName],
      ["GestÃ£o de Vendas do Brownie da Keise.", `Gestao de vendas e estoque de ${config.businessName}.`],
      ["Feito por Yago Guedes", "Demo personalizada YG Systems"],
    ]);
    const sidebar = document.querySelector(".sidebar > div");
    if (sidebar && !sidebar.querySelector(".yg-demo-logo-img, .yg-demo-logo-text")) {
      sidebar.insertAdjacentHTML("afterbegin", logoHtml(config));
    }
  }

  function installEventos(config) {
    replaceText(document.body, [
      ["Bolao da Copa", config.businessName],
      ["Brasil x Noruega", `Evento de ${config.businessName}`],
      ["Escolha o placar, faca o Pix e aguarde a confirmacao manual.", "Escolha sua opcao, confirme a inscricao e acompanhe a lista do evento."],
    ]);
    const pixKey = document.querySelector("#pixKey");
    if (pixKey) pixKey.textContent = "demo@ygsystems.com.br";
  }

  function installCommon(config) {
    document.documentElement.style.setProperty("--yg-demo-color", config.brandColor);
    document.title = `${config.businessName} | ${config.product}`;
    document.body.insertAdjacentHTML(
      "afterbegin",
      `<aside class="yg-demo-bar">
        <div class="yg-demo-brand-wrap">
          ${logoHtml(config)}
          <div>
            <strong>${config.businessName}</strong>
            <span>Demo personalizada de ${config.product}</span>
          </div>
        </div>
        <a href="../../index.html#ecossistema">Voltar aos ecossistemas</a>
      </aside>`,
    );
  }

  window.YG_DEMO_CONFIG = getConfig();
  window.YG_DEMO_SESSION_ID = sessionId || "preview";
  window.YG_DEMO_STORAGE_PREFIX = `yg-systems:demo-state:${window.YG_DEMO_SESSION_ID}`;
  if (window.location.pathname.includes("/eventos/")) {
    installEventosApiMock();
  }
  window.YG_DEMO_APPLY = function (kind) {
    const config = window.YG_DEMO_CONFIG;
    installCommon(config);
    if (kind === "bar") installBar(config);
    if (kind === "estoque") installEstoque(config);
    if (kind === "eventos") installEventos(config);
  };
})();
