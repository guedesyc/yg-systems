const YG_FEEDBACK_CONFIG = window.YG_FEEDBACK_CONFIG || {};

const CONFIG = {
  unitName: YG_FEEDBACK_CONFIG.businessName || "YG Feedbacks",
  logoPath: YG_FEEDBACK_CONFIG.logo || "../../assets/yg-systems-monogram.png",
  adminUser: "admin",
  adminPassword: "admin1234",
  futureReportEmails: "",
};

const STORAGE_KEYS = {
  menu: `${YG_FEEDBACK_CONFIG.storagePrefix || "yg-feedback"}:menu`,
  responses: `${YG_FEEDBACK_CONFIG.storagePrefix || "yg-feedback"}:responses`,
  emails: `${YG_FEEDBACK_CONFIG.storagePrefix || "yg-feedback"}:emails`,
};

const defaultMenu = {
  mainDish: "Frango grelhado",
  optionDish: "Omelete de legumes",
  sideOne: "Arroz branco",
  sideTwo: "Feijao carioca",
};

const questions = [
  "Como voce avalia a qualidade da comida?",
  "Como voce avalia o sabor dos pratos?",
  "Como voce avalia a apresentacao dos pratos?",
  "Como voce avalia o tempo de espera pelo seu pedido?",
  "Como voce avalia a limpeza e organizacao do restaurante?",
  "Como voce avalia o ambiente do restaurante, considerando conforto, climatizacao e organizacao?",
  "Como voce avalia a variedade das opcoes de alimentacao oferecidas?",
  "Como voce avalia o atendimento da nossa equipe?",
  "De forma geral, como voce avalia sua experiencia em nosso restaurante?",
];

const ratingLabels = [
  "Extremamente Ruim",
  "Ruim",
  "Normal",
  "Bom",
  "Extremamente Bom",
];

const elements = {
  unitName: document.querySelector("#unitName"),
  brandLogo: document.querySelector("#brandLogo"),
  menuPreview: document.querySelector("#menuPreview"),
  menuOptions: document.querySelector("#menuOptions"),
  questions: document.querySelector("#questions"),
  surveyForm: document.querySelector("#surveyForm"),
  openAdmin: document.querySelector("#openAdmin"),
  adminModal: document.querySelector("#adminModal"),
  loginForm: document.querySelector("#loginForm"),
  loginView: document.querySelector("#loginView"),
  adminView: document.querySelector("#adminView"),
  menuForm: document.querySelector("#menuForm"),
  responseCount: document.querySelector("#responseCount"),
  exportXlsx: document.querySelector("#exportXlsx"),
  clearResponses: document.querySelector("#clearResponses"),
  logoutAdmin: document.querySelector("#logoutAdmin"),
  reportEmails: document.querySelector("#reportEmails"),
  toast: document.querySelector("#toast"),
};

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getMenu() {
  return readJson(STORAGE_KEYS.menu, defaultMenu);
}

function getResponses() {
  return readJson(STORAGE_KEYS.responses, []);
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    elements.toast.classList.remove("is-visible");
  }, 3200);
}

function menuEntries(menu) {
  return [
    ["Prato principal", menu.mainDish],
    ["Prato opcao", menu.optionDish],
    ["Guarnicao 1", menu.sideOne],
    ["Guarnicao 2", menu.sideTwo],
  ];
}

function renderMenu() {
  const menu = getMenu();
  elements.menuPreview.innerHTML = "";
  elements.menuOptions.innerHTML = "";

  menuEntries(menu).forEach(([label, value]) => {
    const previewItem = document.createElement("li");
    previewItem.textContent = `${label}: ${value}`;
    elements.menuPreview.appendChild(previewItem);

    const option = document.createElement("label");
    option.className = "check-card";
    option.innerHTML = `
      <input type="checkbox" name="food" value="${escapeHtml(value)}" data-label="${escapeHtml(label)}" />
      <span>${escapeHtml(value)}<small>${escapeHtml(label)}</small></span>
    `;
    elements.menuOptions.appendChild(option);
  });

  document.querySelector("#mainDish").value = menu.mainDish;
  document.querySelector("#optionDish").value = menu.optionDish;
  document.querySelector("#sideOne").value = menu.sideOne;
  document.querySelector("#sideTwo").value = menu.sideTwo;
}

function renderQuestions() {
  elements.questions.innerHTML = "";
  questions.forEach((question, index) => {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "question";
    fieldset.innerHTML = `
      <legend>${index + 1}. ${escapeHtml(question)}</legend>
      <div class="rating-grid">
        ${ratingLabels
          .map((label, ratingIndex) => {
            const value = ratingIndex + 1;
            return `
              <label class="rating-option">
                <input type="radio" name="q${index + 1}" value="${value}" required />
                <span><strong>${"⭐".repeat(value)}</strong>${label}</span>
              </label>
            `;
          })
          .join("")}
      </div>
    `;
    elements.questions.appendChild(fieldset);
  });
}

