function calcular() {

    const consumo = parseFloat(document.getElementById("consumo").value);
    const conta = parseFloat(document.getElementById("conta").value);
    const custoSistema = parseFloat(document.getElementById("custoSistema").value);
    const irradiacao = parseFloat(document.getElementById("irradiacao").value);

    if (!consumo || !conta || !custoSistema || !irradiacao) {
        alert("Preencha todos os campos!");
        return;
    }

    const tarifa = conta / consumo;
    const eficienciaSistema = 0.75;
    const producaoMensal = irradiacao * 30 * eficienciaSistema;

    const sistemaKWp = consumo / producaoMensal;
    const economiaMensal = consumo * tarifa;
    const economiaAnual = economiaMensal * 12;
    const payback = custoSistema / economiaMensal;
    const co2 = consumo * 12 * 0.084;

    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (usuario) {
        const dados = {
            economiaMensal,
            economiaAnual,
            payback,
            co2,
            investimento: custoSistema
        };

        localStorage.setItem(`dados_${usuario.email}`, JSON.stringify(dados));
    }

    document.getElementById("resultado").innerHTML = `
        <div class="resultado-box">
            <h3>Resultado da Simulação</h3>

            <p><strong>Sistema:</strong> ${sistemaKWp.toFixed(2)} kWp</p>
            <p><strong>Economia mensal:</strong> R$ ${economiaMensal.toFixed(2)}</p>
            <p><strong>Economia anual:</strong> R$ ${economiaAnual.toFixed(2)}</p>
            <p><strong>Payback:</strong> ${payback.toFixed(1)} meses</p>

            <p class="destaque">
                Vá para a Dashboard para visualizar gráficos completos 📊
            </p>
        </div>
    `;
}