(() => {
  const config = window.YG_DEMO_CONFIG;
  const originalName = "Pizzaria no Aconchego";
  let commonApplied = false;

  function replaceOriginalName(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textNodes = [];

    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach((node) => {
      if (node.nodeValue.includes(originalName)) {
        node.nodeValue = node.nodeValue.replaceAll(originalName, config.businessName);
      }
    });

    root.querySelectorAll("[alt], [aria-label], [title]").forEach((node) => {
      ["alt", "aria-label", "title"].forEach((attribute) => {
        const value = node.getAttribute(attribute);
        if (value?.includes(originalName)) {
          node.setAttribute(attribute, value.replaceAll(originalName, config.businessName));
        }
      });
    });
  }

  function applyLogo(root) {
    const logo = root.querySelector(".brand-block img");
    if (!logo) return;
    logo.src = config.logo || "./yg-systems-monogram.png";
    logo.alt = `Logo de ${config.businessName}`;
  }

  function applyBrand() {
    const root = document.getElementById("root");
    if (!root || !root.children.length) return;

    if (!commonApplied) {
      window.YG_DEMO_APPLY?.("restaurante");
      commonApplied = true;
    }

    document.documentElement.style.setProperty("--red", config.brandColor);
    document.documentElement.style.setProperty(
      "--red-dark",
      `color-mix(in srgb, ${config.brandColor} 72%, #000)`,
    );
    document.title = `${config.businessName} | Cardapio`;
    replaceOriginalName(root);
    applyLogo(root);
  }

  const root = document.getElementById("root");
  const observer = new MutationObserver(applyBrand);
  observer.observe(root, { childList: true, subtree: true });
  document.addEventListener("DOMContentLoaded", applyBrand);
  window.addEventListener("load", applyBrand);
})();
