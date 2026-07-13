// Change title based on selected utility

const params = new URLSearchParams(window.location.search);
const utility = params.get("utility");

const title = document.getElementById("stationTitle");

if (title) {

    switch (utility) {

        case "gescom":
            title.innerText = "GESCOM - Kalaburagi 220/110 kV Substation";
            break;

        case "bescom":
            title.innerText = "BESCOM - Bengaluru East 220/110 kV Substation";
            break;

        case "mescom":
            title.innerText = "MESCOM - Mangaluru 220/110 kV Substation";
            break;

        case "hescom":
            title.innerText = "HESCOM - Hubballi 220/110 kV Substation";
            break;

        case "kptcl":
            title.innerText = "KPTCL - State Grid 220/110 kV Substation";
            break;

        default:
            title.innerText = "GESCOM - Kalaburagi 220/110 kV Substation";

    }

}

const utilityData = {

    gescom: {
        voltage: "220 kV",
        current: "580 A",
        frequency: "50 Hz",
        temperature: "36°C",
        status: "🟢 ONLINE"
    },

    bescom: {
        voltage: "220 kV",
        current: "610 A",
        frequency: "49.9 Hz",
        temperature: "38°C",
        status: "🟢 ONLINE"
    },

    mescom: {
        voltage: "110 kV",
        current: "420 A",
        frequency: "50 Hz",
        temperature: "34°C",
        status: "🟢 ONLINE"
    },

    hescom: {
        voltage: "110 kV",
        current: "455 A",
        frequency: "49.8 Hz",
        temperature: "37°C",
        status: "🟡 MAINTENANCE"
    },

    kptcl: {
        voltage: "400 kV",
        current: "720 A",
        frequency: "50 Hz",
        temperature: "40°C",
        status: "🟢 ONLINE"
    }

};

const data = utilityData[utility] || utilityData.gescom;

document.getElementById("voltage").innerText = data.voltage;
document.getElementById("current").innerText = data.current;
document.getElementById("frequency").innerText = data.frequency;
document.getElementById("temperature").innerText = data.temperature;
document.getElementById("status").innerText = data.status;

function toggleMenu() {

    var menu = document.getElementById("sidebar");

    menu.classList.toggle("show");

}

function showSection(sectionId) {

    var sections = document.querySelectorAll(".section");

    sections.forEach(function(section) {
        section.style.display = "none";
    });

    document.getElementById(sectionId).style.display = "block";

    document.getElementById("sidebar").classList.remove("show");
}

async function loadDashboard() {

    const response = await fetch("http://127.0.0.1:5000/dashboard");

    const data = await response.json();

    document.getElementById("voltage").textContent = data.voltage;

    document.getElementById("current").textContent = data.current;

    document.getElementById("frequency").textContent = data.frequency;

    document.getElementById("temperature").textContent = data.temperature;

    document.getElementById("status").textContent = data.status;

   if (data.breaker3 === "TRIPPED") {
    document.getElementById("breaker3Status").textContent = "Status : 🔴 TRIPPED";
} else {
    document.getElementById("breaker3Status").textContent = "Status : 🟢 ON";
}

if (data.breaker3 === "TRIPPED") {
    document.getElementById("prediction").textContent =
        "⚠ Breaker 3 has TRIPPED. Immediate maintenance required.";
} else {
    document.getElementById("prediction").textContent =
        "✅ System Healthy. No fault predicted.";
}

if (data.breaker3 === "TRIPPED") {
    document.getElementById("notificationText").textContent =
        "🔴 Breaker 3 Tripped - HIGH Priority";
} else {
    document.getElementById("notificationText").textContent =
        "🟢 No Active Alerts";
}

if (data.breaker3 === "TRIPPED") {

    const now = new Date();

    document.getElementById("eventTime").textContent =
        now.toLocaleTimeString();

    document.getElementById("eventMessage").textContent =
        "Breaker 3 Tripped";

    document.getElementById("eventStatus").textContent =
        "🔴 Fault";

} else {

    document.getElementById("eventTime").textContent =
        "--:--";

    document.getElementById("eventMessage").textContent =
        "No Recent Events";

    document.getElementById("eventStatus").textContent =
        "🟢 Normal";
}

}

// Load data immediately
loadDashboard();

// Refresh every 5 seconds
setInterval(loadDashboard, 5000);
