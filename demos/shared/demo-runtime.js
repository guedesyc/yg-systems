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

  function defaultLogoPath() {
    return "../../assets/yg-systems-logo.png";
  }

  function effectiveLogo(config) {
    return config.logo || defaultLogoPath();
  }

  function logoHtml(config) {
    return `<img class="yg-demo-logo-img" src="${effectiveLogo(config)}" alt="Logo de ${config.businessName}">`;
  }

  function applyLogoToImage(image, config) {
    if (!image) return;
    image.src = effectiveLogo(config);
    image.alt = `Logo de ${config.businessName}`;
    image.classList.add("yg-demo-inner-logo");
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

  function replaceAttributes(root, replacements) {
    root.querySelectorAll("*").forEach((node) => {
      ["aria-label", "alt", "placeholder", "title"].forEach((attribute) => {
        const current = node.getAttribute(attribute);
        if (!current) return;
        let next = current;
        replacements.forEach(([from, to]) => {
          next = next.replaceAll(from, to);
        });
        if (next !== current) node.setAttribute(attribute, next);
      });
    });
  }

  function installPersonalizedName(config) {
    const replacements = [
      ["YG Restaurante", config.businessName],
      ["Restaurante Demonstracao", config.businessName],
      ["YG Bar", config.businessName],
      ["YG Estoque e Controle", config.businessName],
      ["YG Financeiro", config.businessName],
      ["YG Feedbacks", config.businessName],
      ["YG Eventos", config.businessName],
      ["Empresa Demonstracao", config.businessName],
      ["Bolao da Copa", config.businessName],
    ];
    document.querySelectorAll("[data-business-name]").forEach((node) => {
      node.textContent = config.businessName;
    });
    replaceText(document.body, replacements);
    replaceAttributes(document.body, replacements);
  }

  function installInternalLogo(config) {
    document.querySelectorAll("#brandLogo, .hero-logo, .qr, .brand-block img, .brand img, [class*='brand'] img, [class*='logo']").forEach((image) => {
      if (!(image instanceof HTMLImageElement)) return;
      applyLogoToImage(image, config);
    });

    const brandMark = document.querySelector(".brand-mark");
    if (brandMark) {
      brandMark.outerHTML = logoHtml(config);
    }

    const sidebar = document.querySelector(".sidebar > div");
    if (sidebar && !sidebar.querySelector(".yg-demo-logo-img, .yg-demo-logo-text")) {
      sidebar.insertAdjacentHTML("afterbegin", logoHtml(config));
    }
  }

  function normalizeHex(color) {
    const value = String(color || "").trim();
    if (/^#[0-9a-fA-F]{6}$/.test(value)) return value;
    if (/^#[0-9a-fA-F]{3}$/.test(value)) {
      return `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`;
    }
    return "#168bff";
  }

  function hexToRgb(color) {
    const hex = normalizeHex(color).slice(1);
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  }

  function rgbToHex({ r, g, b }) {
    return `#${[r, g, b].map((value) => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, "0")).join("")}`;
  }

  function mix(color, target, amount) {
    const from = hexToRgb(color);
    const to = hexToRgb(target);
    return rgbToHex({
      r: from.r * amount + to.r * (1 - amount),
      g: from.g * amount + to.g * (1 - amount),
      b: from.b * amount + to.b * (1 - amount),
    });
  }

  function applyThemeVariables(config) {
    const color = normalizeHex(config.brandColor);
    const strong = mix(color, "#000000", 0.68);
    const deeper = mix(color, "#000000", 0.48);
    const soft = mix(color, "#ffffff", 0.34);
    const vividSoft = mix(color, "#ffffff", 0.62);
    const root = document.documentElement;

    Object.entries({
      "--yg-demo-color": color,
      "--brand": color,
      "--brand-strong": strong,
      "--accent": color,
      "--accent-deep": strong,
      "--accent-soft": soft,
      "--green": color,
      "--green-2": strong,
      "--yellow": vividSoft,
      "--teal": color,
      "--aqua": vividSoft,
      "--navy": deeper,
      "--red": color,
      "--red-dark": strong,
      "--olive": mix(color, "#60723f", 0.62),
      "--warm": mix(color, "#d17f23", 0.7),
      "--new": mix(color, "#315f8a", 0.72),
      "--prep": mix(color, "#9b6419", 0.72),
      "--ready": mix(color, "#16643f", 0.72),
    }).forEach(([name, value]) => {
      root.style.setProperty(name, value);
    });
  }

  function installBar(config) {
    replaceText(document.body, [
      ["YG Bar", config.businessName],
      ["Tiago Diferenciado", config.businessName],
      ["TD", initials(config.businessName)],
    ]);
    installInternalLogo(config);
  }

  function installEstoque(config) {
    replaceText(document.body, [
      ["YG Estoque e Controle", config.businessName],
      ["Brownie da Keise", config.businessName],
      ["GestÃ£o de Vendas do Brownie da Keise.", `Gestao de vendas e estoque de ${config.businessName}.`],
      ["Feito por Yago Guedes", "Demo personalizada YG Systems"],
    ]);
    installInternalLogo(config);
  }

  function installEventos(config) {
    replaceText(document.body, [
      ["Bolao da Copa", config.businessName],
      ["Brasil x Noruega", `Evento de ${config.businessName}`],
      ["Escolha o placar, faca o Pix e aguarde a confirmacao manual.", "Escolha sua opcao, confirme a inscricao e acompanhe a lista do evento."],
    ]);
    const pixKey = document.querySelector("#pixKey");
    if (pixKey) pixKey.textContent = "demo@ygsystems.com.br";
    installInternalLogo(config);
  }

  function installCommon(config) {
    applyThemeVariables(config);
    document.title = `${config.businessName} | ${config.product}`;
    installPersonalizedName(config);
    installInternalLogo(config);
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
  applyThemeVariables(window.YG_DEMO_CONFIG);
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
