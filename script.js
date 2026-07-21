const form = document.querySelector("#leadForm");
const note = document.querySelector("#formNote");
const tabButtons = document.querySelectorAll("[data-tab]");
const tabPanels = document.querySelectorAll("[data-panel]");
const demoModal = document.querySelector("#demoModal");
const demoForm = document.querySelector("#demoForm");
const demoModalClose = document.querySelector("#demoModalClose");
const demoModalProduct = document.querySelector("#demoModalProduct");
const demoLogoInput = demoForm?.querySelector('input[name="businessLogo"]');
const demoColorInput = demoForm?.querySelector('input[name="brandColor"]');
const demoSubmitButton = document.querySelector("#demoSubmitButton");
const demoFormNote = document.querySelector("#demoFormNote");
const detailLabel = document.querySelector("#ecosystem-detail-label");
const detailTitle = document.querySelector("#ecosystem-detail-title");
const detailCopy = document.querySelector("#ecosystem-detail-copy");
const detailBenefits = document.querySelector("#ecosystem-detail-benefits");
const detailPreview = document.querySelector("#ecosystem-detail-preview");
const detailDemo = document.querySelector("#ecosystem-detail-demo");
const detailSection = document.querySelector("#demonstracao");
const demoLoading = document.querySelector("#demoLoading");
const demoLoadingText = document.querySelector("#demoLoadingText");

const demoPaths = {
  restaurante: "demos/restaurante/",
  bar: "demos/bar/",
  estoque: "demos/estoque/",
  financeiro: "demos/financeiro/",
  feedbacks: "demos/feedbacks/",
  eventos: "demos/eventos/",
};

const demoProducts = {
  restaurante: {
    name: "YG Pedidos",
    title: "Do pedido perdido no papel ao atendimento organizado.",
    copy:
      "Você para de depender de mensagens soltas, caderno no balcão e conferência manual. O cliente escolhe, informa os dados e sua equipe recebe um pedido mais claro para preparar e acompanhar.",
    benefits: [
      "Menos erro em sabor, endereço, entrega e pagamento.",
      "Mais velocidade para atender sem repetir a mesma pergunta várias vezes.",
      "Uma apresentação mais profissional para quem compra de você.",
    ],
    preview: [
      ["Antes", "Pedido em papel", "Informações incompletas geram dúvidas e atraso."],
      ["Depois", "Pedido organizado", "Cliente, sabores, entrega e pagamento em um só fluxo."],
      ["Resultado", "Equipe mais segura", "Menos retrabalho e mais clareza no atendimento."],
    ],
  },
  bar: {
    name: "YG Atendimentos",
    title: "Da comanda improvisada ao atendimento que acompanha cada mesa.",
    copy:
      "Cada mesa fica organizada desde o primeiro pedido até o fechamento. O garçom não depende da memória, a cozinha recebe a informação com mais clareza e você enxerga o consumo do turno.",
    benefits: [
      "Evita esquecimentos entre garçom, cozinha e balcão.",
      "Facilita o fechamento da mesa e reduz divergências.",
      "Ajuda você a entender os itens que mais movimentam o atendimento.",
    ],
    preview: [
      ["Salão", "Mesa 08", "Comanda aberta e pronta para receber novos itens."],
      ["Equipe", "Pedido enviado", "Cozinha e bar visualizam o que precisam preparar."],
      ["Gestão", "Fechamento simples", "O resumo do turno fica mais claro para o dono."],
    ],
  },
  estoque: {
    name: "Estoque e Controle",
    title: "Saiba o que entra, o que sai e o que precisa ser reposto antes de faltar.",
    copy:
      "O estoque deixa de depender da memória ou de anotações espalhadas. Você acompanha insumos, vendas e custos em uma mesma rotina, com mais segurança para comprar e produzir.",
    benefits: [
      "Reduz desperdícios e compras feitas no susto.",
      "Mostra o que está perto de acabar.",
      "Dá mais confiança para calcular custos e resultados.",
    ],
    preview: [
      ["Estoque", "6 itens em atenção", "Você enxerga o que precisa de reposição."],
      ["Produção", "Receitas cadastradas", "Os custos ficam mais próximos da realidade."],
      ["Resultado", "Movimentação do dia", "Entradas e saídas organizadas para consulta."],
    ],
  },
  financeiro: {
    name: "Financeiro",
    locked: true,
    title: "Transforme entradas e saídas em decisões mais tranquilas para o seu negócio.",
    copy:
      "Você passa a acompanhar o dinheiro que entra, o que precisa ser pago e o resultado do período sem juntar papéis e mensagens no fim do mês.",
    benefits: [
      "Mais clareza para planejar pagamentos.",
      "Menos surpresa ao fechar o mês.",
      "Uma visão direta do que está dando resultado.",
    ],
    preview: [
      ["Entradas", "Vendas do período", "Receitas reunidas em uma visão simples."],
      ["Despesas", "Contas em dia", "Você acompanha o que vence e o que já foi pago."],
      ["Resultado", "Saldo mais claro", "Informação para decidir com mais segurança."],
    ],
  },
  feedbacks: {
    name: "Feedbacks",
    title: "Escute seus clientes de um jeito simples e transforme opinião em melhoria.",
    copy:
      "Em vez de depender apenas de comentários soltos, você reúne notas e sugestões para entender o que encanta, o que incomoda e onde vale agir primeiro.",
    benefits: [
      "Mostra os pontos fortes que merecem continuar.",
      "Revela falhas antes que elas afastem clientes.",
      "Ajuda a equipe a melhorar com base em opiniões reais.",
    ],
    preview: [
      ["Clientes", "Avaliação rápida", "Uma forma leve de pedir opinião após o atendimento."],
      ["Leitura", "Nota média", "Você enxerga a percepção do público de imediato."],
      ["Melhoria", "Pontos recorrentes", "Sugestões que ajudam a priorizar mudanças."],
    ],
  },
  eventos: {
    name: "Eventos",
    title: "Organize inscrições e confirmações para que seu evento comece antes da porta abrir.",
    copy:
      "Você acompanha as inscrições, confirmações e vagas livres sem depender de listas espalhadas. Isso deixa a comunicação mais profissional e o dia do evento mais leve.",
    benefits: [
      "Facilita saber quem confirmou presença.",
      "Evita ultrapassar a capacidade do evento.",
      "Deixa os participantes mais bem informados.",
    ],
    preview: [
      ["Inscrições", "42 confirmados", "Participantes reunidos em uma lista organizada."],
      ["Lotação", "8 vagas livres", "Você acompanha a capacidade sem fazer contas manuais."],
      ["Comunicação", "Evento atualizado", "Informações prontas para orientar cada participante."],
    ],
  },
};

