const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const demoStoragePrefix = window.YG_DEMO_STORAGE_PREFIX || "yg-systems:demo-state:restaurante-preview";
const storeKey = `${demoStoragePrefix}:restaurante:state-v1`;

const products = [
  { id: "pizza-g", name: "Pizza Grande", category: "Pizza", description: "8 fatias, ate 2 sabores.", price: 49.9, maxFlavors: 2 },
  { id: "pizza-familia", name: "Pizza Familia", category: "Pizza", description: "12 fatias, ate 3 sabores.", price: 69.9, maxFlavors: 3 },
  { id: "combo", name: "Combo Familia", category: "Combo", description: "Pizza grande, refrigerante e sobremesa.", price: 79.9, maxFlavors: 2 },
  { id: "refri", name: "Refrigerante 2L", category: "Bebida", description: "Coca-Cola, Guarana ou Sprite.", price: 12, maxFlavors: 1 },
];

const flavors = [
  { id: "calabresa", name: "Calabresa", type: "Tradicional", description: "Calabresa, cebola e mussarela." },
  { id: "marguerita", name: "Marguerita", type: "Tradicional", description: "Tomate, manjericao e mussarela." },
  { id: "frango", name: "Frango com Catupiry", type: "Especial", description: "Frango desfiado, catupiry e milho." },
  { id: "quatro-queijos", name: "Quatro Queijos", type: "Especial", description: "Mussarela, parmesao, provolone e gorgonzola." },
  { id: "chocolate", name: "Chocolate", type: "Doce", description: "Chocolate cremoso e granulado." },
  { id: "romeu-julieta", name: "Romeu e Julieta", type: "Doce", description: "Goiabada cremosa e queijo." },
];

const defaultState = () => ({
  cart: [],
  orders: [
    {
      id: "YG120845",
      customerName: "Cliente Demo",
      phone: "71999990000",
      fulfillment: "Entrega",
      payment: "Pix",
      total: 61.9,
      status: "Em preparo",
      items: [{ productName: "Pizza Grande", flavors: ["Calabresa", "Marguerita"], price: 49.9 }],
      createdAt: new Date().toISOString(),
    },
  ],
  selectedProductId: "pizza-g",
  selectedFlavors: [],
  fulfillment: "Entrega",
  payment: "Pix",
  lastOrderId: "YG120845",
});

let state = loadState();

const els = {
  tabs: document.querySelectorAll("[data-view]"),
  views: document.querySelectorAll(".view"),
  productGrid: document.querySelector("#productGrid"),
  flavorGrid: document.querySelector("#flavorGrid"),
  productCount: document.querySelector("#productCount"),
  selectedProductLabel: document.querySelector("#selectedProductLabel"),
  notes: document.querySelector("#notes"),
  addToCart: document.querySelector("#addToCart"),
  heroTotal: document.querySelector("#heroTotal"),
  cartTotal: document.querySelector("#cartTotal"),
  cartList: document.querySelector("#cartList"),
  customerName: document.querySelector("#customerName"),
  customerPhone: document.querySelector("#customerPhone"),
  customerAddress: document.querySelector("#customerAddress"),
  addressField: document.querySelector("#addressField"),
  fulfillmentButtons: document.querySelectorAll("[data-fulfillment]"),
  paymentButtons: document.querySelectorAll("[data-payment]"),
  finishOrder: document.querySelector("#finishOrder"),
  statusList: document.querySelector("#statusList"),
  lastOrderLabel: document.querySelector("#lastOrderLabel"),
  ordersMetric: document.querySelector("#ordersMetric"),
  revenueMetric: document.querySelector("#revenueMetric"),
  ticketMetric: document.querySelector("#ticketMetric"),
  adminOrders: document.querySelector("#adminOrders"),
  resetDemo: document.querySelector("#resetDemo"),
  messageModal: document.querySelector("#messageModal"),
  messagePreview: document.querySelector("#messagePreview"),
  closeModal: document.querySelector("#closeModal"),
};

