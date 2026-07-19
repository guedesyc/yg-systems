const form = document.querySelector("#leadForm");
const note = document.querySelector("#formNote");

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

  note.textContent =
    "Contato preparado em modo demonstracao. Nenhum dado foi enviado para fora deste navegador.";
  note.classList.add("visible");
  form.reset();
});
