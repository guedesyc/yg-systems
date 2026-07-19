const form = document.querySelector("#leadForm");
const note = document.querySelector("#formNote");
const tabButtons = document.querySelectorAll("[data-tab]");
const tabPanels = document.querySelectorAll("[data-panel]");
const demoTriggers = document.querySelectorAll(".demo-trigger");
const demoModal = document.querySelector("#demoModal");
const demoForm = document.querySelector("#demoForm");
const demoModalClose = document.querySelector("#demoModalClose");
const demoModalProduct = document.querySelector("#demoModalProduct");
const demoLogoInput = demoForm?.querySelector('input[name="businessLogo"]');

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
  },
  bar: {
    name: "YG Bar",
  },
  estoque: {
    name: "YG Estoque e Controle",
  },
  financeiro: {
    name: "YG Financeiro",
  },
  feedbacks: {
    name: "YG Feedbacks",
  },
  eventos: {
    name: "YG Eventos",
  },
};

let selectedDemo = "restaurante";
let logoDataUrl = "";

document.body.classList.add("site-ready");

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
}

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "YG";
}

function openDemoModal(productKey) {
  selectedDemo = productKey || "restaurante";
  const product = demoProducts[selectedDemo];
  if (demoModalProduct) demoModalProduct.textContent = product.name;
  if (demoEditButton) demoEditButton.dataset.demo = selectedDemo;
  if (demoModal) demoModal.hidden = false;
}

function closeDemoModal() {
  if (demoModal) demoModal.hidden = true;
}

function renderDemo({ businessName, brandColor, logo }) {
  const product = demoProducts[selectedDemo];
  const sessionId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const payload = {
    businessName,
    brandColor,
    logo,
    product: product.name,
    model: selectedDemo,
    createdAt: new Date().toISOString(),
  };
  window.localStorage.setItem(`yg-systems:demo:${sessionId}`, JSON.stringify(payload));

  const path = demoPaths[selectedDemo] || demoPaths.restaurante;
  window.open(`${path}?demoSession=${encodeURIComponent(sessionId)}`, "_blank", "noopener,noreferrer");
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => activateTab(button.dataset.tab));
  button.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    activateTab(button.dataset.tab);
  });
});

demoTriggers.forEach((button) => {
  button.addEventListener("click", () => openDemoModal(button.dataset.demo));
});

demoModalClose?.addEventListener("click", closeDemoModal);
demoModal?.addEventListener("click", (event) => {
  if (event.target === demoModal) closeDemoModal();
});

demoLogoInput?.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  logoDataUrl = "";
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    logoDataUrl = String(reader.result || "");
  };
  reader.readAsDataURL(file);
});

demoForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(demoForm);
  renderDemo({
    businessName: String(data.get("businessName") || "Empresa Demonstracao"),
    brandColor: String(data.get("brandColor") || "#168bff"),
    logo: logoDataUrl,
  });
  closeDemoModal();
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const payload = {
    product: "YG Systems",
    origin: data.get("origin"),
    name: data.get("name"),
    phone: data.get("phone"),
    email: data.get("email"),
    message: data.get("message"),
    createdAt: new Date().toISOString(),
  };

  window.localStorage.setItem("yg-systems:last-lead-preview", JSON.stringify(payload));

  if (note) {
    note.textContent =
      "Contato preparado em modo demonstracao. Nenhum dado foi enviado para fora deste navegador.";
    note.classList.add("visible");
  }
  form.reset();
});
