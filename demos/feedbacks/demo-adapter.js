document.addEventListener("DOMContentLoaded", () => {
  window.YG_DEMO_APPLY?.("feedbacks");
  const config = window.YG_DEMO_CONFIG;
  document.querySelectorAll("[data-business-name]").forEach((node) => {
    node.textContent = config.businessName;
  });
});
