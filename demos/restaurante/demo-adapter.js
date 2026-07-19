document.addEventListener("DOMContentLoaded", () => {
  window.YG_DEMO_APPLY?.("restaurante");
  const config = window.YG_DEMO_CONFIG;
  const brandMark = document.querySelector(".brand-mark");
  if (brandMark && config.logo) {
    brandMark.innerHTML = `<img src="${config.logo}" alt="Logo de ${config.businessName}">`;
  } else if (brandMark) {
    brandMark.textContent = config.businessName
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "YG";
  }
});
