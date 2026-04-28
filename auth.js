function login() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    if (!nome || !email) {
        alert("Preencha tudo!");
        return;
    }

    const usuario = {
        nome,
        email
    };

    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    window.location.href = "index.html";
}