function updateResponseCount() {
  const total = getResponses().length;
  elements.responseCount.textContent = `${total} resposta${total === 1 ? "" : "s"} registrada${total === 1 ? "" : "s"}`;
}

function openAdminModal() {
  elements.adminModal.classList.add("is-open");
  elements.adminModal.setAttribute("aria-hidden", "false");
  document.querySelector("#adminUser").focus();
}

function closeAdminModal() {
  elements.adminModal.classList.remove("is-open");
  elements.adminModal.setAttribute("aria-hidden", "true");
}

function showAdminPanel() {
  elements.loginView.hidden = true;
  elements.adminView.hidden = false;
  renderMenu();
  updateResponseCount();
}

function hideAdminPanel() {
  elements.loginView.hidden = false;
  elements.adminView.hidden = true;
  elements.loginForm.reset();
}

function handleSurveySubmit(event) {
  event.preventDefault();

  const formData = new FormData(elements.surveyForm);
  const selectedFood = Array.from(document.querySelectorAll('input[name="food"]:checked')).map(
    (input) => ({
      category: input.dataset.label,
      item: input.value,
    }),
  );

  if (selectedFood.length === 0) {
    showToast("Selecione pelo menos um item consumido.");
    return;
  }

  const answers = {};
  questions.forEach((question, index) => {
    const value = formData.get(`q${index + 1}`);
    answers[`Pergunta ${index + 1}`] = {
      question,
      rating: Number(value),
      label: ratingLabels[Number(value) - 1],
    };
  });

  const response = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    unit: CONFIG.unitName,
    date: new Date().toISOString(),
    fullName: String(formData.get("fullName") || "").trim(),
    frequency: String(formData.get("frequency") || ""),
    selectedFood,
    answers,
    comments: String(formData.get("comments") || "").trim(),
  };

  const responses = getResponses();
  responses.push(response);
  writeJson(STORAGE_KEYS.responses, responses);

  elements.surveyForm.reset();
  updateResponseCount();
  showToast("Avaliacao enviada com sucesso. Obrigado!");
}

function handleLogin(event) {
  event.preventDefault();
  const user = document.querySelector("#adminUser").value.trim();
  const pass = document.querySelector("#adminPass").value;

  if (user === CONFIG.adminUser && pass === CONFIG.adminPassword) {
    showAdminPanel();
    showToast("Acesso liberado.");
    return;
  }

  showToast("Usuario ou senha invalido.");
}

function handleMenuSave(event) {
  event.preventDefault();
  const menu = {
    mainDish: document.querySelector("#mainDish").value.trim(),
    optionDish: document.querySelector("#optionDish").value.trim(),
    sideOne: document.querySelector("#sideOne").value.trim(),
    sideTwo: document.querySelector("#sideTwo").value.trim(),
  };

  writeJson(STORAGE_KEYS.menu, menu);
  renderMenu();
  showToast("Cardapio salvo.");
}

