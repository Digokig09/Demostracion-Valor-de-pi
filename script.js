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

    // --- CONFIGURACIÓN ---
    const diametroRealMm = 700;
    const perimetroRealMm = diametroRealMm * Math.PI;
    const diametroVisualPx = 150;
    const perimetroVisualPx = diametroVisualPx * Math.PI;
    const duracion = 5000;
    const colores = ['#FF5722', '#2196F3', '#4CAF50', '#9C27B0'];

    // --- REINICIO ---
    llanta.style.transition = "none";
    camino.style.transition = "none";
    llanta.style.left = "0px";
    llanta.style.transform = "rotate(0deg)";
    camino.style.width = "0px";
    camino.innerHTML = ""; // Limpiamos el suelo
    distText.innerText = "0";
    contadorPi.innerText = "0.00";

    refs.forEach(r => {
        r.style.transition = "none";
        r.style.width = "0px";
    });

    // --- CREAR SEGMENTOS EN EL SUELO ---
    // Los creamos antes de la animación para que ya estén ahí cuando el contenedor crezca
    for (let i = 0; i < 4; i++) {
        let seg = document.createElement('div');
        seg.className = "segmento-suelo";
        seg.style.backgroundColor = colores[i];
        let ancho = (i < 3) ? diametroVisualPx : (diametroVisualPx * 0.14159);
        seg.style.width = ancho + "px";
        seg.style.height = "100%";
        seg.style.flexShrink = "0";
        camino.appendChild(seg);
    }

    setTimeout(() => {
        // Movimiento de la llanta y revelación del suelo
        llanta.style.transition = `all ${duracion}ms linear`;
        camino.style.transition = `width ${duracion}ms linear`;

        llanta.style.left = perimetroVisualPx + "px";
        llanta.style.transform = "rotate(360deg)";
        camino.style.width = perimetroVisualPx + "px";

        // Barras superiores consecutivas
        const tiempoPorDiametro = duracion / Math.PI;
        refs.forEach((ref, i) => {
            const retraso = i * tiempoPorDiametro;
            const proporcion = (i < 3) ? 1 : 0.14159;
            ref.style.transition = `width ${tiempoPorDiametro * proporcion}ms linear`;
            ref.style.transitionDelay = `${retraso}ms`;
            ref.style.width = (i < 3 ? diametroVisualPx : diametroVisualPx * 0.14159) + "px";
        });

        // Medidor de mm y Pi en tiempo real
        let t_inicio = performance.now();
        function actualizar(ahora) {
            let progreso = Math.min((ahora - t_inicio) / duracion, 1);
            distText.innerText = (progreso * perimetroRealMm).toFixed(0);
            contadorPi.innerText = (progreso * Math.PI).toFixed(2);
            if (progreso < 1) requestAnimationFrame(actualizar);
            else contadorPi.innerText = "3.14";
        }
        requestAnimationFrame(actualizar);
    }, 50);
}
