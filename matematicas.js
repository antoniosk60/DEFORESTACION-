/* js/matematicas.js
   Movido desde matematicas.html.
   Nota: El proyecto usa fetch en `js/include.js` para insertar partials =>
   la página debe servirse por HTTP (p.ej. `python -m http.server 8000`) para evitar errores de CORS/file://.
*/

document.addEventListener('DOMContentLoaded', function () {
    // Calculadora de área
    const areaForm = document.getElementById('areaCalculator');
    if (areaForm) {
        areaForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const length = parseFloat(document.getElementById('length').value);
            const width = parseFloat(document.getElementById('width').value);
            const resultEl = document.getElementById('areaResult');

            if (Number.isNaN(length) || Number.isNaN(width)) {
                if (resultEl) {
                    resultEl.innerHTML = `\n                        <div class="alert alert-danger">\n                            Por favor ingresa valores numéricos válidos.\n                        </div>\n                    `;
                }
                return;
            }

            const area = length * width;
            if (resultEl) {
                resultEl.innerHTML = `\n                    <div class="alert alert-success">\n                        El área es: ${area} metros cuadrados (m²)\n                    </div>\n                `;
            }
        });
    }

    // Conversión de unidades
    const convForm = document.getElementById('unitConverter');
    if (convForm) {
        convForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const value = parseFloat(document.getElementById('value').value);
            const fromUnit = document.getElementById('fromUnit').value;
            const toUnit = document.getElementById('toUnit').value;
            const resultEl = document.getElementById('conversionResult');

            if (Number.isNaN(value)) {
                if (resultEl) {
                    resultEl.innerHTML = `\n                        <div class="alert alert-danger">\n                            Por favor ingresa un valor numérico válido.\n                        </div>\n                    `;
                }
                return;
            }

            // Conversión a metros cuadrados primero
            let inM2 = 0;
            switch (fromUnit) {
                case 'm2': inM2 = value; break;
                case 'ha': inM2 = value * 10000; break;
                case 'km2': inM2 = value * 1000000; break;
                case 'acre': inM2 = value * 4046.86; break;
                default: inM2 = value; break;
            }

            // Conversión a unidad destino
            let result = 0;
            switch (toUnit) {
                case 'm2': result = inM2; break;
                case 'ha': result = inM2 / 10000; break;
                case 'km2': result = inM2 / 1000000; break;
                case 'acre': result = inM2 / 4046.86; break;
                default: result = inM2; break;
            }

            if (resultEl) {
                resultEl.innerHTML = `\n                    <div class="alert alert-success">\n                        Resultado: ${result.toFixed(2)} ${toUnit}\n                    </div>\n                `;
            }
        });
    }

    // Gráfico de deforestación (Chart.js)
    const chartEl = document.getElementById('deforestationChart');
    if (chartEl && typeof Chart !== 'undefined') {
        try {
            const ctx = chartEl.getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
                    datasets: [{
                        label: 'Hectáreas deforestadas (miles)',
                        data: [120, 115, 118, 110, 105, 100],
                        borderColor: '#2e7d32',
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });
        } catch (err) {
            // Si Chart falla, no bloqueamos la página; registramos en consola para debugging
            console.error('Error inicializando el gráfico de deforestación:', err);
        }
    }
});
