// 1. BASE DE DATOS DE LOS 16 EQUIPOS (Carga acá las plataformas y canales de transmisión)
const EQUIPOS = {
    "EQ-01": { nombre: "TEAM ENZITOTAPS", acceso: "Competidor", codigoDisplay: "CS-01", plataforma: "twitch", canal: "ihideen" },
    "EQ-02": { nombre: "TEAM 0800 MANCHAS", acceso: "Competidor", codigoDisplay: "CS-02", plataforma: "twitch", canal: "ihideen" },
    "EQ-03": { nombre: "TEAM LIAK23", acceso: "Competidor", codigoDisplay: "CS-03", plataforma: "twitch", canal: "ihideen" },
    "EQ-04": { nombre: "TEAM NIETPETE", acceso: "Competidor", codigoDisplay: "CS-04", plataforma: "twitch", canal: "ihideen" },
    "EQ-05": { nombre: "TEAM DILAN LA RIOJA", acceso: "Competidor", codigoDisplay: "CS-05", plataforma: "twitch", canal: "ihideen" },
    "EQ-06": { nombre: "", acceso: "Competidor", codigoDisplay: "CS-06", plataforma: "twitch", canal: "ihideen" },
    "EQ-07": { nombre: "", acceso: "Competidor", codigoDisplay: "CS-07", plataforma: "twitch", canal: "ihideen" },
    "EQ-08": { nombre: "", acceso: "Competidor", codigoDisplay: "CS-08", plataforma: "twitch", canal: "ihideen" },
    "EQ-09": { nombre: "", acceso: "Competidor", codigoDisplay: "CS-09", plataforma: "twitch", canal: "ihideen" },
    "EQ-10": { nombre: "", acceso: "Competidor", codigoDisplay: "CS-10", plataforma: "twitch", canal: "ihideen" },
    "EQ-11": { nombre: "", acceso: "Competidor", codigoDisplay: "CS-11", plataforma: "twitch", canal: "ihideen" },
    "EQ-12": { nombre: "", acceso: "Competidor", codigoDisplay: "CS-12", plataforma: "twitch", canal: "ihideen" },
    "EQ-13": { nombre: "", acceso: "Competidor", codigoDisplay: "CS-13", plataforma: "twitch", canal: "ihideen" },
    "EQ-14": { nombre: "", acceso: "Competidor", codigoDisplay: "CS-14", plataforma: "twitch", canal: "ihideen" },
    "EQ-15": { nombre: "", acceso: "Competidor", codigoDisplay: "CS-15", plataforma: "twitch", canal: "ihideen" },
    "EQ-16": { nombre: "", acceso: "Competidor", codigoDisplay: "CS-16", plataforma: "twitch", canal: "ihideen" }
};

const defaults = {
    name: "INVITACIÓN",
    subtitle: "Fuiste invitado para formar parte de este equipo",
    team: "Por definir",
    seat: "Competidor",
    code: "CS-00",
    message: "Seguí las partidas en vivo por este canal.",
    discordUrl: "https://discord.gg/jN5rCJRE",
    
    defaultPlataforma: "twitch",
    defaultCanal: "gaules", 

    eventDate: "2026-07-04T17:00:00-03:00",
    eventDateLabel: "04 JUL 2026",
    eventTimeLabel: "17:00 ARG",
    eventModeLabel: "5v5",
    countdownNote: "Prepará el server y revisá tu loadout."
};

const params = new URLSearchParams(window.location.search);
const codeParam = params.get("code");
const equipoEncontrado = EQUIPOS[codeParam];

const state = {
    name: equipoEncontrado ? equipoEncontrado.nombre : defaults.name,
    subtitle: defaults.subtitle,
    team: equipoEncontrado ? equipoEncontrado.nombre : defaults.team,
    seat: equipoEncontrado ? equipoEncontrado.acceso : defaults.seat,
    code: equipoEncontrado ? equipoEncontrado.codigoDisplay : defaults.code,
    plataforma: equipoEncontrado ? equipoEncontrado.plataforma : defaults.defaultPlataforma,
    canal: equipoEncontrado ? equipoEncontrado.canal : defaults.defaultCanal,
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
    videoContainer: document.getElementById("videoContainer"),
    inviteMessage: document.getElementById("inviteMessage"),
    discordButton: document.getElementById("discordButton")
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

    let iframeHtml = "";
    const currentDomain = window.location.hostname;

    if (state.plataforma === "twitch") {
        iframeHtml = `<iframe src="https://player.twitch.tv/?channel=${state.canal}&parent=${currentDomain}&autoplay=false" allowfullscreen="true"></iframe>`;
    } else if (state.plataforma === "kick") {
        iframeHtml = `<iframe src="https://player.kick.com/${state.canal}" allowfullscreen="true"></iframe>`;
    }

    elements.videoContainer.innerHTML = iframeHtml;
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
}

applyContent();
bindEvents();
setupRevealAnimations();
updateCountdown();
window.setInterval(updateCountdown, 1000);