function exportResponsesToXlsx() {
  const responses = getResponses();
  if (responses.length === 0) {
    showToast("Ainda nao ha respostas para exportar.");
    return;
  }

  if (!window.XLSX) {
    showToast("Biblioteca XLSX nao carregou. Verifique a conexao com a internet.");
    return;
  }

  const rows = buildResponseRows(responses);
  const worksheet = XLSX.utils.json_to_sheet(rows);
  worksheet["!autofilter"] = { ref: worksheet["!ref"] };
  worksheet["!cols"] = buildColumnWidths(rows);

  const indicators = buildIndicatorRows(responses);
  const indicatorSheet = XLSX.utils.aoa_to_sheet(indicators);
  indicatorSheet["!cols"] = [
    { wch: 46 },
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
    { wch: 24 },
    { wch: 14 },
    { wch: 14 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Respostas");
  XLSX.utils.book_append_sheet(workbook, indicatorSheet, "Indicadores");

  const today = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(workbook, `pesquisa-satisfacao-${today}.xlsx`);
  showToast("Arquivo XLSX gerado.");
}

function buildResponseRows(responses) {
  return responses.map((response) => {
    const foodByCategory = mapFoodByCategory(response.selectedFood);
    const row = {
      "Data/Hora": formatDate(response.date),
      Data: formatDateOnly(response.date),
      Unidade: response.unit,
      "Nome completo": response.fullName || "Nao informado",
      Frequencia: response.frequency || "Nao informado",
      "Prato principal": foodByCategory["Prato principal"] || "",
      "Prato opcao": foodByCategory["Prato opcao"] || "",
      "Guarnicao 1": foodByCategory["Guarnicao 1"] || "",
      "Guarnicao 2": foodByCategory["Guarnicao 2"] || "",
      "Itens consumidos": response.selectedFood
        .map((food) => `${food.category}: ${food.item}`)
        .join(" | "),
      Comentarios: response.comments,
    };

    Object.values(response.answers).forEach((answer, index) => {
      row[`P${index + 1} - Nota`] = answer.rating;
      row[`P${index + 1} - Avaliacao`] = answer.label;
      row[`P${index + 1} - Pergunta`] = answer.question;
    });

    return row;
  });
}

function buildIndicatorRows(responses) {
  const rows = [
    ["Indicadores da Pesquisa de Satisfacao"],
    ["Total de respostas", responses.length],
    ["Periodo inicial", getMinDate(responses)],
    ["Periodo final", getMaxDate(responses)],
    [],
    ["Resumo por pergunta"],
    [
      "Pergunta",
      "Extremamente Ruim",
      "Ruim",
      "Normal",
      "Bom",
      "Extremamente Bom",
      "Total",
      "Media",
    ],
  ];

  questions.forEach((question, index) => {
    const ratings = responses.map((response) => response.answers[`Pergunta ${index + 1}`]?.rating);
    rows.push([
      `${index + 1}. ${question}`,
      countValues(ratings, 1),
      countValues(ratings, 2),
      countValues(ratings, 3),
      countValues(ratings, 4),
      countValues(ratings, 5),
      ratings.filter(Boolean).length,
      calculateAverage(ratings),
    ]);
  });

  rows.push(
    [],
    ["Resumo geral das avaliacoes"],
    ["Avaliacao", "Quantidade"],
    ...ratingLabels.map((label, index) => [
      label,
      responses.reduce((total, response) => {
        return (
          total +
          Object.values(response.answers).filter((answer) => answer.rating === index + 1).length
        );
      }, 0),
    ]),
    [],
    ["Frequencia de visita"],
    ["Frequencia", "Quantidade"],
    ...objectToRows(countBy(responses, (response) => response.frequency || "Nao informado")),
    [],
    ["Respostas por data"],
    ["Data", "Quantidade"],
    ...objectToRows(countBy(responses, (response) => formatDateOnly(response.date))),
    [],
    ["Pratos e guarnicoes consumidos"],
    ["Item", "Quantidade"],
    ...objectToRows(
      countBy(
        responses.flatMap((response) => response.selectedFood.map((food) => food.item)),
        (item) => item,
      ),
    ),
  );

  return rows;
}

function mapFoodByCategory(selectedFood) {
  return selectedFood.reduce((result, food) => {
    result[food.category] = food.item;
    return result;
  }, {});
}

function countValues(values, target) {
  return values.filter((value) => value === target).length;
}

function calculateAverage(values) {
  const validValues = values.filter(Boolean);
  if (validValues.length === 0) return "";
  const average = validValues.reduce((total, value) => total + value, 0) / validValues.length;
  return Number(average.toFixed(2));
}

function countBy(items, getKey) {
  return items.reduce((result, item) => {
    const key = getKey(item) || "Nao informado";
    result[key] = (result[key] || 0) + 1;
    return result;
  }, {});
}

function objectToRows(counts) {
  return Object.entries(counts).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return a[0].localeCompare(b[0]);
  });
}

function buildColumnWidths(rows) {
  const firstRow = rows[0] || {};
  return Object.keys(firstRow).map((key) => ({
    wch: Math.min(Math.max(key.length + 4, 14), 36),
  }));
}

function saveReportEmails() {
  localStorage.setItem(STORAGE_KEYS.emails, elements.reportEmails.value.trim());
}

function clearResponses() {
  const confirmed = window.confirm(
    "Tem certeza que deseja apagar as respostas salvas neste navegador?",
  );
  if (!confirmed) return;

  writeJson(STORAGE_KEYS.responses, []);
  updateResponseCount();
  showToast("Respostas apagadas.");
}

function formatDate(value) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatDateOnly(value) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
  }).format(new Date(value));
}

function getMinDate(responses) {
  const dates = responses.map((response) => new Date(response.date).getTime());
  return formatDateOnly(new Date(Math.min(...dates)));
}

function getMaxDate(responses) {
  const dates = responses.map((response) => new Date(response.date).getTime());
  return formatDateOnly(new Date(Math.max(...dates)));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function bindEvents() {
  elements.surveyForm.addEventListener("submit", handleSurveySubmit);
  elements.openAdmin.addEventListener("click", openAdminModal);
  elements.loginForm.addEventListener("submit", handleLogin);
  elements.menuForm.addEventListener("submit", handleMenuSave);
  elements.exportXlsx.addEventListener("click", exportResponsesToXlsx);
  elements.clearResponses.addEventListener("click", clearResponses);
  elements.logoutAdmin.addEventListener("click", hideAdminPanel);
  elements.reportEmails.addEventListener("change", saveReportEmails);

  document.querySelectorAll("[data-close-admin]").forEach((button) => {
    button.addEventListener("click", closeAdminModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAdminModal();
  });
}

function init() {
  elements.unitName.textContent = CONFIG.unitName;
  elements.brandLogo.src = CONFIG.logoPath;
  elements.reportEmails.value =
    localStorage.getItem(STORAGE_KEYS.emails) || CONFIG.futureReportEmails;
  renderMenu();
  renderQuestions();
  updateResponseCount();
  bindEvents();
}

init();
