document.addEventListener("DOMContentLoaded", () => {

    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    const div = document.getElementById("usuarioInfo");

    if (!div) return;

    if (usuario) {
        div.innerHTML = `
            <div class="usuario-box">
                <span>Olá, ${usuario.nome}</span>
                <button onclick="logout()">Sair</button>
            </div>
        `;
    }
});

function logout() {
    localStorage.removeItem("usuarioLogado");
    window.location.reload();
}