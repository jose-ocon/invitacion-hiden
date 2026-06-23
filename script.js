// 1. BASE DE DATOS DE LOS 16 EQUIPOS
const EQUIPOS = {
    "EQ-01": { nombre: "TEAM ENZITOTAPS", acceso: "Competidor", codigoDisplay: "CS-01", plataforma: "twitch", canal: "ihideen" },
    "EQ-02": { nombre: "TEAM 0800 MANCHAS", acceso: "Competidor", codigoDisplay: "CS-02", plataforma: "twitch", canal: "ihideen" },
    "EQ-03": { nombre: "TEAM LIAK23", acceso: "Competidor", codigoDisplay: "CS-03", plataforma: "twitch", canal: "ihideen" },
    "EQ-04": { nombre: "TEAM NIETPETE", acceso: "Competidor", codigoDisplay: "CS-04", plataforma: "twitch", canal: "ihideen" },
    "EQ-05": { nombre: "TEAM DILAN LA RIOJA", acceso: "Competidor", codigoDisplay: "CS-05", plataforma: "twitch", canal: "ihideen" },
    "EQ-06": { nombre: "EQUIPO 06", acceso: "Competidor", codigoDisplay: "CS-06", plataforma: "twitch", canal: "ihideen" },
    "EQ-07": { nombre: "EQUIPO 07", acceso: "Competidor", codigoDisplay: "CS-07", plataforma: "twitch", canal: "ihideen" },
    "EQ-08": { nombre: "EQUIPO 08", acceso: "Competidor", codigoDisplay: "CS-08", plataforma: "twitch", canal: "ihideen" },
    "EQ-09": { nombre: "EQUIPO 09", acceso: "Competidor", codigoDisplay: "CS-09", plataforma: "twitch", canal: "ihideen" },
    "EQ-10": { nombre: "EQUIPO 10", acceso: "Competidor", codigoDisplay: "CS-10", plataforma: "twitch", canal: "ihideen" },
    "EQ-11": { nombre: "EQUIPO 11", acceso: "Competidor", codigoDisplay: "CS-11", plataforma: "twitch", canal: "ihideen" },
    "EQ-12": { nombre: "EQUIPO 12", acceso: "Competidor", codigoDisplay: "CS-12", plataforma: "twitch", canal: "ihideen" },
    "EQ-13": { nombre: "EQUIPO 13", acceso: "Competidor", codigoDisplay: "CS-13", plataforma: "twitch", canal: "ihideen" },
    "EQ-14": { nombre: "EQUIPO 14", acceso: "Competidor", codigoDisplay: "CS-14", plataforma: "twitch", canal: "ihideen" },
    "EQ-15": { nombre: "EQUIPO 15", acceso: "Competidor", codigoDisplay: "CS-15", plataforma: "twitch", canal: "ihideen" },
    "EQ-16": { nombre: "EQUIPO 16", acceso: "Competidor", codigoDisplay: "CS-16", plataforma: "twitch", canal: "ihideen" }
};

// 2. SISTEMA DE LLAVES MANUAL (Cambiá los nombres acá a medida que avancen)
const LLAVES = {
    // OCTAVOS DE FINAL
    octavos: {
        o1_t1: "TEAM HIDEEN",    o1_t2: "EQUIPO 08",
        o2_t1: "TEAM ENZITOTAPS", o2_t2: "EQUIPO 09",
        o3_t1: "TEAM RUSH B",     o3_t2: "EQUIPO 10",
        o4_t1: "ALFA STRIKE",    o4_t2: "EQUIPO 11",
        o5_t1: "CLUTCH GODS",    o5_t2: "EQUIPO 12",
        o6_t1: "EQUIPO 06",      o6_t2: "EQUIPO 13",
        o7_t1: "EQUIPO 07",      o7_t2: "EQUIPO 14",
        o8_t1: "EQUIPO 15",      o8_t2: "EQUIPO 16"
    },
    // CUARTOS DE FINAL (Rellenalo cuando sepas quiénes clasifican)
    cuartos: {
        c1_t1: "POR DEFINIR",     c1_t2: "POR DEFINIR",
        c2_t1: "POR DEFINIR",     c2_t2: "POR DEFINIR",
        c3_t1: "POR DEFINIR",     c3_t2: "POR DEFINIR",
        c4_t1: "POR DEFINIR",     c4_t2: "POR DEFINIR"
    },
    // SEMIFINALES
    semis: {
        s1_t1: "POR DEFINIR",     s1_t2: "POR DEFINIR",
        s2_t1: "POR DEFINIR",     s2_t2: "POR DEFINIR"
    },
    // FINAL Y CAMPEÓN
    final: {
        f1_t1: "POR DEFINIR",     f1_t2: "POR DEFINIR",
        campeon: "POR DEFINIR"
    }
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
    discordButton: document.getElementById("discordButton"),
    
    // Elementos de la navegación de ventanas
    showBracketsButton: document.getElementById("showBracketsButton"),
    backToInviteButton: document.getElementById("backToInviteButton"),
    invitationView: document.getElementById("invitationView"),
    bracketsView: document.getElementById("bracketsView")
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

    // APLICAR LOS ENFRENTAMIENTOS MANUALES DESDE EL OBJETO DE LLAVES
    // Octavos
    for (const key in LLAVES.octavos) { document.getElementById(key).textContent = LLAVES.octavos[key]; }
    // Cuartos
    for (const key in LLAVES.cuartos) { document.getElementById(key).textContent = LLAVES.cuartos[key]; }
    // Semis
    for (const key in LLAVES.semis) { document.getElementById(key).textContent = LLAVES.semis[key]; }
    // Final y Campeón
    document.getElementById("f1_t1").textContent = LLAVES.final.f1_t1;
    document.getElementById("f1_t2").textContent = LLAVES.final.f1_t2;
    document.getElementById("championName").textContent = LLAVES.final.campeon;
}

function updateCountdown() {
    const eventDate = new Date(state.eventDate);
    const diff = eventDate.getTime() - Date.now();

    if (Number.isNaN(eventDate.getTime())) {
        elements.timer.textContent = "FECHA INVÁLIDA";
        return;
    }
    if (diff <= 0) {
        elements.timer.textContent = "EN CURSO";
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
        window.setTimeout(() => { item.classList.add("is-visible"); }, 150 + index * 140);
    });
}

// FUNCIONES DE CONTROL DE VENTANAS
function showBrackets() {
    elements.invitationView.classList.add("hidden");
    elements.bracketsView.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showInvitation() {
    elements.bracketsView.classList.add("hidden");
    elements.invitationView.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function bindEvents() {
    elements.discordButton.addEventListener("click", openDiscord);
    elements.showBracketsButton.addEventListener("click", showBrackets);
    elements.backToInviteButton.addEventListener("click", showInvitation);
}

applyContent();
bindEvents();
setupRevealAnimations();
updateCountdown();
window.setInterval(updateCountdown, 1000);