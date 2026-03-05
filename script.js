function animar() {
    const llanta = document.getElementById('llanta');
    const camino = document.getElementById('camino-pintado');
    const distText = document.getElementById('distancia-recorrida');
    const contadorPi = document.getElementById('contador');
    const refs = [
        document.getElementById('ref-1'),
        document.getElementById('ref-2'),
        document.getElementById('ref-3'),
        document.getElementById('ref-4')
    ];

    // --- CONFIGURACIÓN TÉCNICA ---
    const diametroRealMm = 700;
    const perimetroRealMm = diametroRealMm * Math.PI;
    const diametroVisualPx = 150; // El tamaño en tu pantalla
    const perimetroVisualPx = diametroVisualPx * Math.PI;
    const duracion = 5000; // 5 segundos para que se aprecie el medidor

    // --- REINICIO ---
    // (Mantén aquí tu código de reinicio de estilos que ya tenías)

    setTimeout(() => {
        // Movimiento visual
        llanta.style.transition = `all ${duracion}ms linear`;
        camino.style.transition = `width ${duracion}ms linear`;

        llanta.style.left = perimetroVisualPx + "px";
        llanta.style.transform = "rotate(360deg)"; // 1 vuelta exacta
        camino.style.width = perimetroVisualPx + "px";

        // Barras superiores sincronizadas
        const tiempoPorDiametro = duracion / Math.PI;
        refs.forEach((ref, i) => {
            const retraso = i * tiempoPorDiametro;
            const proporcion = (i < 3) ? 1 : 0.14159;
            ref.style.transition = `width ${tiempoPorDiametro * proporcion}ms linear`;
            ref.style.transitionDelay = `${retraso}ms`;
            ref.style.width = (i < 3 ? diametroVisualPx : diametroVisualPx * 0.14159) + "px";
        });

        // --- MEDIDOR EN TIEMPO REAL ---
        let t_inicio = performance.now();
        function actualizarMedidores(ahora) {
            let progreso = Math.min((ahora - t_inicio) / duracion, 1);

            // Medidor de milímetros (0 a 2199.11 mm)
            let mmActuales = progreso * perimetroRealMm;
            distText.innerText = mmActuales.toFixed(0);

            // Medidor de Pi (0 a 3.14)
            let piActual = progreso * Math.PI;
            contadorPi.innerText = piActual.toFixed(2);

            if (progreso < 1) requestAnimationFrame(actualizarMedidores);
        }
        requestAnimationFrame(actualizarMedidores);

    }, 50);
}
