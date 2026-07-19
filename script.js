const form = document.querySelector("#leadForm");
const note = document.querySelector("#formNote");
const tabButtons = document.querySelectorAll("[data-tab]");
const tabPanels = document.querySelectorAll("[data-panel]");
const demoModal = document.querySelector("#demoModal");
const demoForm = document.querySelector("#demoForm");
const demoModalClose = document.querySelector("#demoModalClose");
const demoModalProduct = document.querySelector("#demoModalProduct");
const demoLogoInput = demoForm?.querySelector('input[name="businessLogo"]');
const demoFormNote = document.querySelector("#demoFormNote");
const detailLabel = document.querySelector("#ecosystem-detail-label");
const detailTitle = document.querySelector("#ecosystem-detail-title");
const detailCopy = document.querySelector("#ecosystem-detail-copy");
const detailBenefits = document.querySelector("#ecosystem-detail-benefits");
const detailPreview = document.querySelector("#ecosystem-detail-preview");
const detailDemo = document.querySelector("#ecosystem-detail-demo");
const detailSection = document.querySelector("#demonstracao");

const demoPaths = {
  restaurante: "demos/restaurante/index.html",
  bar: "demos/bar/index.html",
  estoque: "demos/estoque/index.html",
  financeiro: "demos/financeiro/index.html",
  feedbacks: "demos/feedbacks/index.html",
  eventos: "demos/eventos/index.html",
};

const demoProducts = {
  restaurante: {
    name: "YG Restaurante",
    title: "Mais clareza para vender, atender e acompanhar cada pedido.",
    copy: "Seu cliente visualiza o cardápio, monta o pedido e informa como quer receber. A equipe ganha uma visão organizada para evitar mensagens perdidas e dúvidas no atendimento.",
    benefits: ["Mais agilidade para quem atende pelo WhatsApp.", "Menos erros em sabores, endereço e pagamento.", "Uma apresentação profissional para o seu negócio."],
    preview: [["Cardápio", "Pedido organizado", "Sabores, entrega e pagamento em um só fluxo."], ["Atendimento", "Menos dúvidas", "Informações completas antes de confirmar."], ["Painel", "Visão do dia", "Pedidos prontos para acompanhar."]],
  },
  bar: {
    name: "YG Bar",
    title: "Comandas mais claras para sua equipe atender sem perder o ritmo.",
    copy: "Cada mesa fica organizada desde o primeiro pedido até o fechamento. Assim, o seu time ganha rapidez no salão e você consegue enxergar o que acontece no turno.",
    benefits: ["Evita esquecimentos entre garçom, cozinha e balcão.", "Facilita o fechamento da mesa e reduz divergências.", "Ajuda você a entender os itens que mais movimentam o bar."],
    preview: [["Salão", "Mesa 08", "Comanda aberta e pronta para receber novos itens."], ["Equipe", "Pedido enviado", "Cozinha e bar visualizam o que precisam preparar."], ["Gestão", "Fechamento simples", "O resumo do turno fica mais claro para o dono."]],
  },
  estoque: {
    name: "YG Estoque e Controle",
    title: "Saiba o que entra, o que sai e o que precisa ser reposto antes de faltar.",
    copy: "O estoque deixa de depender da memória ou de anotações espalhadas. Você acompanha insumos, vendas e custos em uma mesma rotina, com mais segurança para comprar e produzir.",
    benefits: ["Reduz desperdícios e compras feitas no susto.", "Mostra o que está perto de acabar.", "Dá mais confiança para calcular custos e resultados."],
    preview: [["Estoque", "6 itens em atenção", "Você enxerga o que precisa de reposição."], ["Produção", "Receitas cadastradas", "Os custos ficam mais próximos da realidade."], ["Resultado", "Movimentação do dia", "Entradas e saídas organizadas para consulta."]],
  },
  financeiro: {
    name: "YG Financeiro",
    title: "Transforme entradas e saídas em decisões mais tranquilas para o seu negócio.",
    copy: "Você passa a acompanhar o dinheiro que entra, o que precisa ser pago e o resultado do período sem juntar papéis e mensagens no fim do mês.",
    benefits: ["Mais clareza para planejar pagamentos.", "Menos surpresa ao fechar o mês.", "Uma visão direta do que está dando resultado."],
    preview: [["Entradas", "Vendas do período", "Receitas reunidas em uma visão simples."], ["Despesas", "Contas em dia", "Você acompanha o que vence e o que já foi pago."], ["Resultado", "Saldo mais claro", "Informação para decidir com mais segurança."]],
  },
  feedbacks: {
    name: "YG Feedbacks",
    title: "Escute seus clientes de um jeito simples e transforme opinião em melhoria.",
    copy: "Em vez de depender apenas de comentários soltos, você reúne notas e sugestões para entender o que encanta, o que incomoda e onde vale agir primeiro.",
    benefits: ["Mostra os pontos fortes que merecem continuar.", "Revela falhas antes que elas afastem clientes.", "Ajuda a equipe a melhorar com base em opiniões reais."],
    preview: [["Clientes", "Avaliação rápida", "Uma forma leve de pedir opinião após o atendimento."], ["Leitura", "Nota média", "Você enxerga a percepção do público de imediato."], ["Melhoria", "Pontos recorrentes", "Sugestões que ajudam a priorizar mudanças."]],
  },
  eventos: {
    name: "YG Eventos",
    title: "Organize inscrições e confirmações para que seu evento comece antes da porta abrir.",
    copy: "A pessoa se inscreve, você acompanha as confirmações e enxerga a lotação sem depender de listas espalhadas. Isso deixa a comunicação mais profissional e o dia do evento mais leve.",
    benefits: ["Facilita saber quem confirmou presença.", "Evita ultrapassar a capacidade do evento.", "Deixa os participantes mais bem informados."],
    preview: [["Inscrições", "42 confirmados", "Participantes reunidos em uma lista organizada."], ["Lotação", "8 vagas livres", "Você acompanha a capacidade sem fazer contas manuais."], ["Comunicação", "Evento atualizado", "Informações prontas para orientar cada participante."]],
  },
};

