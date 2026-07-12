function openUtility(name) {

    window.location.href = "pages/kalaburagi.html?utility=" + name;

}

async function loadDashboard() {

    const response = await fetch("http://127.0.0.1:5000/dashboard");

    const data = await response.json();

    console.log(data);

}

loadDashboard();