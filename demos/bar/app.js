const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const dateLabel = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" });
const serviceRate = 0.1;

const menuItems = [
  { id: "amstel-600", name: "Amstel garrafa 600 ml", description: "Cerveja 600 ml.", price: 12, category: "Cervejas", station: "bar", icon: "CV" },
  { id: "amstel-lata-350", name: "Amstel lata 350 ml", description: "Cerveja lata 350 ml.", price: 6, category: "Cervejas", station: "bar", icon: "CV" },
  { id: "brahma-duplo-malte-600", name: "Brahma Duplo Malte 600 ml", description: "Cerveja 600 ml.", price: 10, category: "Cervejas", station: "bar", icon: "CV" },
  { id: "brahma-chopp-600", name: "Brahma Chopp 600 ml", description: "Cerveja 600 ml.", price: 10, category: "Cervejas", station: "bar", icon: "CV" },
  { id: "budweiser-600", name: "Budweiser 600 ml", description: "Cerveja 600 ml.", price: 14, category: "Cervejas", station: "bar", icon: "CV" },
  { id: "budweiser-long-neck", name: "Budweiser long neck", description: "Cerveja long neck.", price: 10, category: "Cervejas", station: "bar", icon: "CV" },
  { id: "heineken-600", name: "Heineken 600 ml", description: "Cerveja 600 ml.", price: 17, category: "Cervejas", station: "bar", icon: "CV" },
  { id: "heineken-long-neck", name: "Heineken long neck c/ e s/ alcool", description: "Long neck com ou sem alcool.", price: 10, category: "Cervejas", station: "bar", icon: "CV" },
  { id: "imperio-long-neck", name: "Imperio long neck", description: "Cerveja long neck.", price: 8, category: "Cervejas", station: "bar", icon: "CV" },
  { id: "malzbier", name: "Malzbier", description: "Cerveja Malzbier.", price: 10, category: "Cervejas", station: "bar", icon: "CV" },
  { id: "itaipava-600", name: "Itaipava 600 ml", description: "Cerveja 600 ml.", price: 9, category: "Cervejas", station: "bar", icon: "CV" },
  { id: "skol-600", name: "Skol 600 ml", description: "Cerveja 600 ml.", price: 10, category: "Cervejas", station: "bar", icon: "CV" },
  { id: "skol-beats", name: "Skol Beats", description: "Bebida alcoolica.", price: 6, category: "Cervejas", station: "bar", icon: "CV" },
  { id: "spaten-long-neck", name: "Spaten long neck", description: "Cerveja long neck.", price: 10, category: "Cervejas", station: "bar", icon: "CV" },
  { id: "spaten-600", name: "Spaten 600 ml", description: "Cerveja 600 ml.", price: 14, category: "Cervejas", station: "bar", icon: "CV" },
  { id: "stella-600", name: "Stella 600 ml", description: "Cerveja 600 ml.", price: 14, category: "Cervejas", station: "bar", icon: "CV" },
  { id: "stella-long-neck", name: "Stella long neck", description: "Cerveja long neck.", price: 10, category: "Cervejas", station: "bar", icon: "CV" },
  { id: "devassa", name: "Devassa", description: "Cerveja.", price: 9, category: "Cervejas", station: "bar", icon: "CV" },
  { id: "antarctica-original", name: "Antarctica Original", description: "Cerveja.", price: 13, category: "Cervejas", station: "bar", icon: "CV" },
  { id: "corona-long-neck", name: "Corona long neck", description: "Cerveja long neck.", price: 10, category: "Cervejas", station: "bar", icon: "CV" },
  { id: "vodka-dose", name: "Vodka dose", description: "Dose.", price: 6, category: "Destilados", station: "bar", icon: "DS" },
  { id: "ypioca-dose", name: "Ypioca dose", description: "Dose.", price: 3, category: "Destilados", station: "bar", icon: "DS" },
  { id: "pitu-dose", name: "Pitu dose", description: "Dose.", price: 6, category: "Destilados", station: "bar", icon: "DS" },
  { id: "rocks-dose", name: "Rocks dose", description: "Dose.", price: 6, category: "Destilados", station: "bar", icon: "DS" },
  { id: "51-dose", name: "51 dose", description: "Dose.", price: 3, category: "Destilados", station: "bar", icon: "DS" },
  { id: "51-ouro-dose", name: "51 Ouro dose", description: "Dose.", price: 4, category: "Destilados", station: "bar", icon: "DS" },
  { id: "seleta-dose", name: "Seleta dose", description: "Dose.", price: 7, category: "Destilados", station: "bar", icon: "DS" },
  { id: "canelinha-dose", name: "Canelinha dose", description: "Dose.", price: 3, category: "Destilados", station: "bar", icon: "DS" },
  { id: "whisky-old-parr", name: "Whisky Old Parr", description: "Dose.", price: 20, category: "Destilados", station: "bar", icon: "DS" },
  { id: "campari-dose", name: "Campari dose", description: "Dose.", price: 7, category: "Destilados", station: "bar", icon: "DS" },
  { id: "schweppes", name: "Schweppes", description: "Bebida sem alcool.", price: 7, category: "Nao Alcoolicos", station: "bar", icon: "NA" },
  { id: "agua-tonica", name: "Agua tonica", description: "Bebida sem alcool.", price: 7, category: "Nao Alcoolicos", station: "bar", icon: "NA" },
  { id: "h2o", name: "H2O", description: "Bebida sem alcool.", price: 8, category: "Nao Alcoolicos", station: "bar", icon: "NA" },
  { id: "agua-mineral-gas", name: "Agua mineral c/ gas", description: "Agua mineral com gas.", price: 4, category: "Nao Alcoolicos", station: "bar", icon: "NA" },
  { id: "agua-mineral-sem-gas", name: "Agua mineral s/ gas", description: "Agua mineral sem gas.", price: 3, category: "Nao Alcoolicos", station: "bar", icon: "NA" },
  { id: "red-bull", name: "Red Bull", description: "Energetico.", price: 12, category: "Nao Alcoolicos", station: "bar", icon: "NA" },
  { id: "refrigerante-1l", name: "Refrigerante 1 litro", description: "Refrigerante 1 litro.", price: 9, category: "Nao Alcoolicos", station: "bar", icon: "NA" },
  { id: "coca-cola-1l", name: "Coca-Cola 1 litro", description: "Refrigerante 1 litro.", price: 12, category: "Nao Alcoolicos", station: "bar", icon: "NA" },
  { id: "coca-cola-lata", name: "Coca-Cola lata", description: "Refrigerante lata.", price: 6, category: "Nao Alcoolicos", station: "bar", icon: "NA" },
  { id: "refrigerante-lata", name: "Refrigerante lata", description: "Refrigerante lata.", price: 5, category: "Nao Alcoolicos", station: "bar", icon: "NA" },
  { id: "sprite-limonada-fresh", name: "Sprite Limonada Fresh", description: "Refrigerante.", price: 8, category: "Nao Alcoolicos", station: "bar", icon: "NA" },
  { id: "batata-frita-300", name: "Batata frita 300 grs", description: "Porcao de batata frita.", price: 25, category: "Petiscos", station: "cozinha", icon: "PT" },
  { id: "bolinho-bacalhau-8", name: "Bolinho de bacalhau 08 unid.", description: "Porcao com 8 unidades.", price: 35, category: "Petiscos", station: "cozinha", icon: "PT" },
  { id: "bolinho-queijo-10", name: "Bolinho de queijo 10 unid.", description: "Porcao com 10 unidades.", price: 25, category: "Petiscos", station: "cozinha", icon: "PT" },
  { id: "coxinha-10", name: "Coxinha 10 unid.", description: "Porcao com 10 unidades.", price: 25, category: "Petiscos", station: "cozinha", icon: "PT" },
  { id: "kibe-10", name: "Kibe 10 unid.", description: "Porcao com 10 unidades.", price: 25, category: "Petiscos", station: "cozinha", icon: "PT" },
  { id: "encapotado-camarao-8", name: "Encapotado camarao 8 unid.", description: "Porcao com 8 unidades.", price: 35, category: "Petiscos", station: "cozinha", icon: "PT" },
  { id: "carne-sol-fritas", name: "Carne do sol c/ fritas", description: "Porcao de carne do sol com fritas.", price: 45, category: "Petiscos", station: "cozinha", icon: "PT" },
  { id: "carne-sol-farofa-salada", name: "Carne do sol c/ farofa e salada", description: "Porcao de carne do sol com farofa e salada.", price: 50, category: "Petiscos", station: "cozinha", icon: "PT" },
  { id: "pirao-aipim-carne-sol", name: "Pirao de aipim c/ carne do sol", description: "Pirao de aipim com carne do sol.", price: 80, category: "Petiscos", station: "cozinha", icon: "PT" },
  { id: "pastel-frango-10", name: "Porcao de pastel frango 10 unid.", description: "Porcao com 10 unidades.", price: 30, category: "Petiscos", station: "cozinha", icon: "PT" },
  { id: "pastel-10", name: "Porcao de pastel 10 unid.", description: "Porcao com 10 unidades.", price: 40, category: "Petiscos", station: "cozinha", icon: "PT" },
  { id: "caldo-sururu", name: "Caldo sururu", description: "Caldo.", price: 20, category: "Petiscos", station: "cozinha", icon: "PT" },
  { id: "caldo-verde", name: "Caldo verde", description: "Caldo.", price: 15, category: "Petiscos", station: "cozinha", icon: "PT" },
  { id: "caldo-camarao", name: "Caldo camarao", description: "Caldo.", price: 20, category: "Petiscos", station: "cozinha", icon: "PT" }
];

