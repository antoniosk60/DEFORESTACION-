/* js/site.js
    Código central del sitio (inicialización de Chart.js y animaciones).
    Nota: Este archivo asume que la página se sirve por HTTP (p.ej. `python -m http.server`).
*/
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar gráfico de impacto de la deforestación
    const canvas = document.getElementById('deforestationImpactChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Pérdida de Biodiversidad', 'Erosión del Suelo', 'Alteración del Agua', 'Emisiones CO2'],
                datasets: [{
                    data: [40, 25, 20, 15],
                    backgroundColor: ['#e74c3c','#f59e0b','#3498db','#2ecc71']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return (context.label ? context.label + ': ' : '') + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Animación de entrada para elementos con clase .fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length) {
        const fadeInOnScroll = function() {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                if (elementTop < window.innerHeight - elementVisible) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };

        // Estado inicial
        fadeElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        window.addEventListener('scroll', fadeInOnScroll);
        fadeInOnScroll();
    }

    // Añadir año automático en el footer (si existe el elemento)
    try {
        const yearEl = document.getElementById('year');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    } catch (e) {
        // En caso de error no bloqueamos el resto del script
        console.warn('No se pudo establecer el año del footer:', e);
    }
});
