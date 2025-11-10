// Porcentajes de cada corte
const PORCENTAJE_CORTE1 = 0.33;
const PORCENTAJE_CORTE2 = 0.33;
const PORCENTAJE_CORTE3 = 0.34;
const NOTA_MINIMA_APROBATORIA = 3.0;
const NOTA_MAXIMA = 5.0;

// Obtener elementos del DOM
const corte1Input = document.getElementById('corte1');
const corte2Input = document.getElementById('corte2');
const calcularBtn = document.getElementById('calcularBtn');
const resultadosDiv = document.getElementById('resultados');
const notaActualSpan = document.getElementById('notaActual');
const notaNecesariaSpan = document.getElementById('notaNecesaria');
const notaFinalSpan = document.getElementById('notaFinal');
const mensajeDiv = document.getElementById('mensaje');

// Evento para calcular
calcularBtn.addEventListener('click', calcularNotas);

// Permitir calcular con Enter
corte1Input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calcularNotas();
});

corte2Input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calcularNotas();
});

function crearEmoji(emoji, cantidad) {
    for (let i = 0; i < cantidad; i++) {
        setTimeout(() => {
            const emojiElement = document.createElement('div');
            emojiElement.className = 'emoji';
            emojiElement.textContent = emoji;
            emojiElement.style.left = Math.random() * 100 + 'vw';
            emojiElement.style.animationDuration = (2 + Math.random() * 2) + 's';
            document.body.appendChild(emojiElement);
            
            setTimeout(() => {
                emojiElement.remove();
            }, 3000);
        }, i * 100);
    }
}

function explotar() {
    calcularBtn.classList.add('exploding');
    crearEmoji('😢', 15);
    crearEmoji('😭', 10);
    crearEmoji('❌', 20);
    
    setTimeout(() => {
        calcularBtn.classList.remove('exploding');
    }, 600);
}

function celebrar() {
    crearEmoji('❤️', 20);
    crearEmoji('💚', 15);
    crearEmoji('💙', 15);
    crearEmoji('😊', 12);
    crearEmoji('🎉', 10);
    crearEmoji('⭐', 12);
    crearEmoji('✨', 15);
}

function calcularNotas() {
    // Obtener valores de entrada
    const nota1 = parseFloat(corte1Input.value);
    const nota2 = parseFloat(corte2Input.value);
    
    // Validar entradas
    if (isNaN(nota1) || isNaN(nota2)) {
        alert('Por favor, ingresa ambas calificaciones');
        return;
    }
    
    if (nota1 < 0 || nota1 > 5 || nota2 < 0 || nota2 > 5) {
        alert('Las calificaciones deben estar entre 0.0 y 5.0');
        return;
    }
    
    // Calcular nota actual (suma de los dos primeros cortes)
    const notaActual = (nota1 * PORCENTAJE_CORTE1) + (nota2 * PORCENTAJE_CORTE2);
    
    // Calcular nota necesaria en el tercer corte para obtener 3.0
    const notaNecesaria = (NOTA_MINIMA_APROBATORIA - notaActual) / PORCENTAJE_CORTE3;
    
    // Calcular nota final proyectada
    const notaFinalProyectada = notaActual + (Math.min(notaNecesaria, NOTA_MAXIMA) * PORCENTAJE_CORTE3);
    
    // Mostrar resultados
    notaActualSpan.textContent = notaActual.toFixed(2);
    notaNecesariaSpan.textContent = notaNecesaria.toFixed(2);
    notaFinalSpan.textContent = notaFinalProyectada.toFixed(2);
    
    // Animaciones según el resultado
    if (notaNecesaria > NOTA_MAXIMA) {
        explotar();
    } else if (notaNecesaria <= NOTA_MAXIMA && notaNecesaria >= 0) {
        celebrar();
    } else {
        celebrar();
    }
    
    // Mostrar mensaje según el caso
    mostrarMensaje(notaNecesaria, notaActual);
    
    // Mostrar sección de resultados
    resultadosDiv.classList.remove('oculto');
    
    // Scroll suave hacia los resultados
    resultadosDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function mostrarMensaje(notaNecesaria, notaActual) {
    mensajeDiv.className = 'mensaje';
    
    if (notaActual >= NOTA_MINIMA_APROBATORIA) {
        mensajeDiv.textContent = '¡Felicitaciones! Ya tienes una nota aprobatoria con los dos primeros cortes.';
        mensajeDiv.classList.add('exito');
    } else if (notaNecesaria <= NOTA_MAXIMA && notaNecesaria >= 0) {
        mensajeDiv.textContent = `Necesitas sacar ${notaNecesaria.toFixed(2)} en el tercer corte para aprobar con 3.0`;
        mensajeDiv.classList.add('advertencia');
    } else if (notaNecesaria > NOTA_MAXIMA) {
        mensajeDiv.textContent = '⚠️ No es posible alcanzar 3.0 aunque saques 5.0 en el tercer corte. La nota máxima posible sería: ' + (notaActual + (NOTA_MAXIMA * PORCENTAJE_CORTE3)).toFixed(2);
        mensajeDiv.classList.add('imposible');
    } else {
        mensajeDiv.textContent = '¡Ya superaste la nota mínima! Cualquier nota te permitirá aprobar.';
        mensajeDiv.classList.add('exito');
    }
}