const tableCount = 16;
const categories = [...new Set(menuItems.map((item) => item.category))];
const demoStoragePrefix = window.YG_DEMO_STORAGE_PREFIX || "yg-systems:demo-state:bar-preview";
const stateKey = `${demoStoragePrefix}:bar:state-v2`;
const legacyStateKey = `${demoStoragePrefix}:bar:state-v1`;
const roleKey = `${demoStoragePrefix}:bar:role`;
const rolePermissions = {
  publico: ["menu"],
  garcom: ["waiter", "kitchen"],
  adm: ["menu", "waiter", "kitchen", "sessions", "qr"]
};
const roleLabels = {
  publico: "Publico",
  garcom: "Garcom",
  adm: "Adm"
};
const users = {
  garcom: {
    role: "garcom",
    name: "Garcom",
    passwordHash: "c90dc61cae171669019bbabecad9c1c06aebb586cc1fb0b1a60efaa1594244dd"
  },
  admin: {
    role: "adm",
    name: "Administrador",
    passwordHash: "99d7246127d51d3d672cdb36e3a43a8c01b0bdff4e58585966c628fe53f560dd"
  }
};

const ui = {
  role: sessionStorage.getItem(roleKey) || "publico",
  view: "menu",
  table: Number(new URLSearchParams(location.search).get("mesa")) || 1,
  cart: [],
  station: "all",
  sessionDate: todayInputValue()
};