function loadState() {
  try {
    const raw = localStorage.getItem(storeKey);
    return raw ? { ...defaultState(), ...JSON.parse(raw) } : defaultState();
  } catch {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(storeKey, JSON.stringify(state));
}

function selectedProduct() {
  return products.find((product) => product.id === state.selectedProductId) || products[0];
}

function cartTotal() {
  return state.cart.reduce((total, item) => total + item.price, 0);
}

function makeOrderId() {
  return `YG${Date.now().toString().slice(-6)}`;
}

function renderProducts() {
  els.productCount.textContent = `${products.length} opcoes`;
  els.productGrid.innerHTML = products
    .map(
      (product) => `
        <button class="product-card ${product.id === state.selectedProductId ? "active" : ""}" type="button" data-product="${product.id}">
          <span>${product.category}</span>
          <strong>${product.name}</strong>
          <small>${product.description}</small>
          <b>${money.format(product.price)}</b>
        </button>`,
    )
    .join("");
}

function renderFlavors() {
  const product = selectedProduct();
  els.selectedProductLabel.textContent = `${product.name}: ate ${product.maxFlavors} sabor(es)`;
  els.flavorGrid.innerHTML = flavors
    .map(
      (flavor) => `
        <button class="flavor-card ${state.selectedFlavors.includes(flavor.name) ? "active" : ""}" type="button" data-flavor="${flavor.name}">
          <span>${flavor.type}</span>
          <strong>${flavor.name}</strong>
          <small>${flavor.description}</small>
        </button>`,
    )
    .join("");
  els.addToCart.textContent = `Adicionar ao carrinho - ${money.format(product.price)}`;
  els.addToCart.disabled = state.selectedFlavors.length === 0;
}

function renderCart() {
  const total = cartTotal();
  els.heroTotal.textContent = money.format(total);
  els.cartTotal.textContent = money.format(total);
  if (!state.cart.length) {
    els.cartList.innerHTML = `<p>O carrinho ainda esta vazio.</p>`;
    return;
  }
  els.cartList.innerHTML = state.cart
    .map(
      (item) => `
        <article class="cart-item">
          <button type="button" aria-label="Remover item" data-remove="${item.id}">x</button>
          <strong>${item.productName}</strong>
          <span>${item.flavors.join(" / ")}</span>
          ${item.notes ? `<small>${item.notes}</small>` : ""}
          <b>${money.format(item.price)}</b>
        </article>`,
    )
    .join("");
}

function renderChoices() {
  els.fulfillmentButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.fulfillment === state.fulfillment);
  });
  els.paymentButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.payment === state.payment);
  });
  els.addressField.hidden = state.fulfillment === "Retirada";
}

function orderFlow(order) {
  return order.fulfillment === "Retirada"
    ? ["Recebido", "Em preparo", "Pronto para retirada", "Finalizado"]
    : ["Recebido", "Em preparo", "Saiu para entrega", "Finalizado"];
}

function renderStatus() {
  els.lastOrderLabel.textContent = state.lastOrderId ? `Ultimo pedido: ${state.lastOrderId}` : "Nenhum pedido novo";
  els.statusList.innerHTML = state.orders
    .map((order) => {
      const flow = orderFlow(order);
      const activeIndex = Math.max(flow.indexOf(order.status), 1);
      return `
        <article class="status-card">
          <p class="eyebrow">${order.id}</p>
          <h3>${order.status}</h3>
          <p>${order.customerName} - ${money.format(order.total)}</p>
          <div class="status-flow">
            ${flow.map((step, index) => `<span class="${index <= activeIndex ? "done" : ""}">${step}</span>`).join("")}
          </div>
        </article>`;
    })
    .join("");
}

function renderAdmin() {
  const revenue = state.orders.reduce((total, order) => total + order.total, 0);
  els.ordersMetric.textContent = String(state.orders.length);
  els.revenueMetric.textContent = money.format(revenue);
  els.ticketMetric.textContent = money.format(state.orders.length ? revenue / state.orders.length : 0);
  els.adminOrders.innerHTML = state.orders
    .map(
      (order) => `
        <article class="admin-order">
          <strong>${order.id} - ${order.customerName}</strong>
          <p>${order.fulfillment} - ${order.payment} - ${money.format(order.total)}</p>
          <label class="field">
            Status
            <select data-status="${order.id}">
              ${orderFlow(order)
                .map((status) => `<option ${status === order.status ? "selected" : ""}>${status}</option>`)
                .join("")}
            </select>
          </label>
        </article>`,
    )
    .join("");
}

