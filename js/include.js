/* include.js
   Carga fragmentos HTML desde /partials/ y los inserta en elementos con id `site-header` y `site-footer`.
*/
(function () {
    async function includeHTML(id, url) {
        const el = document.getElementById(id);
        if (!el) return;
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const text = await res.text();
            el.innerHTML = text;
        } catch (e) {
            console.error('Error cargando include', url, e);
        }
    }

    // Cargar header y footer relativos a la raíz del proyecto
    document.addEventListener('DOMContentLoaded', function () {
        includeHTML('site-header', 'partials/header.html');
        includeHTML('site-footer', 'partials/footer.html');
    });
})();