let state = loadState();

function loadState() {
  const fallback = { tables: {}, lastOrderNumber: 1000 };
  try {
    const stored = JSON.parse(localStorage.getItem(stateKey));
    if (stored) return migrateState(stored);
    const legacy = JSON.parse(localStorage.getItem(legacyStateKey));
    if (legacy) return migrateState(legacy);
    return fallback;
  } catch {
    return fallback;
  }
}

function migrateState(value) {
  const migrated = { tables: {}, lastOrderNumber: value.lastOrderNumber || 1000 };
  Object.entries(value.tables || {}).forEach(([table, data]) => {
    if (Array.isArray(data.sessions)) {
      migrated.tables[table] = data;
      return;
    }
    const orders = Array.isArray(data.orders) ? data.orders : [];
    const openedAt = orders[0]?.createdAt || new Date().toISOString();
    migrated.tables[table] = { activeSessionId: null, sessions: [] };
    if (orders.length) {
      const session = {
        id: randomId(),
        table: Number(table),
        openedAt,
        closedAt: data.closedAt || null,
        orders
      };
      migrated.tables[table].sessions.push(session);
      if (!session.closedAt) migrated.tables[table].activeSessionId = session.id;
    }
  });
  return migrated;
}

function saveState() {
  localStorage.setItem(stateKey, JSON.stringify(state));
}

function tableState(tableNumber = ui.table) {
  const key = String(tableNumber);
  if (!state.tables[key]) state.tables[key] = { activeSessionId: null, sessions: [] };
  return state.tables[key];
}

function activeSession(tableNumber = ui.table) {
  const table = tableState(tableNumber);
  return table.sessions.find((session) => session.id === table.activeSessionId && !session.closedAt) || null;
}

function getOrOpenSession(tableNumber = ui.table, openedAt = new Date().toISOString()) {
  const table = tableState(tableNumber);
  let session = activeSession(tableNumber);
  if (!session) {
    session = { id: randomId(), table: tableNumber, openedAt, closedAt: null, orders: [] };
    table.sessions.push(session);
    table.activeSessionId = session.id;
  }
  return session;
}

function randomId() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

