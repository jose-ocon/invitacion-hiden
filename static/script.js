// Animación inicial
window.onload = () => {
    const container = document.querySelector(".container");
    container.style.opacity = 0;
    container.style.transform = "translateY(30px)";

    setTimeout(() => {
        container.style.transition = "all 1s ease";
        container.style.opacity = 1;
        container.style.transform = "translateY(0)";
    }, 200);
};

// Animación features
const features = document.querySelectorAll(".feature");

features.forEach((item, index) => {
    item.style.opacity = 0;
    item.style.transform = "translateX(-20px)";

    setTimeout(() => {
        item.style.transition = "all 0.6s ease";
        item.style.opacity = 1;
        item.style.transform = "translateX(0)";
    }, 500 + index * 300);
});

// Countdown
const eventDate = new Date("2026-01-28T17:00:00");

setInterval(() => {
    const now = new Date();
    const diff = eventDate - now;

    const timer = document.getElementById("timer");

    if (diff <= 0) {
        timer.textContent = "EN CURSO";
        return;
    }

    const h = String(Math.floor(diff / 1000 / 60 / 60)).padStart(2, "0");
    const m = String(Math.floor(diff / 1000 / 60) % 60).padStart(2, "0");
    const s = String(Math.floor(diff / 1000) % 60).padStart(2, "0");

    timer.textContent = `${h}:${m}:${s}`;
}, 1000);

// Acceso
function checkCode() {
    const code = document.getElementById("code").value;
    const btn = document.getElementById("discordBtn");

    if (code === "MARROW2026") {
        btn.disabled = false;
        btn.classList.add("enabled");
        btn.textContent = "DISCORD – ACCESO CONCEDIDO";
        btn.onclick = openDiscord;
        alert("Acceso concedido 🔥");
    } else {
        alert("Código inválido");
    }
}

// Discord
function openDiscord() {
    window.open("https://discord.gg/TU_LINK_AQUI", "_blank");
}