let selectedDemo = "restaurante";
let logoDataUrl = "";
let logoProcessingPromise = Promise.resolve("");

document.body.classList.add("site-ready");

function demoPathFor(productKey) {
  const cleanPath = demoPaths[productKey] || demoPaths.restaurante;
  if (window.location.protocol === "file:") return `${cleanPath}index.html`;
  return cleanPath;
}

function updateEcosystemDetail(tabName) {
  const product = demoProducts[tabName] || demoProducts.restaurante;
  if (detailLabel) detailLabel.textContent = product.name;
  if (detailTitle) detailTitle.textContent = product.title;
  if (detailCopy) detailCopy.textContent = product.copy;
  if (detailBenefits) detailBenefits.innerHTML = product.benefits.map((benefit) => `<li>${benefit}</li>`).join("");
  if (detailDemo) {
    detailDemo.dataset.demo = tabName;
    detailDemo.disabled = Boolean(product.locked);
    detailDemo.classList.toggle("locked-button", Boolean(product.locked));
    detailDemo.textContent = product.locked ? "Demo em breve" : "Quero ver meu sistema!";
    detailDemo.setAttribute("aria-disabled", String(Boolean(product.locked)));
  }
  if (detailPreview) {
    detailPreview.innerHTML = product.preview
      .map(
        ([label, title, copy], index) =>
          `<div class="demo-panel ${index === 0 ? "menu" : index === 1 ? "order" : "admin"}"><span>${label}</span><strong>${title}</strong><small>${copy}</small><i></i></div>`,
      )
      .join("");
  }
  if (detailSection) {
    detailSection.classList.remove("is-switching");
    void detailSection.offsetWidth;
    detailSection.classList.add("is-switching");
  }
}

function activateTab(tabName) {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === tabName;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  tabPanels.forEach((panel) => {
    const isActive = panel.dataset.panel === tabName;
    panel.classList.toggle("active", isActive);
    panel.hidden = !isActive;
  });
  updateEcosystemDetail(tabName);
}

function openDemoModal(productKey) {
  selectedDemo = productKey || "restaurante";
  if (demoProducts[selectedDemo]?.locked) return;
  if (demoModalProduct) demoModalProduct.textContent = demoProducts[selectedDemo].name;
  if (demoFormNote) demoFormNote.textContent = "";
  updateDemoSubmitColor();
  if (demoModal) demoModal.hidden = false;
}

function closeDemoModal() {
  if (demoModal) demoModal.hidden = true;
}