function orderTotal(order) {
  return order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function sessionSubtotal(session) {
  return session ? session.orders.reduce((sum, order) => sum + orderTotal(order), 0) : 0;
}

function serviceFee(value) {
  return value * serviceRate;
}

function finalTotal(value) {
  return value + serviceFee(value);
}

function tableSubtotal(tableNumber = ui.table) {
  return sessionSubtotal(activeSession(tableNumber));
}

function cartTotal() {
  return ui.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function formatDateTime(value) {
  return value ? dateLabel.format(new Date(value)) : "Em aberto";
}

function todayInputValue() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function inputDateValue(value) {
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

function allowedViews(role = ui.role) {
  return rolePermissions[role] || rolePermissions.publico;
}

function canView(view, role = ui.role) {
  return allowedViews(role).includes(view);
}

function defaultView(role = ui.role) {
  return allowedViews(role)[0] || "menu";
}

function setView(view) {
  if (!canView(view)) {
    view = defaultView();
  }
  ui.view = view;
  document.querySelectorAll(".tab").forEach((button) => {
    const visible = canView(button.dataset.view);
    button.hidden = !visible;
    button.classList.toggle("active", visible && button.dataset.view === view);
  });
  document.querySelectorAll(".view").forEach((section) => section.classList.toggle("active", section.id === `view-${view}`));
  renderRoleControls();
  render();
}

function setRole(role) {
  ui.role = rolePermissions[role] ? role : "publico";
  sessionStorage.setItem(roleKey, ui.role);
  ui.cart = [];
  hideLogin();
  setView(defaultView());
}

function renderRoleControls() {
  document.getElementById("role-badge").textContent = roleLabels[ui.role] || roleLabels.publico;
  document.getElementById("open-login").hidden = ui.role !== "publico";
  document.getElementById("logout-role").hidden = ui.role === "publico";
}

function showLogin() {
  document.getElementById("login-modal").hidden = false;
  document.getElementById("login-user").value = "";
  document.getElementById("login-password").value = "";
  setTimeout(() => document.getElementById("login-user").focus(), 0);
}

function hideLogin() {
  document.getElementById("login-modal").hidden = true;
}

async function submitLogin() {
  const username = document.getElementById("login-user").value.trim().toLowerCase();
  const password = document.getElementById("login-password").value;
  const user = users[username];
  const hash = await sha256(password);
  if (!user || hash !== user.passwordHash) {
    toast("Usuario ou senha invalido.");
    return;
  }
  setRole(user.role);
  toast(`Acesso liberado: ${user.name}.`);
}

async function sha256(value) {
  if (!crypto.subtle) return "";
  const bytes = new TextEncoder().encode(value);
  const hashBuffer = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(hashBuffer)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function filteredItems(searchId, categoryId) {
  const query = (document.getElementById(searchId)?.value || "").trim().toLowerCase();
  const category = document.getElementById(categoryId)?.value || "all";
  return menuItems.filter((item) => {
    const matchesText = `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(query);
    const matchesCategory = category === "all" || item.category === category;
    return matchesText && matchesCategory;
  });
}

function renderPublicMenu() {
  const tableFromUrl = Number(new URLSearchParams(location.search).get("mesa"));
  document.getElementById("public-table-number").textContent = tableFromUrl || "--";
  const query = (document.getElementById("public-menu-search").value || "").trim().toLowerCase();
  const items = menuItems.filter((item) => `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(query));
  document.getElementById("public-menu").innerHTML = categories.map((category) => {
    const categoryItems = items.filter((item) => item.category === category);
    if (!categoryItems.length) return "";
    return `
      <section class="menu-category">
        <div class="menu-category-head">
          <h3>${category}</h3>
          <span>${categoryItems.length} itens</span>
        </div>
        <div class="menu-grid">${categoryItems.map(menuCard).join("")}</div>
      </section>
    `;
  }).join("");
}

function menuCard(item) {
  return `
    <article class="menu-card">
      <div class="item-art" aria-hidden="true">${item.icon}</div>
      <div>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="price-row">
          <span class="price">${money.format(item.price)}</span>
          <span class="tag">${item.category}</span>
        </div>
      </div>
    </article>
  `;
}

function renderTables() {
  const grid = document.getElementById("table-grid");
  grid.innerHTML = Array.from({ length: tableCount }, (_, index) => {
    const table = index + 1;
    const subtotal = tableSubtotal(table);
    const session = activeSession(table);
    const label = session ? `${money.format(finalTotal(subtotal))}` : "Livre";
    return `
      <button class="table-button ${table === ui.table ? "active" : ""}" data-table="${table}" type="button">
        Mesa ${table}
        <span>${label}</span>
      </button>
    `;
  }).join("");
}

function renderWaiter() {
  const session = activeSession();
  const subtotal = tableSubtotal();
  document.getElementById("active-table-label").textContent = `Mesa ${ui.table}`;
  document.getElementById("active-table-subtotal").textContent = money.format(subtotal);
  document.getElementById("active-table-service").textContent = money.format(serviceFee(subtotal));
  document.getElementById("active-table-total").textContent = money.format(finalTotal(subtotal));
  document.getElementById("active-session-meta").textContent = session
    ? `Mesa aberta em ${formatDateTime(session.openedAt)}. Fechamento ainda em aberto.`
    : "Mesa livre. O horario de abertura sera criado no primeiro pedido.";
  document.getElementById("waiter-menu").innerHTML = filteredItems("waiter-search", "waiter-category").map((item) => `
    <article class="quick-item">
      <div>
        <strong>${item.icon} ${item.name}</strong>
        <span>${money.format(item.price)} - ${item.station === "bar" ? "Bar" : "Cozinha"}</span>
      </div>
      <button class="add-button" data-add="${item.id}" type="button" aria-label="Adicionar ${item.name}">+</button>
    </article>
  `).join("");
  renderCart();
  renderCurrentSessionHistory();
}

function renderCart() {
  const cart = document.getElementById("cart-items");
  if (!ui.cart.length) {
    cart.className = "cart-items empty-state";
    cart.textContent = "Nenhum item no pedido atual.";
  } else {
    cart.className = "cart-items";
    cart.innerHTML = ui.cart.map((item) => `
      <article class="cart-line">
        <div>
          <strong>${item.name}</strong>
          <span>${money.format(item.price)} cada - ${item.station === "bar" ? "Bar" : "Cozinha"}</span>
        </div>
        <div class="qty-row">
          <button class="qty-button" data-dec="${item.id}" type="button">-</button>
          <strong>${item.qty}</strong>
          <button class="qty-button" data-inc="${item.id}" type="button">+</button>
        </div>
      </article>
    `).join("");
  }
  document.getElementById("cart-total").textContent = money.format(cartTotal());
  document.getElementById("send-order").disabled = !ui.cart.length;
}

function renderCurrentSessionHistory() {
  const session = activeSession();
  const history = document.getElementById("table-history");
  if (!session || !session.orders.length) {
    history.className = "history-list empty-state";
    history.textContent = "Esta mesa ainda nao tem pedidos abertos.";
    return;
  }
  history.className = "history-list";
  history.innerHTML = session.orders.slice().reverse().map((order) => orderCard(order, false, session)).join("");
}

function renderKitchen() {
  document.querySelectorAll(".segment").forEach((button) => button.classList.toggle("active", button.dataset.station === ui.station));
  const orders = allSessions()
    .filter((session) => !session.closedAt)
    .flatMap((session) => session.orders.map((order) => ({ ...order, table: session.table, sessionOpenedAt: session.openedAt })))
    .filter((order) => order.status !== "entregue")
    .filter((order) => ui.station === "all" || order.items.some((item) => item.station === ui.station))
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  const board = document.getElementById("kitchen-board");
  if (!orders.length) {
    board.className = "kitchen-board empty-state";
    board.textContent = "Nenhum pedido pendente no momento.";
    return;
  }
  board.className = "kitchen-board";
  board.innerHTML = orders.map((order) => orderCard(order, true)).join("");
}

function orderCard(order, kitchenMode, session = null) {
  const items = kitchenMode && ui.station !== "all" ? order.items.filter((item) => item.station === ui.station) : order.items;
  const actions = kitchenMode ? `
    <div class="status-actions">
      <button class="status-button ${order.status === "novo" ? "next" : ""}" data-status="${order.id}:preparando" type="button">Preparando</button>
      <button class="status-button ${order.status === "preparando" ? "next" : ""}" data-status="${order.id}:pronto" type="button">Pronto</button>
      <button class="status-button ${order.status === "pronto" ? "next" : ""}" data-status="${order.id}:entregue" type="button">Entregue</button>
    </div>
  ` : "";
  const opened = session?.openedAt || order.sessionOpenedAt;
  return `
    <article class="${kitchenMode ? "order-card" : "history-card"}">
      <header>
        <div>
          <h3>Pedido #${order.number} - Mesa ${order.table || ui.table}</h3>
          <p>Pedido recebido em ${formatDateTime(order.createdAt)}${opened ? ` - Mesa aberta em ${formatDateTime(opened)}` : ""}${order.note ? ` - ${escapeHtml(order.note)}` : ""}</p>
        </div>
        <span class="status ${order.status}">${statusLabel(order.status)}</span>
      </header>
      <ul class="item-list">
        ${items.map((item) => `
          <li>
            <span>${item.qty}x ${item.name}</span>
            <strong>${money.format(item.price * item.qty)}</strong>
          </li>
        `).join("")}
      </ul>
      ${actions}
    </article>
  `;
}

function renderSessionHistory() {
  const sessions = allSessions()
    .filter((session) => !ui.sessionDate || inputDateValue(session.openedAt) === ui.sessionDate || (session.closedAt && inputDateValue(session.closedAt) === ui.sessionDate))
    .sort((a, b) => new Date(b.openedAt) - new Date(a.openedAt));
  const summary = sessions.reduce((acc, session) => {
    const subtotal = sessionSubtotal(session);
    acc.sessions += 1;
    acc.subtotal += subtotal;
    acc.service += serviceFee(subtotal);
    acc.total += finalTotal(subtotal);
    return acc;
  }, { sessions: 0, subtotal: 0, service: 0, total: 0 });

  document.getElementById("session-summary").innerHTML = `
    <article class="summary-card"><span>Ocupacoes</span><strong>${summary.sessions}</strong></article>
    <article class="summary-card"><span>Subtotal</span><strong>${money.format(summary.subtotal)}</strong></article>
    <article class="summary-card"><span>10% garcom</span><strong>${money.format(summary.service)}</strong></article>
    <article class="summary-card"><span>Total final</span><strong>${money.format(summary.total)}</strong></article>
  `;

  const root = document.getElementById("session-history");
  if (!sessions.length) {
    root.className = "session-history empty-state";
    root.textContent = "Nenhuma mesa encontrada para este filtro.";
    return;
  }
  root.className = "session-history";
  root.innerHTML = sessions.map(sessionCard).join("");
}

function sessionCard(session) {
  const subtotal = sessionSubtotal(session);
  return `
    <article class="session-card">
      <header>
        <div>
          <h3>Mesa ${session.table}</h3>
          <p>Aberta em ${formatDateTime(session.openedAt)} - Fechada em ${formatDateTime(session.closedAt)}</p>
        </div>
        <span class="status ${session.closedAt ? "entregue" : "novo"}">${session.closedAt ? "Fechada" : "Aberta"}</span>
      </header>
      <div class="session-totals">
        <span>Subtotal <b>${money.format(subtotal)}</b></span>
        <span>10% garcom <b>${money.format(serviceFee(subtotal))}</b></span>
        <span>Total final <b>${money.format(finalTotal(subtotal))}</b></span>
      </div>
      <ul class="item-list">
        ${session.orders.map((order) => `
          <li>
            <span>#${order.number} - ${formatDateTime(order.createdAt)} - ${order.items.map((item) => `${item.qty}x ${item.name}`).join(", ")}</span>
            <strong>${money.format(orderTotal(order))}</strong>
          </li>
        `).join("")}
      </ul>
    </article>
  `;
}

function allSessions() {
  return Object.values(state.tables || {}).flatMap((table) => table.sessions || []);
}

function statusLabel(status) {
  return { novo: "Novo", preparando: "Preparando", pronto: "Pronto", entregue: "Entregue" }[status] || status;
}

function addToCart(id) {
  const item = menuItems.find((entry) => entry.id === id);
  const current = ui.cart.find((entry) => entry.id === id);
  if (current) current.qty += 1;
  else ui.cart.push({ ...item, qty: 1 });
  renderWaiter();
}

function changeQty(id, amount) {
  const item = ui.cart.find((entry) => entry.id === id);
  if (!item) return;
  item.qty += amount;
  ui.cart = ui.cart.filter((entry) => entry.qty > 0);
  renderWaiter();
}

function sendOrder() {
  if (!ui.cart.length) return;
  const createdAt = new Date().toISOString();
  const session = getOrOpenSession(ui.table, createdAt);
  const order = {
    id: randomId(),
    number: ++state.lastOrderNumber,
    createdAt,
    status: "novo",
    note: document.getElementById("order-note").value.trim(),
    items: ui.cart.map((item) => ({ ...item }))
  };
  session.orders.push(order);
  ui.cart = [];
  document.getElementById("order-note").value = "";
  saveState();
  toast(`Pedido #${order.number} enviado para mesa ${ui.table}.`);
  render();
}

function updateOrderStatus(orderId, status) {
  for (const session of allSessions()) {
    const order = session.orders.find((entry) => entry.id === orderId);
    if (order) {
      order.status = status;
      saveState();
      toast(`Pedido #${order.number}: ${statusLabel(status)}.`);
      render();
      return;
    }
  }
}

function closeTable() {
  const session = activeSession();
  if (!session || !session.orders.length) {
    toast("Esta mesa ainda nao tem consumo para fechar.");
    return;
  }
  const subtotal = sessionSubtotal(session);
  const confirmed = confirm(`Fechar mesa ${ui.table} no total final de ${money.format(finalTotal(subtotal))}? Inclui 10% do garcom (${money.format(serviceFee(subtotal))}).`);
  if (!confirmed) return;
  session.closedAt = new Date().toISOString();
  tableState().activeSessionId = null;
  saveState();
  toast(`Mesa ${ui.table} fechada em ${money.format(finalTotal(subtotal))}.`);
  render();
}

function renderQrCards() {
  const origin = location.protocol === "file:" || location.origin === "null"
    ? "https://yg-systems.local/bar"
    : `${location.origin}${location.pathname}`;
  document.getElementById("qr-grid").innerHTML = Array.from({ length: tableCount }, (_, index) => {
    const table = index + 1;
    const url = `${origin}?mesa=${table}#cardapio`;
    return `
      <article class="qr-card">
        ${qrMarkup(url)}
        <h3>Mesa ${table}</h3>
        <p>${url}</p>
      </article>
    `;
  }).join("");
}

function qrMarkup(text) {
  const modules = makeQr(text);
  return `<div class="qr" aria-label="QR Code">${modules.flat().map((on) => `<i class="${on ? "on" : ""}"></i>`).join("")}</div>`;
}

function makeQr(text) {
  const version = 3;
  const size = 29;
  const dataCodewords = 55;
  const eccCodewords = 15;
  const bytes = new TextEncoder().encode(text);
  if (bytes.length > 53) return makeQr(`https://yg-systems.local/bar?mesa=${new URL(text, "https://x.local").searchParams.get("mesa") || "1"}`);

  const bits = [0, 1, 0, 0, ...toBits(bytes.length, 8)];
  bytes.forEach((byte) => bits.push(...toBits(byte, 8)));
  bits.push(...Array(Math.min(4, dataCodewords * 8 - bits.length)).fill(0));
  while (bits.length % 8) bits.push(0);
  const data = [];
  for (let index = 0; index < bits.length; index += 8) data.push(parseInt(bits.slice(index, index + 8).join(""), 2));
  for (let pad = 0; data.length < dataCodewords; pad += 1) data.push(pad % 2 ? 0x11 : 0xec);
  const codewords = [...data, ...reedSolomon(data, eccCodewords)];

  const base = Array.from({ length: size }, () => Array(size).fill(false));
  const reserved = Array.from({ length: size }, () => Array(size).fill(false));
  const set = (r, c, value = true, reserve = true) => {
    if (r < 0 || c < 0 || r >= size || c >= size) return;
    base[r][c] = value;
    if (reserve) reserved[r][c] = true;
  };
  const finder = (r, c) => {
    for (let y = -1; y <= 7; y += 1) for (let x = -1; x <= 7; x += 1) {
      const row = r + y;
      const col = c + x;
      const inSquare = x >= 0 && x <= 6 && y >= 0 && y <= 6;
      const dark = inSquare && (x === 0 || x === 6 || y === 0 || y === 6 || (x >= 2 && x <= 4 && y >= 2 && y <= 4));
      set(row, col, dark);
    }
  };
  finder(0, 0);
  finder(0, size - 7);
  finder(size - 7, 0);
  for (let i = 8; i < size - 8; i += 1) {
    set(6, i, i % 2 === 0);
    set(i, 6, i % 2 === 0);
  }
  for (let y = -2; y <= 2; y += 1) for (let x = -2; x <= 2; x += 1) {
    set(22 + y, 22 + x, Math.max(Math.abs(x), Math.abs(y)) !== 1);
  }
  set(4 * version + 9, 8, true);
  reserveFormat(reserved);
  const dataBits = codewords.flatMap((byte) => toBits(byte, 8));
  let bitIndex = 0;
  let upward = true;
  for (let col = size - 1; col > 0; col -= 2) {
    if (col === 6) col -= 1;
    for (let offset = 0; offset < size; offset += 1) {
      const row = upward ? size - 1 - offset : offset;
      for (let lane = 0; lane < 2; lane += 1) {
        const c = col - lane;
        if (reserved[row][c]) continue;
        base[row][c] = dataBits[bitIndex++] === 1;
      }
    }
    upward = !upward;
  }

  let best = null;
  for (let mask = 0; mask < 8; mask += 1) {
    const candidate = base.map((row) => [...row]);
    for (let r = 0; r < size; r += 1) for (let c = 0; c < size; c += 1) {
      if (!reserved[r][c] && maskApplies(mask, r, c)) candidate[r][c] = !candidate[r][c];
    }
    writeFormat(candidate, formatBits(1, mask));
    const score = penalty(candidate);
    if (!best || score < best.score) best = { score, candidate };
  }
  return best.candidate;
}

function toBits(value, length) {
  return Array.from({ length }, (_, index) => (value >> (length - 1 - index)) & 1);
}

function reserveFormat(reserved) {
  const size = reserved.length;
  for (let i = 0; i < 9; i += 1) {
    if (i !== 6) {
      reserved[8][i] = true;
      reserved[i][8] = true;
    }
  }
  for (let i = 0; i < 8; i += 1) {
    reserved[8][size - 1 - i] = true;
    reserved[size - 1 - i][8] = true;
  }
}

function writeFormat(matrix, bits) {
  const size = matrix.length;
  const bit = (index) => ((bits >> index) & 1) === 1;
  for (let i = 0; i <= 5; i += 1) matrix[8][i] = bit(i);
  matrix[8][7] = bit(6);
  matrix[8][8] = bit(7);
  matrix[7][8] = bit(8);
  for (let i = 9; i < 15; i += 1) matrix[14 - i][8] = bit(i);
  for (let i = 0; i < 8; i += 1) matrix[size - 1 - i][8] = bit(i);
  for (let i = 8; i < 15; i += 1) matrix[8][size - 15 + i] = bit(i);
}

function formatBits(errorLevel, mask) {
  let data = (errorLevel << 3) | mask;
  let value = data << 10;
  for (let i = 14; i >= 10; i -= 1) {
    if ((value >> i) & 1) value ^= 0x537 << (i - 10);
  }
  return (((data << 10) | value) ^ 0x5412) & 0x7fff;
}

function maskApplies(mask, r, c) {
  return [
    (r + c) % 2 === 0,
    r % 2 === 0,
    c % 3 === 0,
    (r + c) % 3 === 0,
    (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
    ((r * c) % 2) + ((r * c) % 3) === 0,
    (((r * c) % 2) + ((r * c) % 3)) % 2 === 0,
    (((r + c) % 2) + ((r * c) % 3)) % 2 === 0
  ][mask];
}

function penalty(matrix) {
  const size = matrix.length;
  let score = 0;
  const linePenalty = (line) => {
    let runColor = line[0];
    let run = 1;
    let total = 0;
    for (let i = 1; i < line.length; i += 1) {
      if (line[i] === runColor) run += 1;
      else {
        if (run >= 5) total += 3 + run - 5;
        runColor = line[i];
        run = 1;
      }
    }
    if (run >= 5) total += 3 + run - 5;
    return total;
  };
  for (let r = 0; r < size; r += 1) score += linePenalty(matrix[r]);
  for (let c = 0; c < size; c += 1) score += linePenalty(matrix.map((row) => row[c]));
  for (let r = 0; r < size - 1; r += 1) for (let c = 0; c < size - 1; c += 1) {
    const color = matrix[r][c];
    if (matrix[r + 1][c] === color && matrix[r][c + 1] === color && matrix[r + 1][c + 1] === color) score += 3;
  }
  const finderLike = "10111010000";
  const finderLikeReverse = "00001011101";
  for (let r = 0; r < size; r += 1) {
    const row = matrix[r].map(Number).join("");
    score += (row.match(new RegExp(finderLike, "g")) || []).length * 40;
    score += (row.match(new RegExp(finderLikeReverse, "g")) || []).length * 40;
  }
  const dark = matrix.flat().filter(Boolean).length;
  score += Math.floor(Math.abs((dark * 100) / (size * size) - 50) / 5) * 10;
  return score;
}

function reedSolomon(data, count) {
  initGf();
  const generator = rsGenerator(count);
  const result = Array(count).fill(0);
  data.forEach((byte) => {
    const factor = byte ^ result[0];
    result.shift();
    result.push(0);
    for (let i = 0; i < count; i += 1) result[i] ^= gfMul(generator[i + 1], factor);
  });
  return result;
}

let gfExp;
let gfLog;

function initGf() {
  if (gfExp) return;
  gfExp = Array(512).fill(0);
  gfLog = Array(256).fill(0);
  let x = 1;
  for (let i = 0; i < 255; i += 1) {
    gfExp[i] = x;
    gfLog[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i += 1) gfExp[i] = gfExp[i - 255];
}

function gfMul(a, b) {
  if (!a || !b) return 0;
  return gfExp[gfLog[a] + gfLog[b]];
}

function rsGenerator(count) {
  let poly = [1];
  for (let i = 0; i < count; i += 1) {
    const next = Array(poly.length + 1).fill(0);
    poly.forEach((coefficient, index) => {
      next[index] ^= coefficient;
      next[index + 1] ^= gfMul(coefficient, gfExp[i]);
    });
    poly = next;
  }
  return poly;
}

function toast(message) {
  const root = document.getElementById("toast-root");
  const node = document.getElementById("toast-template").content.firstElementChild.cloneNode(true);
  node.textContent = message;
  root.appendChild(node);
  setTimeout(() => node.remove(), 2600);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

function hydrateControls() {
  const select = document.getElementById("waiter-category");
  select.innerHTML += categories.map((category) => `<option value="${category}">${category}</option>`).join("");
  const sessionFilter = document.getElementById("session-date-filter");
  sessionFilter.value = ui.sessionDate;

  document.querySelectorAll(".tab").forEach((button) => button.addEventListener("click", () => setView(button.dataset.view)));
  document.querySelectorAll(".segment").forEach((button) => button.addEventListener("click", () => {
    ui.station = button.dataset.station;
    renderKitchen();
  }));
  document.getElementById("open-login").addEventListener("click", showLogin);
  document.getElementById("logout-role").addEventListener("click", () => {
    sessionStorage.removeItem(roleKey);
    setRole("publico");
    toast("Voce saiu da area interna.");
  });
  document.getElementById("close-login").addEventListener("click", hideLogin);
  document.getElementById("login-public").addEventListener("click", () => setRole("publico"));
  document.getElementById("login-submit").addEventListener("click", submitLogin);
  ["login-user", "login-password"].forEach((id) => {
    document.getElementById(id).addEventListener("keydown", (event) => {
      if (event.key === "Enter") submitLogin();
      if (event.key === "Escape") hideLogin();
    });
  });
  document.getElementById("login-modal").addEventListener("click", (event) => {
    if (event.target.id === "login-modal") hideLogin();
  });
  document.getElementById("public-menu-search").addEventListener("input", renderPublicMenu);
  document.getElementById("waiter-search").addEventListener("input", renderWaiter);
  document.getElementById("waiter-category").addEventListener("change", renderWaiter);
  document.getElementById("send-order").addEventListener("click", sendOrder);
  document.getElementById("close-table").addEventListener("click", closeTable);
  document.getElementById("print-qr").addEventListener("click", () => window.print());
  sessionFilter.addEventListener("change", () => {
    ui.sessionDate = sessionFilter.value;
    renderSessionHistory();
  });
  document.getElementById("clear-session-filter").addEventListener("click", () => {
    ui.sessionDate = "";
    sessionFilter.value = "";
    renderSessionHistory();
  });

  document.body.addEventListener("click", (event) => {
    const tableButton = event.target.closest("[data-table]");
    const addButton = event.target.closest("[data-add]");
    const incButton = event.target.closest("[data-inc]");
    const decButton = event.target.closest("[data-dec]");
    const statusButton = event.target.closest("[data-status]");
    if (tableButton) {
      ui.table = Number(tableButton.dataset.table);
      ui.cart = [];
      render();
    }
    if (addButton) addToCart(addButton.dataset.add);
    if (incButton) changeQty(incButton.dataset.inc, 1);
    if (decButton) changeQty(decButton.dataset.dec, -1);
    if (statusButton) {
      const [id, status] = statusButton.dataset.status.split(":");
      updateOrderStatus(id, status);
    }
  });
}

function render() {
  if (!canView(ui.view)) {
    ui.view = defaultView();
  }
  document.querySelectorAll(".tab").forEach((button) => {
    const visible = canView(button.dataset.view);
    button.hidden = !visible;
    button.classList.toggle("active", visible && button.dataset.view === ui.view);
  });
  document.querySelectorAll(".view").forEach((section) => section.classList.toggle("active", section.id === `view-${ui.view}`));
  renderRoleControls();
  renderPublicMenu();
  renderTables();
  renderWaiter();
  renderKitchen();
  renderSessionHistory();
  renderQrCards();
}

saveState();
hydrateControls();
setView(defaultView());
