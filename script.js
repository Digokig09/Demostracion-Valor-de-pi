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

    const diametro = 120;
    const perimetro = diametro * Math.PI;
    const duracionTotal = 4000; // 4 segundos para todo el recorrido

    // --- REINICIO ---
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

    setTimeout(() => {
        // 1. Animación base (Llanta y rastro en el suelo)
        llanta.style.transition = `all ${duracionTotal}ms linear`;
        camino.style.transition = `width ${duracionTotal}ms linear`;

        llanta.style.left = perimetro + "px";
        llanta.style.transform = "rotate(360deg)";
        camino.style.width = perimetro + "px";

        // 2. Lógica de Relevos para las barras de arriba
        // El tiempo que tarda cada "diámetro" en recorrerse
        const tiempoPorDiametro = duracionTotal / Math.PI;

        refs.forEach((ref, i) => {
            // Calculamos el retraso: la barra 2 espera a la 1, etc.
            const retraso = i * tiempoPorDiametro;

            // Calculamos la duración de cada barra (las 3 primeras iguales, la última más corta)
            const proporcionAncho = (i < 3) ? 1 : 0.14159;
            const duracionBarra = tiempoPorDiametro * proporcionAncho;

            ref.style.transition = `width ${duracionBarra}ms linear`;
            ref.style.transitionDelay = `${retraso}ms`;

            let anchoFinal = (i < 3) ? diametro : (diametro * 0.14159);
            ref.style.width = anchoFinal + "px";
        });

        // 3. Pintar el suelo (se mantiene igual, el contenedor 'camino' revela los colores)
        const colores = ['#FF5722', '#2196F3', '#4CAF50', '#9C27B0'];
        for (let i = 0; i < 4; i++) {
            let seg = document.createElement('div');
            seg.className = "segmento-suelo";
            seg.style.backgroundColor = colores[i];
            let ancho = (i < 3) ? diametro : (diametro * 0.14159);
            seg.style.width = ancho + "px";
            camino.appendChild(seg);
        }

        // 4. Contador fluido
        let t_inicio = performance.now();
        function actualizar(ahora) {
            let progreso = Math.min((ahora - t_inicio) / duracionTotal, 1);
            let valorPi = progreso * Math.PI;
            contador.innerText = valorPi.toFixed(2);
            if (progreso < 1) requestAnimationFrame(actualizar);
            else contador.innerText = "3.14";
        }
        requestAnimationFrame(actualizar);

    }, 50);
}