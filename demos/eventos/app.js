const SETTINGS = {
  price: "R$ 10,00",
  pixKey: "demo@ygsystems.com.br",
  maxPerScore: 7,
};

const scoreOptions = Array.from({ length: 6 }, (_, home) =>
  Array.from({ length: 6 }, (_, away) => `${home}x${away}`),
).flat();

const state = {
  selectedScore: "0x0",
  publicBets: [],
  adminBets: [],
  scoreCounts: {},
  isAdmin: false,
  adminCode: sessionStorage.getItem("bolao-admin-code") || "",
};

const els = {
  priceTop: document.querySelector("#priceTop"),
  pricePix: document.querySelector("#pricePix"),
  pixKey: document.querySelector("#pixKey"),
  copyPix: document.querySelector("#copyPix"),
  loadState: document.querySelector("#loadState"),
  score: document.querySelector("#score"),
  scoreWarning: document.querySelector("#scoreWarning"),
  name: document.querySelector("#name"),
  contact: document.querySelector("#contact"),
  pixName: document.querySelector("#pixName"),
  reserveBtn: document.querySelector("#reserveBtn"),
  betForm: document.querySelector("#betForm"),
  selectedTitle: document.querySelector("#selectedTitle"),
  scoreCount: document.querySelector("#scoreCount"),
  slots: document.querySelector("#slots"),
  confirmedList: document.querySelector("#confirmedList"),
  refreshBtn: document.querySelector("#refreshBtn"),
  adminLogin: document.querySelector("#adminLogin"),
  adminCode: document.querySelector("#adminCode"),
  pendingCount: document.querySelector("#pendingCount"),
  pendingList: document.querySelector("#pendingList"),
  notice: document.querySelector("#notice"),
};

function activeBets() {
  return state.isAdmin ? state.adminBets : state.publicBets;
}

function confirmedBets() {
  return activeBets()
    .filter((bet) => bet.status === "confirmed")
    .sort((a, b) => (a.official_order || 0) - (b.official_order || 0));
}

function confirmedForScore(score) {
  return confirmedBets().filter((bet) => bet.score === score);
}

function pendingForScore(score) {
  if (!state.isAdmin) return [];

  return activeBets()
    .filter((bet) => bet.score === score && bet.status === "pending")
    .sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));
}

function occupiedCountForScore(score) {
  if (state.isAdmin) {
    return activeBets().filter(
      (bet) =>
        bet.score === score &&
        (bet.status === "pending" || bet.status === "confirmed"),
    ).length;
  }

  return state.scoreCounts[score] || confirmedForScore(score).length;
}

function pendingBets() {
  return state.adminBets
    .filter((bet) => bet.status === "pending")
    .sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));
}

function formatTime(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function showNotice(message) {
  els.notice.textContent = message;
  els.notice.classList.remove("hidden");
  clearTimeout(showNotice.timer);
  showNotice.timer = setTimeout(() => {
    els.notice.classList.add("hidden");
  }, 3600);
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      "content-type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Erro de comunicacao.");
  }

  return data;
}

async function loadPublic() {
  els.loadState.textContent = "Atualizando";
  const data = await api("/api/bets");
  state.publicBets = data.bets || [];
  state.scoreCounts = data.scoreCounts || {};
  els.loadState.textContent = "Online";
  render();
}

async function loadAdmin() {
  const data = await api("/api/admin", {
    method: "POST",
    body: JSON.stringify({
      adminCode: state.adminCode,
      action: "list",
    }),
  });

  state.adminBets = data.bets || [];
  state.isAdmin = true;
  sessionStorage.setItem("bolao-admin-code", state.adminCode);
  els.adminLogin.classList.add("hidden");
  els.pendingList.classList.remove("hidden");
  render();
}

function renderScoreOptions() {
  els.score.innerHTML = scoreOptions
    .map((score) => {
      const count = confirmedForScore(score).length;
      const occupied = occupiedCountForScore(score);
      const suffix =
        occupied >= SETTINGS.maxPerScore
          ? " - limite esgotado"
          : ` - ${occupied}/${SETTINGS.maxPerScore}`;
      return `<option value="${score}">${score}${suffix}</option>`;
    })
    .join("");

  els.score.value = state.selectedScore;
}

function renderSlots() {
  const confirmed = confirmedForScore(state.selectedScore);
  const pending = pendingForScore(state.selectedScore);
  const occupied = occupiedCountForScore(state.selectedScore);
  const publicPendingCount = Math.max(0, occupied - confirmed.length);
  const isFull = occupied >= SETTINGS.maxPerScore;

  els.selectedTitle.textContent = state.selectedScore;
  els.scoreCount.textContent = `${occupied}/${SETTINGS.maxPerScore} ocupados`;
  els.reserveBtn.disabled = isFull;
  els.reserveBtn.textContent = isFull
    ? `Escolha outro placar`
    : "Reservar palpite pendente";
  els.scoreWarning.classList.toggle("hidden", !isFull);
  els.scoreWarning.textContent = isFull
    ? `Esse placar ja tem ${SETTINGS.maxPerScore} apostas entre pendentes e confirmadas. Provavelmente sua aposta nao sera efetuada nesse placar; escolha outro.`
    : "";

  els.slots.innerHTML = Array.from({ length: SETTINGS.maxPerScore }, (_, index) => {
    const bet = confirmed[index];
    const pendingBet = state.isAdmin
      ? pending[index - confirmed.length]
      : index < confirmed.length + publicPendingCount;

    if (!bet) {
      if (pendingBet) {
        const pendingName =
          typeof pendingBet === "object" ? pendingBet.name : "Aposta reservada";

        return `
          <div class="slot pending">
            <span class="num">${index + 1}</span>
            <div>
              <p class="name">${pendingName}</p>
              <p class="small">Pendente: aguardando Pix e confirmacao</p>
            </div>
            <span></span>
          </div>`;
      }

      return `
        <div class="slot">
          <span class="num">${index + 1}</span>
          <div>
            <p class="name">Livre</p>
            <p class="small">Aguardando Pix confirmado</p>
          </div>
          <span></span>
        </div>`;
    }

    return `
      <div class="slot filled">
        <span class="num">${index + 1}</span>
        <div>
          <p class="name">${bet.name}</p>
          <p class="small">Confirmado em ${formatTime(bet.confirmed_at)}</p>
        </div>
        <strong>#${bet.official_order}</strong>
      </div>`;
  }).join("");
}