let selectedDemo = "restaurante";
let logoDataUrl = "";

document.body.classList.add("site-ready");

function updateEcosystemDetail(tabName) {
  const product = demoProducts[tabName] || demoProducts.restaurante;
  if (detailLabel) detailLabel.textContent = product.name;
  if (detailTitle) detailTitle.textContent = product.title;
  if (detailCopy) detailCopy.textContent = product.copy;
  if (detailBenefits) detailBenefits.innerHTML = product.benefits.map((benefit) => `<li>${benefit}</li>`).join("");
  if (detailDemo) detailDemo.dataset.demo = tabName;
  if (detailPreview) {
    detailPreview.innerHTML = product.preview.map(([label, title, copy], index) =>
      `<div class="demo-panel ${index === 0 ? "menu" : index === 1 ? "order" : "admin"}"><span>${label}</span><strong>${title}</strong><small>${copy}</small></div>`).join("");
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
  if (demoModalProduct) demoModalProduct.textContent = demoProducts[selectedDemo].name;
  if (demoFormNote) demoFormNote.textContent = "";
  if (demoModal) demoModal.hidden = false;
}

function closeDemoModal() {
  if (demoModal) demoModal.hidden = true;
}

function renderDemo({ businessName, brandColor, logo }) {
  const sessionId = crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const payload = { businessName, brandColor, logo, product: demoProducts[selectedDemo].name, model: selectedDemo, createdAt: new Date().toISOString() };
  try {
    localStorage.setItem(`yg-systems:demo:${sessionId}`, JSON.stringify(payload));
  } catch {
    payload.logo = "";
    try {
      localStorage.setItem(`yg-systems:demo:${sessionId}`, JSON.stringify(payload));
    } catch {
      if (demoFormNote) demoFormNote.textContent = "Não foi possível preparar esta demo. Feche algumas demos abertas e tente novamente.";
      return false;
    }
  }
  const url = `${demoPaths[selectedDemo] || demoPaths.restaurante}?demoSession=${encodeURIComponent(sessionId)}`;
  if (!window.open(url, "_blank")) window.location.assign(url);
  return true;
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
  const scale = Math.min(1, 420 / Math.max(image.width, image.height));
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
  try {
    logoDataUrl = await shrinkLogo(file);
    if (demoFormNote) demoFormNote.textContent = "Logo pronta para a demonstração.";
  } catch {
    if (demoFormNote) demoFormNote.textContent = "Não foi possível usar esta imagem. Tente uma logo menor.";
  }
});

demoForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(demoForm);
  if (renderDemo({ businessName: String(data.get("businessName") || "Empresa Demonstracao"), brandColor: String(data.get("brandColor") || "#168bff"), logo: logoDataUrl })) closeDemoModal();
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const payload = { name: data.get("name"), phone: data.get("phone"), email: data.get("email"), message: data.get("message") };
  try { localStorage.setItem("yg-systems:last-lead-preview", JSON.stringify(payload)); } catch { /* WhatsApp remains available. */ }
  const text = `Olá, YG Systems!\n\nNome: ${payload.name}\nWhatsApp: ${payload.phone}\nE-mail: ${payload.email || "não informado"}\nO que quero organizar: ${payload.message}`;
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
