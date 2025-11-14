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

            // Ejecutar scripts dentro del fragmento cargado (inline y externos)
            const tmp = document.createElement('div');
            tmp.innerHTML = text;
            const scripts = tmp.querySelectorAll('script');
            scripts.forEach(s => {
                try{
                    if (s.src) {
                        const sc = document.createElement('script');
                        sc.src = s.src;
                        sc.async = false;
                        document.body.appendChild(sc);
                    } else {
                        const sc = document.createElement('script');
                        sc.text = s.textContent;
                        document.body.appendChild(sc);
                    }
                }catch(err){ console.warn('include.js: error ejecutando script del partial', err); }
            });

        } catch (e) {
            console.error('Error cargando include', url, e);
        }
    }

    // Cargar header y footer relativos a la raíz del proyecto
    document.addEventListener('DOMContentLoaded', function () {
        includeHTML('site-header', 'partials/header.html');
        includeHTML('site-footer', 'partials/footer.html');

        // Cargar helper para header/footer (marca active y asegura año)
        try{
            const hf = document.createElement('script');
            hf.src = 'js/header-footer.js';
            hf.defer = true;
            document.body.appendChild(hf);
        }catch(e){ console.warn('No se pudo cargar header-footer.js', e); }
    });
})();
