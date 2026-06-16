// 1. BASE DE DATOS DE LOS EQUIPOS (Agrega acá los nombres reales de los pibes)
const ROSTERS = {
    "EQ-01": "HIDEEN - ENZITOTAPS - CHOFI - RAMA - MANCHA",
    "EQ-02": "JUGADOR1 - JUGADOR2 - JUGADOR3 - JUGADOR4 - JUGADOR5",
    "EQ-03": "JUGADOR1 - JUGADOR2 - JUGADOR3 - JUGADOR4 - JUGADOR5",
    "EQ-04": "JUGADOR1 - JUGADOR2 - JUGADOR3 - JUGADOR4 - JUGADOR5",
    "EQ-05": "JUGADOR1 - JUGADOR2 - JUGADOR3 - JUGADOR4 - JUGADOR5",
    "EQ-06": "JUGADOR1 - JUGADOR2 - JUGADOR3 - JUGADOR4 - JUGADOR5",
    "EQ-07": "JUGADOR1 - JUGADOR2 - JUGADOR3 - JUGADOR4 - JUGADOR5",
    "EQ-08": "JUGADOR1 - JUGADOR2 - JUGADOR3 - JUGADOR4 - JUGADOR5",
    "EQ-09": "JUGADOR1 - JUGADOR2 - JUGADOR3 - JUGADOR4 - JUGADOR5",
    "EQ-10": "JUGADOR1 - JUGADOR2 - JUGADOR3 - JUGADOR4 - JUGADOR5",
    "EQ-11": "JUGADOR1 - JUGADOR2 - JUGADOR3 - JUGADOR4 - JUGADOR5",
    "EQ-12": "JUGADOR1 - JUGADOR2 - JUGADOR3 - JUGADOR4 - JUGADOR5",
    "EQ-13": "JUGADOR1 - JUGADOR2 - JUGADOR3 - JUGADOR4 - JUGADOR5",
    "EQ-14": "JUGADOR1 - JUGADOR2 - JUGADOR3 - JUGADOR4 - JUGADOR5",
    "EQ-15": "JUGADOR1 - JUGADOR2 - JUGADOR3 - JUGADOR4 - JUGADOR5",
    "EQ-16": "JUGADOR1 - JUGADOR2 - JUGADOR3 - JUGADOR4 - JUGADOR5"
};

const defaults = {
    name: "INVITACIÓN",
    subtitle: "Evento competitivo clasificado",
    team: "Por definir",
    seat: "Competidor",
    code: "CS-00",
    message: "El acceso de tu escuadra es único y privado.",
    discordUrl: "https://discord.gg/jN5rCJRE",
    eventDate: "2026-07-04T17:00:00-03:00",
    eventDateLabel: "4 JUL 2026",
    eventTimeLabel: "17:00 ARG",
    eventModeLabel: "5v5",
    countdownNote: "Preparate para el torneo. ¡Va a ser épico!"
};

const params = new URLSearchParams(window.location.search);

// Obtenemos el código primero para poder buscar el roster analizando la URL
const currentCode = params.get("code") || defaults.code;

// CONDICIONAL INTELIGENTE: Si el código existe en nuestra lista ROSTERS, usa esos nombres. 
// Si meten un código que no existe o no ponen nada, usa el parámetro 'subtitle' de la URL o el por defecto.
const determinedSubtitle = ROSTERS[currentCode] || params.get("subtitle") || defaults.subtitle;

const state = {
    name: params.get("name") || defaults.name,
    subtitle: determinedSubtitle,
    team: params.get("team") || defaults.team,
    seat: params.get("seat") || defaults.seat,
    code: currentCode,
    message: params.get("message") || defaults.message,
    discordUrl: params.get("discord") || defaults.discordUrl,
    eventDate: params.get("date") || defaults.eventDate,
    eventDateLabel: params.get("dateLabel") || defaults.eventDateLabel,
    eventTimeLabel: params.get("timeLabel") || defaults.eventTimeLabel,
    eventModeLabel: params.get("mode") || defaults.eventModeLabel,
    countdownNote: params.get("note") || defaults.countdownNote
};

const elements = {
    playerName: document.getElementById("playerName"),
    subtitle: document.getElementById("subtitle"),
    teamLabel: document.getElementById("teamLabel"),
    seatLabel: document.getElementById("seatLabel"),
    codeLabel: document.getElementById("codeLabel"),
    eventDateLabel: document.getElementById("eventDateLabel"),
    eventTimeLabel: document.getElementById("eventTimeLabel"),
    eventModeLabel: document.getElementById("eventModeLabel"),
    timer: document.getElementById("timer"),
    countdownNote: document.getElementById("countdownNote"),
    personalLink: document.getElementById("personalLink"),
    inviteMessage: document.getElementById("inviteMessage"),
    discordButton: document.getElementById("discordButton"),
    copyLinkButton: document.getElementById("copyLinkButton")
};

function applyContent() {
    elements.playerName.textContent = state.name;
    elements.subtitle.textContent = state.subtitle;
    elements.teamLabel.textContent = `Equipo: ${state.team}`;
    elements.seatLabel.textContent = `Acceso: ${state.seat}`;
    elements.codeLabel.textContent = `Código: ${state.code}`;
    elements.eventDateLabel.textContent = state.eventDateLabel;
    elements.eventTimeLabel.textContent = state.eventTimeLabel;
    elements.eventModeLabel.textContent = state.eventModeLabel;
    elements.countdownNote.textContent = state.countdownNote;
    elements.inviteMessage.textContent = state.message;

    // Mantiene el enlace limpio para compartir centrado en los parámetros claves del equipo
    const shareUrl = new URL(window.location.origin + window.location.pathname);
    shareUrl.searchParams.set("team", state.team);
    shareUrl.searchParams.set("code", state.code);
    shareUrl.searchParams.set("name", state.name);
    
    elements.personalLink.textContent = shareUrl.toString();
}

function updateCountdown() {
    const eventDate = new Date(state.eventDate);
    const diff = eventDate.getTime() - Date.now();

    if (Number.isNaN(eventDate.getTime())) {
        elements.timer.textContent = "FECHA INVÁLIDA";
        elements.countdownNote.textContent = "Revisá el parámetro date en la URL.";
        return;
    }

    if (diff <= 0) {
        elements.timer.textContent = "EN CURSO";
        elements.countdownNote.textContent = "El torneo ya empezó.";
        return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");

    elements.timer.textContent = `${hours}:${minutes}:${seconds}`;
}

async function copyInviteLink() {
    const text = elements.personalLink.textContent;

    try {
        await navigator.clipboard.writeText(text);
        elements.copyLinkButton.textContent = "LINK COPIADO";
        setTimeout(() => {
            elements.copyLinkButton.textContent = "COPIAR LINK";
        }, 2000);
    } catch {
        window.prompt("Copiá el link:", text);
    }
}

function openDiscord() {
    window.open(state.discordUrl, "_blank", "noopener,noreferrer");
}

function setupRevealAnimations() {
    const revealItems = document.querySelectorAll(".reveal");

    revealItems.forEach((item, index) => {
        window.setTimeout(() => {
            item.classList.add("is-visible");
        }, 150 + index * 140);
    });
}

function bindEvents() {
    elements.discordButton.addEventListener("click", openDiscord);
    elements.copyLinkButton.addEventListener("click", copyInviteLink);
}

applyContent();
bindEvents();
setupRevealAnimations();
updateCountdown();
window.setInterval(updateCountdown, 1000);