// script.js
function animar() {
    const llanta = document.getElementById('llanta');
    const camino = document.getElementById('camino-pintado');
    const contador = document.getElementById('contador');
    const refs = [
        document.getElementById('ref-1'),
        document.getElementById('ref-2'),
        document.getElementById('ref-3'),
        document.getElementById('ref-4')
    ];

    // --- CONFIGURACIÓN DE TAMAÑO ---
    const diametro = 150; // El nuevo tamaño en píxeles (CSS)
    const perimetro = diametro * Math.PI;
    const duracionTotal = 4000; // 4 segundos para todo el recorrido

    // --- REINICIO INSTANTÁNEO ---
    llanta.style.transition = "none";
    camino.style.transition = "none";
    llanta.style.left = "0px";
    llanta.style.transform = "rotate(0deg)";
    camino.style.width = "0px";
    camino.innerHTML = "";
    contador.innerText = "0.00";

    refs.forEach(r => {
        r.style.transition = "none";
        r.style.width = "0px";
    });

    // --- PASO 2: INICIAR ANIMACIÓN SINCRONIZADA ---
    setTimeout(() => {
        // 1. Animamos la base (Llanta y rastro)
        llanta.style.transition = `all ${duracionTotal}ms linear`;
        camino.style.transition = `width ${duracionTotal}ms linear`;

        // Mover la llanta y crecer el rastro
        llanta.style.left = perimetro + "px";
        camino.style.width = perimetro + "px";

        // --- CÁLCULO DE ROTACIÓN SINCRONIZADA ---
        // Para que sea perfecto, la llanta debe rotar exactamente
        // 360 grados por cada vuelta completa (perímetro).
        // En este caso, dará 1 vuelta completa para llegar a PI.
        const rotacionTotalGrados = 360;
        llanta.style.transform = `rotate(${rotacionTotalGrados}deg)`;

        // 2. Animación de Relevos de las barras superiores (proporcionales)
        const tiempoPorDiametro = duracionTotal / Math.PI;
        refs.forEach((ref, i) => {
            const retraso = i * tiempoPorDiametro;
            const proporcionAncho = (i < 3) ? 1 : 0.14159;
            const duracionBarra = tiempoPorDiametro * proporcionAncho;

            ref.style.transition = `width ${duracionBarra}ms linear`;
            ref.style.transitionDelay = `${retraso}ms`;

            let anchoFinal = (i < 3) ? diametro : (diametro * 0.14159);
            ref.style.width = anchoFinal + "px";
        });

        // 3. Pintar el suelo (se mantiene igual)
        const colores = ['#FF5722', '#2196F3', '#4CAF50', '#9C27B0'];
        for (let i = 0; i < 4; i++) {
            let seg = document.createElement('div');
            seg.className = "segmento-suelo";
            seg.style.backgroundColor = colores[i];
            let ancho = (i < 3) ? diametro : (diametro * 0.14159);
            seg.style.width = ancho + "px";
            camino.appendChild(seg);
        }

        // 4. Contador de Pi sincronizado
        let t_inicio = performance.now();
        function actualizar(ahora) {
            let progreso = Math.min((ahora - t_inicio) / duracionTotal, 1);
            let valorPi = progreso * Math.PI;
            contador.innerText = valorPi.toFixed(2);
            if (progreso < 1) {
                requestAnimationFrame(actualizar);
            } else {
                contador.innerText = "3.14"; // Valor final exacto
            }
        }
        requestAnimationFrame(actualizar);

    }, 50);
}
