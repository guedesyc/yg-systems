const form = document.querySelector("#leadForm");
const note = document.querySelector("#formNote");
const tabButtons = document.querySelectorAll("[data-tab]");
const tabPanels = document.querySelectorAll("[data-panel]");
const demoTriggers = document.querySelectorAll(".demo-trigger");
const demoModal = document.querySelector("#demoModal");
const demoForm = document.querySelector("#demoForm");
const demoModalClose = document.querySelector("#demoModalClose");
const demoModalProduct = document.querySelector("#demoModalProduct");
const demoSection = document.querySelector("#demo-personalizada");
const demoContent = document.querySelector("#demoContent");
const demoLogo = document.querySelector("#demoLogo");
const demoProductName = document.querySelector("#demoProductName");
const demoBusinessName = document.querySelector("#demoBusinessName");
const demoEditButton = document.querySelector("#demoEditButton");
const demoLogoInput = demoForm?.querySelector('input[name="businessLogo"]');

const demoProducts = {
  restaurante: {
    name: "YG Restaurante",
    headline: "Cardapio e pedidos organizados",
    metrics: ["8 pedidos hoje", "3 em preparo", "R$ 486,70 em vendas"],
    rows: [
      ["Pizza Grande", "Calabresa / Marguerita", "Em preparo"],
      ["Combo Familia", "Portuguesa", "Saiu para entrega"],
      ["Refrigerante 2L", "Retirada", "Finalizado"],
    ],
    actions: ["Montar pedido", "Ver cardapio", "Acompanhar status"],
  },
  bar: {
    name: "YG Bar",
    headline: "Comandas, mesas e consumo em aberto",
    metrics: ["12 mesas ativas", "5 comandas abertas", "R$ 1.248,30 no turno"],
    rows: [
      ["Mesa 04", "3 bebidas, 2 porcoes", "Aberta"],
      ["Mesa 08", "Comanda compartilhada", "Aguardando fechamento"],
      ["Balcao", "Pagamento no cartao", "Finalizado"],
    ],
    actions: ["Abrir comanda", "Fechar mesa", "Resumo do turno"],
  },
  estoque: {
    name: "YG Estoque e Controle",
    headline: "Estoque simples com alerta de reposicao",
    metrics: ["6 itens baixos", "32 produtos", "14 movimentacoes hoje"],
    rows: [
      ["Brownie tradicional", "12 unidades", "Atencao"],
      ["Embalagem pequena", "42 unidades", "Ok"],
      ["Chocolate meio amargo", "3 kg", "Repor"],
    ],
    actions: ["Adicionar entrada", "Registrar saida", "Ver alertas"],
  },
  financeiro: {
    name: "YG Financeiro",
    headline: "Entradas, saidas e contas do periodo",
    metrics: ["R$ 8.920,00 receitas", "R$ 4.640,00 despesas", "R$ 4.280,00 saldo"],
    rows: [
      ["Vendas do dia", "R$ 920,00", "Recebido"],
      ["Fornecedor", "R$ 340,00", "Vence amanha"],
      ["Aluguel", "R$ 1.400,00", "Agendado"],
    ],
    actions: ["Lancar entrada", "Lancar despesa", "Ver resumo"],
  },
  feedbacks: {
    name: "YG Feedbacks",
    headline: "Opinioes dos clientes em um painel simples",
    metrics: ["4,7 nota media", "30 respostas", "6 sugestoes novas"],
    rows: [
      ["Atendimento", "5 estrelas", "Elogio"],
      ["Tempo de entrega", "4 estrelas", "Melhorar prazo"],
      ["Produto", "5 estrelas", "Recompra provavel"],
    ],
    actions: ["Criar formulario", "Ver respostas", "Pontos de melhoria"],
  },
  eventos: {
    name: "YG Eventos",
    headline: "Eventos, participantes e confirmacoes",
    metrics: ["42 confirmados", "8 vagas livres", "R$ 2.100,00 previsto"],
    rows: [
      ["Workshop sabado", "42 participantes", "Confirmado"],
      ["Lista de espera", "6 pessoas", "Acompanhar"],
      ["Check-in", "18 presentes", "Em andamento"],
    ],
    actions: ["Criar evento", "Ver inscritos", "Confirmar presenca"],
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
  document.documentElement.style.setProperty("--demo-accent", brandColor);

  if (demoProductName) demoProductName.textContent = product.name;
  if (demoBusinessName) demoBusinessName.textContent = businessName;
  if (demoEditButton) demoEditButton.dataset.demo = selectedDemo;

  if (demoLogo) {
    demoLogo.innerHTML = logo
      ? `<img src="${logo}" alt="Logo de ${businessName}">`
      : `<span>${getInitials(businessName)}</span>`;
  }

  if (demoContent) {
    demoContent.innerHTML = `
      <section class="demo-hero-card">
        <span>${product.name}</span>
        <h3>${product.headline}</h3>
        <p>${businessName} visualizando uma demonstracao personalizada com dados ficticios e identidade propria.</p>
        <div class="demo-actions">
          ${product.actions.map((action) => `<button type="button">${action}</button>`).join("")}
        </div>
      </section>
      <section class="demo-metrics">
        ${product.metrics.map((metric) => `<article><strong>${metric}</strong><small>Dados ficticios da demo</small></article>`).join("")}
      </section>
      <section class="demo-table" aria-label="Dados demonstrativos">
        ${product.rows
          .map(
            (row) => `
              <article>
                <strong>${row[0]}</strong>
                <span>${row[1]}</span>
                <b>${row[2]}</b>
              </article>
            `,
          )
          .join("")}
      </section>
    `;
  }

  if (demoSection) {
    demoSection.hidden = false;
    demoSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
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