function buildDemoUrl({ businessName, brandColor, logo }) {
  if (demoProducts[selectedDemo]?.locked) return "";
  const sessionId = crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const payload = {
    businessName,
    brandColor,
    logo,
    product: demoProducts[selectedDemo].name,
    model: selectedDemo,
    createdAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(`yg-systems:demo:${sessionId}`, JSON.stringify(payload));
  } catch {
    payload.logo = "";
    try {
      localStorage.setItem(`yg-systems:demo:${sessionId}`, JSON.stringify(payload));
    } catch {
      if (demoFormNote) demoFormNote.textContent = "Não foi possível preparar esta demo. Feche algumas demos abertas e tente novamente.";
      return "";
    }
  }
  return `${demoPathFor(selectedDemo)}?demoSession=${encodeURIComponent(sessionId)}`;
}

function getTransitionLogo(logo) {
  return logo || new URL("./assets/yg-systems-logo.png", window.location.href).href;
}

function updateDemoSubmitColor() {
  if (!demoSubmitButton || !demoColorInput) return;
  demoSubmitButton.style.setProperty("--chosen-demo-color", demoColorInput.value || "#168bff");
}

function writeLoadingPage(targetWindow, url, transition) {
  const safeUrl = JSON.stringify(url);
  const logoUrl = JSON.stringify(getTransitionLogo(transition.logo));
  const businessName = JSON.stringify(transition.businessName || "sua empresa");
  const accent = /^#[0-9a-fA-F]{6}$/.test(transition.brandColor || "") ? transition.brandColor : "#168bff";
  targetWindow.document.open();
  targetWindow.document.write(`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>YG Systems | Preparando demo</title>
  <style>
    * { box-sizing: border-box; }
    :root { --accent: ${accent}; }
    body {
      align-items: center;
      background:
        radial-gradient(circle at 50% 42%, color-mix(in srgb, var(--accent) 24%, transparent), transparent 28rem),
        #000;
      color: #f6f9ff;
      display: grid;
      font-family: Inter, ui-sans-serif, system-ui, "Segoe UI", Arial, sans-serif;
      justify-items: center;
      margin: 0;
      min-height: 100vh;
      padding: 24px;
      text-align: center;
    }
    main { animation: lastFade 760ms ease 7.2s forwards; display: grid; gap: 22px; justify-items: center; max-width: 660px; }
    img { animation: logoIntro 900ms ease both, logoZoom 900ms ease 6.55s forwards; border-radius: 8px; filter: drop-shadow(0 0 34px color-mix(in srgb, var(--accent) 48%, transparent)); max-height: 210px; object-fit: contain; width: min(300px, 64vw); }
    p { animation: messageFade 2s ease both; color: rgba(246,249,255,.88); font-size: clamp(1.18rem, 3.5vw, 2.1rem); font-weight: 300; line-height: 1.22; margin: 0; white-space: pre-line; }
    .bar { background: rgba(255,255,255,.10); border-radius: 999px; height: 4px; overflow: hidden; width: min(320px, 62vw); }
    .bar span { animation: load 7.4s linear forwards; background: linear-gradient(90deg, var(--accent), #3bb9ff); display: block; height: 100%; width: 0; }
    @keyframes load { to { width: 100%; } }
    @keyframes logoIntro {
      from { opacity: 0; transform: scale(.94); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes logoZoom {
      to { opacity: 0; transform: scale(1.18); }
    }
    @keyframes messageFade {
      0% { opacity: 0; transform: translateY(8px); }
      18%, 78% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-6px); }
    }
    @keyframes lastFade {
      to { opacity: 0; transform: scale(.985); }
    }
  </style>
</head>
<body>
  <main>
    <img src=${logoUrl} alt="" />
    <p id="loadingText">Aplicando identidade visual</p>
    <div class="bar"><span></span></div>
  </main>
  <script>
    const messages = [
      "Aplicando identidade visual",
      "Personalizando sistema",
      "Você cuida do negócio,\\na YG System, da organização.",
      "Seja bem-vindo, " + ${businessName}
    ];
    const text = document.getElementById("loadingText");
    function setMessage(message) {
      text.style.animation = "none";
      void text.offsetWidth;
      text.textContent = message;
      text.style.animation = "messageFade 2s ease both";
    }
    setTimeout(() => { setMessage(messages[1]); }, 2000);
    setTimeout(() => { setMessage(messages[2]); }, 4000);
    setTimeout(() => { setMessage(messages[3]); }, 6000);
    setTimeout(() => { window.location.href = ${safeUrl}; }, 7600);
  <\/script>
</body>
</html>`);
  targetWindow.document.close();
}

