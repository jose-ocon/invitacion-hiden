// 1. BASE DE DATOS DE LOS 16 EQUIPOS (Cargala manualmente acá)
const EQUIPOS = {
    "EQ-01": { nombre: "TEAM HIDEEN", acceso: "Competidor", codigoDisplay: "CS-01" },
    "EQ-02": { nombre: "TEAM ENZITOTAPS", acceso: "Competidor", codigoDisplay: "CS-02" },
    "EQ-03": { nombre: "TEAM 0800 MANCHAS", acceso: "Competidor", codigoDisplay: "CS-03" },
    "EQ-04": { nombre: "TEAM LIAK23", acceso: "Competidor", codigoDisplay: "CS-04" },
    "EQ-05": { nombre: "TEAM NIETPETE", acceso: "Competidor", codigoDisplay: "CS-05" },
    "EQ-06": { nombre: "TEAM DILAN LA RIOJA", acceso: "Competidor", codigoDisplay: "CS-06" },
    "EQ-07": { nombre: "EQUIPO 07", acceso: "Competidor", codigoDisplay: "CS-07" },
    "EQ-08": { nombre: "EQUIPO 08", acceso: "Competidor", codigoDisplay: "CS-08" },
    "EQ-09": { nombre: "EQUIPO 09", acceso: "Competidor", codigoDisplay: "CS-09" },
    "EQ-10": { nombre: "EQUIPO 10", acceso: "Competidor", codigoDisplay: "CS-10" },
    "EQ-11": { nombre: "EQUIPO 11", acceso: "Competidor", codigoDisplay: "CS-11" },
    "EQ-12": { nombre: "EQUIPO 12", acceso: "Competidor", codigoDisplay: "CS-12" },
    "EQ-13": { nombre: "EQUIPO 13", acceso: "Competidor", codigoDisplay: "CS-13" },
    "EQ-14": { nombre: "EQUIPO 14", acceso: "Competidor", codigoDisplay: "CS-14" },
    "EQ-15": { nombre: "EQUIPO 15", acceso: "Competidor", codigoDisplay: "CS-15" },
    "EQ-16": { nombre: "EQUIPO 16", acceso: "Competidor", codigoDisplay: "CS-16" }
};

const defaults = {
    name: "INVITACIÓN",
    subtitle: "Fuiste invitado para formar parte de este equipo", // Mensaje fijo de la imagen
    team: "Por definir",
    seat: "Competidor",
    code: "CS-00",
    message: "El acceso de tu escuadra es único y privado.",
    discordUrl: "https://discord.gg/jN5rCJRE",
    eventDate: "2026-04-28T17:00:00-03:00",
    eventDateLabel: "28 ABR 2026",
    eventTimeLabel: "17:00 ARG",
    eventModeLabel: "5v5",
    countdownNote: "Prepará el server y revisá tu loadout."
};

const params = new URLSearchParams(window.location.search);
const codeParam = params.get("code"); // Lee el ?code=EQ-XX de la URL

// Buscamos si el código ingresado existe en nuestra base de datos interna
const equipoEncontrado = EQUIPOS[codeParam];

const state = {
    // Si existe el código, precarga los datos correspondientes; si no, usa los defaults
    name: equipoEncontrado ? equipoEncontrado.nombre : defaults.name,
    subtitle: defaults.subtitle,
    team: equipoEncontrado ? equipoEncontrado.nombre : defaults.team,
    seat: equipoEncontrado ? equipoEncontrado.acceso : defaults.seat,
    code: equipoEncontrado ? equipoEncontrado.codigoDisplay : defaults.code,
    message: defaults.message,
    discordUrl: defaults.discordUrl,
    eventDate: defaults.eventDate,
    eventDateLabel: defaults.eventDateLabel,
    eventTimeLabel: defaults.eventTimeLabel,
    eventModeLabel: defaults.eventModeLabel,
    countdownNote: defaults.countdownNote
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

    // Genera el enlace de copia idéntico al formato corto de la URL de entrada
    const shareUrl = new URL(window.location.origin + window.location.pathname);
    if (codeParam) {
        shareUrl.searchParams.set("code", codeParam);
    }
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