function renderAll() {
  renderProducts();
  renderFlavors();
  renderCart();
  renderChoices();
  renderStatus();
  renderAdmin();
  saveState();
}

function setView(view) {
  els.tabs.forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  els.views.forEach((panel) => panel.classList.toggle("active", panel.id === view));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showMessage(order) {
  const config = window.YG_DEMO_CONFIG || { businessName: "YG Restaurante" };
  els.messagePreview.textContent = `Ola, ${order.customerName}!\nRecebemos seu pedido ${order.id} na ${config.businessName}.\n\nTotal: ${money.format(order.total)}\nEntrega: ${order.fulfillment}\nPagamento: ${order.payment}\nStatus atual: ${order.status}\n\nModo demonstracao: nenhuma mensagem foi enviada.`;
  if (els.messageModal.showModal) {
    els.messageModal.showModal();
  } else {
    alert(els.messagePreview.textContent);
  }
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button");
  if (!target) return;

  if (target.dataset.view) {
    setView(target.dataset.view);
    return;
  }

  if (target.dataset.product) {
    state.selectedProductId = target.dataset.product;
    state.selectedFlavors = [];
    renderAll();
    return;
  }

  if (target.dataset.flavor) {
    const product = selectedProduct();
    const flavor = target.dataset.flavor;
    if (state.selectedFlavors.includes(flavor)) {
      state.selectedFlavors = state.selectedFlavors.filter((item) => item !== flavor);
    } else if (state.selectedFlavors.length < product.maxFlavors) {
      state.selectedFlavors = [...state.selectedFlavors, flavor];
    }
    renderAll();
    return;
  }

  if (target.dataset.remove) {
    state.cart = state.cart.filter((item) => item.id !== target.dataset.remove);
    renderAll();
    return;
  }

  if (target.dataset.fulfillment) {
    state.fulfillment = target.dataset.fulfillment;
    renderAll();
    return;
  }

  if (target.dataset.payment) {
    state.payment = target.dataset.payment;
    renderAll();
  }
});

els.addToCart.addEventListener("click", () => {
  const product = selectedProduct();
  if (!state.selectedFlavors.length) return;
  state.cart.push({
    id: crypto.randomUUID ? crypto.randomUUID() : `item-${Date.now()}`,
    productName: product.name,
    flavors: [...state.selectedFlavors],
    notes: els.notes.value.trim(),
    price: product.price,
  });
  state.selectedFlavors = [];
  els.notes.value = "";
  renderAll();
});

els.finishOrder.addEventListener("click", () => {
  if (!state.cart.length || !els.customerName.value.trim() || !els.customerPhone.value.trim()) return;
  if (state.fulfillment === "Entrega" && !els.customerAddress.value.trim()) return;
  const order = {
    id: makeOrderId(),
    customerName: els.customerName.value.trim(),
    phone: els.customerPhone.value.trim(),
    fulfillment: state.fulfillment,
    payment: state.payment,
    total: cartTotal(),
    status: "Recebido",
    items: [...state.cart],
    createdAt: new Date().toISOString(),
  };
  state.orders = [order, ...state.orders];
  state.cart = [];
  state.lastOrderId = order.id;
  renderAll();
  showMessage(order);
});

els.adminOrders.addEventListener("change", (event) => {
  if (!event.target.dataset.status) return;
  const orderId = event.target.dataset.status;
  state.orders = state.orders.map((order) =>
    order.id === orderId ? { ...order, status: event.target.value } : order,
  );
  renderAll();
});

els.resetDemo.addEventListener("click", () => {
  state = defaultState();
  renderAll();
});

els.closeModal.addEventListener("click", () => els.messageModal.close());

renderAll();
