function calcular() {
    // Entradas
    const consumo = parseFloat(document.getElementById("consumo").value);
    const conta = parseFloat(document.getElementById("conta").value);
    const custoSistema = parseFloat(document.getElementById("custoSistema").value);
    const irradiacao = parseFloat(document.getElementById("irradiacao").value);

    if (!consumo || !conta || !custoSistema || !irradiacao) {
        alert("Preencha todos os campos!");
        return;
    }

    // 1. Tarifa média (R$/kWh)
    const tarifa = conta / consumo;

    // 2. Produção estimada (kWh/mês)
    const eficienciaSistema = 0.75; // perdas do sistema
    const producaoMensal = irradiacao * 30 * eficienciaSistema * 1; // base 1 kWp

    // 3. Tamanho do sistema (kWp)
    const sistemaKWp = consumo / producaoMensal;

    // 4. Economia mensal
    const economiaMensal = consumo * tarifa;

    // 5. Economia anual
    const economiaAnual = economiaMensal * 12;

    // 6. Payback (meses)
    const payback = custoSistema / economiaMensal;

    // Saída
    document.getElementById("resultado").innerHTML = `
        <p><strong>Sistema necessário:</strong> ${sistemaKWp.toFixed(2)} kWp</p>
        <p><strong>Economia mensal:</strong> R$ ${economiaMensal.toFixed(2)}</p>
        <p><strong>Economia anual:</strong> R$ ${economiaAnual.toFixed(2)}</p>
        <p><strong>Payback:</strong> ${payback.toFixed(1)} meses</p>
    `;
}
