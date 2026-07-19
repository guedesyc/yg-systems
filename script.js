const form = document.querySelector("#leadForm");
const note = document.querySelector("#formNote");
const tabButtons = document.querySelectorAll("[data-tab]");
const tabPanels = document.querySelectorAll("[data-panel]");

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

tabButtons.forEach((button) => {
  button.addEventListener("click", () => activateTab(button.dataset.tab));
  button.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    activateTab(button.dataset.tab);
  });
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