function showInlineLoading(url, transition) {
  const messages = [
    "Aplicando identidade visual",
    "Personalizando sistema",
    "Você cuida do negócio,\na YG System, da organização.",
    `Seja bem-vindo, ${transition.businessName || "sua empresa"}`,
  ];
  let index = 0;
  if (demoLoadingText) demoLoadingText.textContent = messages[index];
  if (demoLoading) {
    const image = demoLoading.querySelector("img");
    if (image) image.src = getTransitionLogo(transition.logo);
    demoLoading.style.setProperty("--accent", transition.brandColor || "#168bff");
    demoLoading.classList.remove("is-leaving");
    demoLoading.hidden = false;
  }
  const timer = setInterval(() => {
    index += 1;
    if (demoLoadingText && messages[index]) {
      demoLoadingText.classList.remove("is-fading");
      void demoLoadingText.offsetWidth;
      demoLoadingText.textContent = messages[index];
      demoLoadingText.classList.add("is-fading");
    }
    if (index >= messages.length - 1) clearInterval(timer);
  }, 2000);
  setTimeout(() => {
    if (demoLoading) demoLoading.classList.add("is-leaving");
    window.location.assign(url);
  }, 7600);
}

async function shrinkLogo(file) {
  if (file.type === "image/svg+xml") {
    if (file.size > 300 * 1024) throw new Error("svg-too-large");
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  const source = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  const image = await new Promise((resolve, reject) => {
    const preview = new Image();
    preview.onload = () => resolve(preview);
    preview.onerror = reject;
    preview.src = source;
  });
  const scale = Math.min(1, 240 / Math.max(image.width, image.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));
  canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/png");
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => activateTab(button.dataset.tab));
  button.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    activateTab(button.dataset.tab);
  });
});

document.addEventListener("click", (event) => {
  const trigger = event.target.closest(".demo-trigger");
  if (trigger) openDemoModal(trigger.dataset.demo);
});

demoModalClose?.addEventListener("click", closeDemoModal);
demoModal?.addEventListener("click", (event) => {
  if (event.target === demoModal) closeDemoModal();
});

demoLogoInput?.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  logoDataUrl = "";
  if (!file) return;
  if (demoFormNote) demoFormNote.textContent = "Preparando logo...";
  if (demoSubmitButton) demoSubmitButton.disabled = true;
  logoProcessingPromise = shrinkLogo(file);
  try {
    logoDataUrl = await logoProcessingPromise;
    if (demoFormNote) demoFormNote.textContent = "Logo pronta para a demonstração.";
  } catch {
    logoDataUrl = "";
    if (demoFormNote) demoFormNote.textContent = "Não foi possível usar esta imagem. Tente uma logo menor.";
  } finally {
    if (demoSubmitButton) demoSubmitButton.disabled = false;
  }
});

demoColorInput?.addEventListener("input", updateDemoSubmitColor);

demoForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (demoSubmitButton) demoSubmitButton.disabled = true;
  try {
    await logoProcessingPromise;
  } catch {
    logoDataUrl = "";
  }
  const data = new FormData(demoForm);
  const transition = {
    businessName: String(data.get("businessName") || "Empresa Demonstração"),
    brandColor: String(data.get("brandColor") || "#168bff"),
    logo: logoDataUrl,
  };
  const url = buildDemoUrl({
    businessName: transition.businessName,
    brandColor: transition.brandColor,
    logo: transition.logo,
  });
  if (!url) {
    if (demoSubmitButton) demoSubmitButton.disabled = false;
    return;
  }
  const absoluteUrl = new URL(url, window.location.href).href;
  const targetWindow = window.open("", "_blank");
  closeDemoModal();
  if (targetWindow) {
    writeLoadingPage(targetWindow, absoluteUrl, transition);
    return;
  }
  showInlineLoading(absoluteUrl, transition);
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const payload = {
    name: data.get("name"),
    phone: data.get("phone"),
    email: data.get("email"),
    message: data.get("message"),
  };
  try {
    localStorage.setItem("yg-systems:last-lead-preview", JSON.stringify(payload));
  } catch {
    // WhatsApp remains available even if storage is full.
  }
  const text = `Olá, YG Systems!\n\nNome: ${payload.name}\nWhatsApp: ${payload.phone}\nE-mail: ${payload.email || "não informado"}\nMaior problema da empresa hoje: ${payload.message}`;
  window.open(`https://wa.me/5571999583586?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  if (note) {
    note.textContent = "Abrimos uma conversa no WhatsApp para você enviar sua mensagem.";
    note.classList.add("visible");
  }
  form.reset();
});

const revealTargets = document.querySelectorAll("main > section, main > aside, footer");
if ("IntersectionObserver" in window) {
  document.body.classList.add("motion-ready");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px" },
  );
  revealTargets.forEach((target, index) => {
    target.style.setProperty("--reveal-delay", `${Math.min(index * 35, 180)}ms`);
    revealObserver.observe(target);
  });
}
