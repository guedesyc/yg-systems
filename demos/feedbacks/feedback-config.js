(() => {
  const config = window.YG_DEMO_CONFIG || {
    businessName: "YG Feedbacks",
    brandColor: "#168bff",
    logo: "",
  };
  window.YG_FEEDBACK_CONFIG = {
    businessName: config.businessName,
    brandColor: config.brandColor,
    logo: config.logo || "../../assets/yg-systems-logo.png",
    storagePrefix: window.YG_DEMO_STORAGE_PREFIX || "yg-systems:demo-state:feedbacks-preview",
  };
  document.documentElement.style.setProperty("--teal", config.brandColor || "#0f7f9b");
  document.documentElement.style.setProperty("--aqua", config.brandColor || "#4bb6c9");
  document.title = `${config.businessName} | Feedbacks`;
})();
