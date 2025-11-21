// Datos de prueba de usuarios
const usuarios = {
    "admin": { password: "1234", rol: "admin" },
    "usuario1": { password: "abcd", rol: "usuario" }
};

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const loginSection = document.getElementById("loginSection");
const mapSection = document.getElementById("mapSection");

const registroSection = document.getElementById("registroSection");
const registroForm = document.getElementById("registroForm");
const registroMessage = document.getElementById("registroMessage");

loginForm.addEventListener("submit", function(e){
    e.preventDefault();
    const user = document.getElementById("usuario").value;
    const pass = document.getElementById("password").value;

    if(usuarios[user] && usuarios[user].password === pass){
        loginMessage.textContent = `Bienvenido ${user} (${usuarios[user].rol})`;
        loginSection.classList.add("hidden");
        mapSection.classList.remove("hidden");

        // Mostrar formulario solo si es admin
        if(usuarios[user].rol === "admin"){
            registroSection.classList.remove("hidden");
        }

        initMap(); // Mostrar mapa
    } else {
        loginMessage.textContent = "Usuario o contraseña incorrectos";
    }
});

// Google Maps
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.6037, lng: -58.3816 },
        zoom: 12
    });

    // Puntos de ejemplo con territorio
    const puntos = [
        { nombre: "Casa", lat: -34.607, lng: -58.381, territorio: 1 },
        { nombre: "Trabajo", lat: -34.601, lng: -58.384, territorio: 2 },
        { nombre: "Gimnasio", lat: -34.609, lng: -58.377, territorio: 3 }
    ];

    puntos.forEach(p => {
        new google.maps.Marker({
            position: {lat: p.lat, lng: p.lng},
            map: map,
            title: `Territorio ${p.territorio}: ${p.nombre}`
        });
    });

    // Evento clic en el mapa
    mapGlobal.addListener("click", function(event) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        // Guardamos temporalmente en el formulario
        document.getElementById("latitud").value = lat.toFixed(6);
        document.getElementById("longitud").value = lng.toFixed(6);

        alert(`Punto seleccionado en el mapa:\nLatitud: ${lat.toFixed(6)}\nLongitud: ${lng.toFixed(6)}`);
    });
    let marcadorTemporal;

mapGlobal.addListener("click", function(event) {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    document.getElementById("latitud").value = lat.toFixed(6);
    document.getElementById("longitud").value = lng.toFixed(6);

    // Si ya hay un marcador temporal, lo eliminamos
    if(marcadorTemporal) marcadorTemporal.setMap(null);

    // Creamos un nuevo marcador temporal
    marcadorTemporal = new google.maps.Marker({
        position: {lat: lat, lng: lng},
        map: mapGlobal,
        title: "Punto seleccionado"
    });
});
}



