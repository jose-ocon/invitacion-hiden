const defaults = {
    name: "TEAM HIDEEN",
    subtitle: "HIDEEN - ENZITOTAPS - CHOFI - RAMA - MANCHAS",
    team: "Por definir",
    seat: "Competidor",
    code: "CS-00",
    message: "El acceso de tu escuadra es único y privado.",
    discordUrl: "https://discord.gg/jN5rCJRE",
    eventDate: "2026-07-04T17:00:00-03:00",
    eventDateLabel: "04 JUL 2026",
    eventTimeLabel: "17:00 ARG",
    eventModeLabel: "5v5",
};

const params = new URLSearchParams(window.location.search);

const state = {
    name: params.get("name") || defaults.name,
    subtitle: params.get("subtitle") || defaults.subtitle,
    team: params.get("team") || defaults.team,
    seat: params.get("seat") || defaults.seat,
    code: params.get("code") || defaults.code,
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

    // Genera el link limpio basado en la URL actual de la web (funciona en local y en producción)
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