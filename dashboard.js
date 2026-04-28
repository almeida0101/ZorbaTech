document.addEventListener("DOMContentLoaded", function () {

    // ===== VERIFICA LOGIN =====
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!usuario) {
        alert("Você precisa estar logado!");
        window.location.href = "login.html";
        return;
    }

    // ===== DADOS INICIAIS (ZERADOS) =====
    let economiaMensal = 0;
    let economiaAnual = 0;
    let payback = 0;
    let co2 = 0;
    let investimento = 0;

    // ===== BUSCAR DADOS SALVOS =====
    const dadosSalvos = JSON.parse(localStorage.getItem(`dados_${usuario.email}`));

    if (dadosSalvos) {
        economiaMensal = dadosSalvos.economiaMensal || 0;
        economiaAnual = dadosSalvos.economiaAnual || 0;
        payback = dadosSalvos.payback || 0;
        co2 = dadosSalvos.co2 || 0;
        investimento = dadosSalvos.investimento || 0;
    }

    // ===== CARDS =====
    document.getElementById("cardMensal").textContent = `R$ ${economiaMensal.toFixed(2)}`;
    document.getElementById("cardAnual").textContent = `R$ ${economiaAnual.toFixed(2)}`;
    document.getElementById("cardPayback").textContent = `${payback.toFixed(1)} meses`;
    document.getElementById("cardCO2").textContent = `${co2.toFixed(2)} kg`;

    // ===== CONFIG GLOBAL CHART =====
    Chart.defaults.font.family = "'Poppins', sans-serif";
    Chart.defaults.font.size = 14;
    Chart.defaults.color = "#333";

    // ===== GRÁFICO 1 - BARRAS =====
    new Chart(document.getElementById('graficoEconomia'), {
        type: 'bar',
        data: {
            labels: ['Mensal', 'Anual'],
            datasets: [{
                label: 'Economia (R$)',
                data: [economiaMensal, economiaAnual],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // ===== GRÁFICO 2 - PAYBACK =====
    new Chart(document.getElementById('graficoPayback'), {
        type: 'line',
        data: {
            labels: ['0', '6', '12', '18', '24', '30'],
            datasets: [{
                label: 'Retorno acumulado',
                data: [
                    0,
                    economiaMensal * 6,
                    economiaMensal * 12,
                    economiaMensal * 18,
                    economiaMensal * 24,
                    economiaMensal * 30
                ],
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // ===== GRÁFICO 3 - PIZZA =====
    new Chart(document.getElementById('graficoPizza'), {
        type: 'pie',
        data: {
            labels: ['Economia Anual', 'Investimento'],
            datasets: [{
                data: [economiaAnual, investimento]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // ===== GRÁFICO 4 - LINHA DUPLA =====
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];

    const economiaAcumulada = meses.map((_, i) => economiaMensal * (i + 1));
    const investimentoConstante = meses.map(() => investimento);

    new Chart(document.getElementById('graficoLinhaComparativa'), {
        type: 'line',
        data: {
            labels: meses,
            datasets: [
                {
                    label: 'Economia acumulada',
                    data: economiaAcumulada,
                    tension: 0.4
                },
                {
                    label: 'Investimento',
                    data: investimentoConstante,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

});