function renderConfirmedList() {
  const confirmed = confirmedBets();

  els.confirmedList.innerHTML = confirmed.length
    ? confirmed
        .map(
          (bet) => `
            <div class="row">
              <strong>#${bet.official_order}</strong>
              <div>
                <p class="name">${bet.name}</p>
                <p class="small">${formatTime(bet.confirmed_at)}</p>
              </div>
              <span class="score-tag">${bet.score}</span>
            </div>`,
        )
        .join("")
    : `<p class="small" style="padding: 16px">Nenhuma aposta confirmada ainda.</p>`;
}

function renderPendingList() {
  const pending = pendingBets();
  els.pendingCount.textContent = `${pending.length} pendentes`;

  if (!state.isAdmin) return;

  els.pendingList.innerHTML = pending.length
    ? pending
        .map(
          (bet) => `
            <div class="pending-card">
              <div>
                <p class="name">${bet.name} - ${bet.score}</p>
                <p class="small">WhatsApp: ${bet.contact || "nao informado"}</p>
                <p class="small">Chave Pix: ${bet.pix_name || "nao informada"} | Reservado em ${formatTime(bet.created_at)}</p>
              </div>
              <div class="pending-actions">
                <button class="btn" data-confirm="${bet.id}" type="button">Confirmar</button>
                <button class="btn btn-outline" data-cancel="${bet.id}" type="button">Cancelar</button>
              </div>
            </div>`,
        )
        .join("")
    : `<p class="small" style="padding: 16px; background: var(--paper)">Nenhuma aposta pendente agora.</p>`;
}

function render() {
  renderScoreOptions();
  renderSlots();
  renderConfirmedList();
  renderPendingList();
}

async function createBet(event) {
  event.preventDefault();

  const name = els.name.value.trim();
  const contact = els.contact.value.trim();
  const pixName = els.pixName.value.trim();
  const isFull = occupiedCountForScore(state.selectedScore) >= SETTINGS.maxPerScore;

  if (name.length < 2) {
    showNotice("Informe o nome igual aparece no Pix.");
    return;
  }

  if (contact.length < 8) {
    showNotice("Informe o WhatsApp para identificarmos sua aposta.");
    return;
  }

  if (pixName.length < 3) {
    showNotice("Informe sua chave Pix.");
    return;
  }

  if (isFull) {
    showNotice("Esse placar ja chegou ao limite. Escolha outro placar para apostar.");
    return;
  }

  try {
    els.reserveBtn.disabled = true;
    await api("/api/bets", {
      method: "POST",
      body: JSON.stringify({
        name,
        contact,
        pixName,
        score: state.selectedScore,
      }),
    });

    els.name.value = "";
    els.contact.value = "";
    els.pixName.value = "";
    showNotice("Palpite reservado. Agora faca o Pix e aguarde a confirmacao.");

    if (state.isAdmin) {
      await loadAdmin();
    } else {
      await loadPublic();
    }
  } catch (error) {
    showNotice(error.message);
  } finally {
    els.reserveBtn.disabled = false;
    render();
  }
}

async function adminAction(action, betId) {
  try {
    const data = await api("/api/admin", {
      method: "POST",
      body: JSON.stringify({
        adminCode: state.adminCode,
        action,
        betId,
      }),
    });

    if (data.bet?.score) {
      state.selectedScore = data.bet.score;
    }

    showNotice(action === "confirm" ? "Pagamento confirmado." : "Aposta cancelada.");
    await loadAdmin();
  } catch (error) {
    showNotice(error.message);
  }
}

els.priceTop.textContent = SETTINGS.price;
els.pricePix.textContent = SETTINGS.price;
els.pixKey.textContent = SETTINGS.pixKey;
els.adminCode.value = state.adminCode;

els.copyPix.addEventListener("click", async () => {
  await navigator.clipboard.writeText(SETTINGS.pixKey);
  showNotice("Chave Pix copiada.");
});

els.score.addEventListener("change", (event) => {
  state.selectedScore = event.target.value;
  render();
});

els.betForm.addEventListener("submit", createBet);

els.refreshBtn.addEventListener("click", async () => {
  try {
    if (state.isAdmin) {
      await loadAdmin();
    } else {
      await loadPublic();
    }
    showNotice("Lista atualizada.");
  } catch (error) {
    showNotice(error.message);
  }
});

els.adminLogin.addEventListener("submit", async (event) => {
  event.preventDefault();
  state.adminCode = els.adminCode.value;

  try {
    await loadAdmin();
    showNotice("Painel admin liberado.");
  } catch (error) {
    showNotice(error.message);
  }
});

els.pendingList.addEventListener("click", async (event) => {
  const confirmId = event.target.dataset.confirm;
  const cancelId = event.target.dataset.cancel;

  if (confirmId) {
    await adminAction("confirm", confirmId);
  }

  if (cancelId) {
    await adminAction("cancel", cancelId);
  }
});

render();
loadPublic().catch((error) => {
  els.loadState.textContent = "Offline";
  showNotice(error.message);
});
