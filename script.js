/* =========================================================
   UNIVERSO AMARILLO
   SCRIPT.JS COMPLETO

   Experiencia personalizada para Nayelly / Tallis 💛
========================================================= */


/* =========================================================
   1. ELEMENTOS GENERALES
========================================================= */

const canvas = document.getElementById("universo");
const ctx = canvas.getContext("2d");

const inicio = document.getElementById("inicio");
const experiencia = document.getElementById("experiencia");
const final = document.getElementById("final");

const btnComenzar = document.getElementById("btnComenzar");
const btnSorpresa = document.getElementById("btnSorpresa");

const musica = document.getElementById("musica");

const decoracionExperiencia =
    document.getElementById("decoracionExperiencia");


/* =========================================================
   2. VARIABLES GENERALES
========================================================= */

let estrellas = [];

let animacionIniciada = false;

let generadorFlores = null;


/* =========================================================
   3. CANVAS INICIAL
========================================================= */

function ajustarCanvas() {

    const escala = Math.min(
        window.devicePixelRatio || 1,
        2
    );

    const ancho = window.innerWidth;
    const alto = window.innerHeight;

    canvas.width =
        ancho * escala;

    canvas.height =
        alto * escala;

    canvas.style.width =
        ancho + "px";

    canvas.style.height =
        alto + "px";

    ctx.setTransform(
        escala,
        0,
        0,
        escala,
        0,
        0
    );

    crearEstrellasIniciales();
}


/* =========================================================
   4. CREAR ESTRELLAS DEL FONDO INICIAL
========================================================= */

function crearEstrellasIniciales() {

    estrellas = [];

    const ancho =
        window.innerWidth;

    const alto =
        window.innerHeight;

    const cantidad =
        Math.floor(
            (ancho * alto) / 3200
        );

    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        estrellas.push({

            x:
                Math.random() * ancho,

            y:
                Math.random() * alto,

            radio:
                Math.random() * 1.45 + 0.2,

            velocidad:
                Math.random() * 0.22 + 0.03,

            alpha:
                Math.random() * 0.75 + 0.15,

            cambio:
                Math.random() * 0.012 + 0.003,

            dorada:
                Math.random() > 0.55

        });
    }
}


/* =========================================================
   5. ANIMACIÓN DEL FONDO INICIAL
========================================================= */

function animarUniversoInicial() {

    const ancho =
        window.innerWidth;

    const alto =
        window.innerHeight;

    ctx.clearRect(
        0,
        0,
        ancho,
        alto
    );

    estrellas.forEach(
        estrella => {

            estrella.alpha +=
                estrella.cambio;

            if (
                estrella.alpha >= 0.95 ||
                estrella.alpha <= 0.15
            ) {

                estrella.cambio *= -1;
            }


            ctx.beginPath();

            ctx.arc(
                estrella.x,
                estrella.y,
                estrella.radio,
                0,
                Math.PI * 2
            );


            if (estrella.dorada) {

                ctx.fillStyle =
                    `rgba(
                        255,
                        218,
                        115,
                        ${estrella.alpha}
                    )`;

            } else {

                ctx.fillStyle =
                    `rgba(
                        255,
                        249,
                        220,
                        ${estrella.alpha}
                    )`;
            }

            ctx.fill();


            if (animacionIniciada) {

                estrella.y -=
                    estrella.velocidad;

                if (
                    estrella.y < -5
                ) {

                    estrella.y =
                        alto + 5;

                    estrella.x =
                        Math.random() *
                        ancho;
                }
            }
        }
    );


    requestAnimationFrame(
        animarUniversoInicial
    );
}


/* =========================================================
   6. DECORACIÓN DE LOS 6 MENSAJES

   Aquí utilizamos:
   - estrella_dorada.png
   - girasol.png
   - rosa_amarilla.png
========================================================= */

function crearDecoracionExperiencia() {

    decoracionExperiencia.innerHTML = "";


    /* =====================================================
       ESTRELLAS DORADAS PNG
    ===================================================== */

    const cantidadEstrellas = 11;


    for (
        let i = 0;
        i < cantidadEstrellas;
        i++
    ) {

        const estrella =
            document.createElement("img");


        estrella.src =
            "assets/estrella_dorada.png";

        estrella.alt = "";

        estrella.className =
            "estrellaExperiencia";


        /*
           Tamaño contenido para evitar que la propia
           imagen de la estrella se corte en los bordes.
        */

        const tamaño =
            Math.random() * 20 + 17;


        estrella.style.width =
            tamaño + "px";

        estrella.style.height =
            tamaño + "px";


        /*
           Zona segura horizontal:
           nunca nace pegada al borde.
        */

        estrella.style.left =
            Math.random() * 82 + 9 + "%";


        estrella.style.top =
            Math.random() * 84 + 8 + "%";


        estrella.style.setProperty(
            "--duracion",
            (
                Math.random() * 5 + 6
            ) + "s"
        );


        estrella.style.setProperty(
            "--movX",
            (
                Math.random() * 14 - 7
            ) + "px"
        );


        estrella.style.setProperty(
            "--movY",
            (
                Math.random() * -16 - 6
            ) + "px"
        );


        estrella.style.animationDelay =
            (
                Math.random() * -8
            ) + "s";


        decoracionExperiencia.appendChild(
            estrella
        );
    }


    /* =====================================================
       FLORES INDIVIDUALES DE FONDO
    ===================================================== */

    const floresFondo = [

        "assets/girasol.png",
        "assets/rosa_amarilla.png",
        "assets/girasol.png",
        "assets/rosa_amarilla.png",
        "assets/girasol.png",
        "assets/rosa_amarilla.png"

    ];


    floresFondo.forEach(
        (ruta, indice) => {

            const flor =
                document.createElement("img");


            flor.src =
                ruta;

            flor.alt = "";

            flor.className =
                "florFondoExperiencia";


            const tamaño =
                Math.random() * 30 + 36;


            flor.style.width =
                tamaño + "px";

            flor.style.height =
                tamaño + "px";


            /*
               Las mantenemos en los laterales,
               pero sin pegarlas al borde.
            */

            if (
                indice % 2 === 0
            ) {

                flor.style.left =
                    Math.random() * 10 +
                    6 +
                    "%";

            } else {

                flor.style.right =
                    Math.random() * 10 +
                    6 +
                    "%";
            }


            flor.style.top =
                Math.random() * 72 +
                14 +
                "%";


            flor.style.setProperty(
                "--duracion",
                (
                    Math.random() * 5 +
                    8
                ) + "s"
            );


            flor.style.setProperty(
                "--movX",
                (
                    Math.random() * 14 -
                    7
                ) + "px"
            );


            flor.style.setProperty(
                "--movY",
                (
                    Math.random() * -16 -
                    7
                ) + "px"
            );


            flor.style.setProperty(
                "--blur",
                (
                    Math.random() * 0.7
                ) + "px"
            );


            flor.style.animationDelay =
                (
                    Math.random() * -8
                ) + "s";


            decoracionExperiencia.appendChild(
                flor
            );
        }
    );
}


/* =========================================================
   7. FLORES ASCENDENTES
========================================================= */

function crearFlorAscendente() {

    if (
        !animacionIniciada
    ) {
        return;
    }


    const flor =
        document.createElement("img");


    const usarGirasol =
        Math.random() > 0.5;


    flor.src =
        usarGirasol
            ? "assets/girasol.png"
            : "assets/rosa_amarilla.png";


    flor.alt = "";

    flor.classList.add(
        "flor"
    );


    const tamaño =
        Math.random() * 23 +
        21;


    flor.style.width =
        tamaño + "px";

    flor.style.height =
        tamaño + "px";

    flor.style.objectFit =
        "contain";


    /*
       8vw - 92vw evita que las flores
       aparezcan cortadas desde su nacimiento.
    */

    flor.style.left =
        Math.random() * 84 +
        8 +
        "vw";


    flor.style.top =
        "108vh";


    flor.style.opacity =
        Math.random() * 0.22 +
        0.08;


    document.body.appendChild(
        flor
    );


    const duracion =
        Math.random() * 7000 +
        11000;


    /*
       Menos movimiento horizontal que antes.
    */

    const desplazamiento =
        Math.random() * 50 -
        25;


    const rotacion =
        Math.random() * 100 -
        50;


    const animacion =
        flor.animate(

            [
                {

                    transform:
                        `
                        translate3d(
                            0,
                            0,
                            0
                        )
                        rotate(0deg)
                        scale(.65)
                        `,

                    opacity: 0

                },

                {

                    offset: 0.15,

                    opacity:
                        flor.style.opacity

                },

                {

                    offset: 0.80,

                    opacity:
                        flor.style.opacity

                },

                {

                    transform:
                        `
                        translate3d(
                            ${desplazamiento}px,
                            -120vh,
                            0
                        )
                        rotate(${rotacion}deg)
                        scale(1)
                        `,

                    opacity: 0

                }
            ],

            {

                duration:
                    duracion,

                easing:
                    "linear",

                fill:
                    "forwards"

            }
        );


    animacion.onfinish =
        () => {

            flor.remove();

        };
}


/* =========================================================
   8. MOSTRAR MENSAJES
========================================================= */

function mostrarMensaje(
    id,
    inicioTiempo,
    duracion
) {

    setTimeout(
        () => {

            const mensaje =
                document.getElementById(
                    id
                );


            if (
                !mensaje
            ) {
                return;
            }


            mensaje.classList.add(
                "visible"
            );


            setTimeout(
                () => {

                    mensaje.classList.remove(
                        "visible"
                    );

                },
                duracion
            );

        },
        inicioTiempo
    );
}


/* =========================================================
   9. BOTÓN "ABRIR MI UNIVERSO"
========================================================= */

btnComenzar.addEventListener(
    "click",
    comenzarExperiencia
);


function comenzarExperiencia() {

    /*
       Evita que un doble clic inicie
       dos secuencias al mismo tiempo.
    */

    if (
        animacionIniciada
    ) {
        return;
    }


    animacionIniciada = true;


    /* =====================================================
       MÚSICA
    ===================================================== */

    musica.volume =
        0.45;


    musica
        .play()
        .catch(
            () => {

                /*
                   Si el navegador bloquea el audio,
                   la experiencia continúa normalmente.
                */

            }
        );


    /* =====================================================
       OCULTAR INICIO
    ===================================================== */

    inicio.classList.remove(
        "activa"
    );


    experiencia.setAttribute(
        "aria-hidden",
        "false"
    );


    /* =====================================================
       DECORACIÓN
    ===================================================== */

    crearDecoracionExperiencia();


    /* =====================================================
       FLORES ASCENDENTES
    ===================================================== */

    generadorFlores =
        setInterval(
            crearFlorAscendente,
            850
        );


    /* =====================================================
       LOS 6 MENSAJES
    ===================================================== */


    /* MENSAJE 1 */

    mostrarMensaje(
        "mensaje1",
        1500,
        4000
    );


    /* MENSAJE 2 */

    mostrarMensaje(
        "mensaje2",
        7000,
        4000
    );


    /* MENSAJE 3 */

    mostrarMensaje(
        "mensaje3",
        12500,
        5000
    );


    /* MENSAJE 4 */

    mostrarMensaje(
        "mensaje4",
        19000,
        4000
    );


    /* MENSAJE 5 */

    mostrarMensaje(
        "mensaje5",
        24500,
        4000
    );


    /* MENSAJE 6 */

    mostrarMensaje(
        "mensaje6",
        30000,
        5500
    );


    /* =====================================================
       MOSTRAR PANTALLA "TOCA AQUÍ"
    ===================================================== */

    setTimeout(
        () => {

            if (
                generadorFlores
            ) {

                clearInterval(
                    generadorFlores
                );

                generadorFlores =
                    null;
            }


            experiencia.setAttribute(
                "aria-hidden",
                "true"
            );


            final.classList.add(
                "activa"
            );

        },
        37000
    );
}


/* =========================================================
   10. UNIVERSO FINAL
========================================================= */

const universoFinal =
    document.getElementById(
        "universoFinal"
    );


const canvasGalaxia =
    document.getElementById(
        "canvasGalaxia"
    );


const ctxGalaxia =
    canvasGalaxia.getContext(
        "2d"
    );


const camaraUniverso =
    document.getElementById(
        "camaraUniverso"
    );


const ramosUniverso =
    document.querySelectorAll(
        ".ramoUniverso"
    );


const frasesUniverso =
    document.querySelectorAll(
        ".fraseUniverso"
    );


/* =========================================================
   11. VARIABLES DE LA GALAXIA
========================================================= */

let estrellasGalaxia = [];

let estrellasCercanas = [];

let polvoGalaxia = [];

let destellosGalaxia = [];


let centroX = 0;

let centroY = 0;


let objetivoX = 0;

let objetivoY = 0;


let movimientoX = 0;

let movimientoY = 0;


let universoCorriendo = false;


/* =========================================================
   12. AJUSTAR GALAXIA
========================================================= */

function ajustarGalaxia() {

    const escala =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );


    const ancho =
        window.innerWidth;


    const alto =
        window.innerHeight;


    canvasGalaxia.width =
        ancho * escala;


    canvasGalaxia.height =
        alto * escala;


    canvasGalaxia.style.width =
        ancho + "px";


    canvasGalaxia.style.height =
        alto + "px";


    ctxGalaxia.setTransform(
        escala,
        0,
        0,
        escala,
        0,
        0
    );


    centroX =
        ancho / 2;


    /*
       En pantallas altas dejamos el agujero negro
       ligeramente debajo del centro.

       Esto funciona especialmente bien en móviles
       altos como la familia Galaxy Ultra.
    */

    centroY =
        alto * 0.56;


    crearGalaxia();
}


/* =========================================================
   13. CREAR GALAXIA
========================================================= */

function crearGalaxia() {

    estrellasGalaxia = [];

    estrellasCercanas = [];

    polvoGalaxia = [];

    destellosGalaxia = [];


    const ancho =
        window.innerWidth;


    const alto =
        window.innerHeight;


    /* =====================================================
       ESTRELLAS LEJANAS
    ===================================================== */

    for (
        let i = 0;
        i < 290;
        i++
    ) {

        estrellasGalaxia.push({

            x:
                Math.random() *
                ancho,

            y:
                Math.random() *
                alto,

            radio:
                Math.random() *
                1.35 +
                0.15,

            brillo:
                Math.random() *
                0.75 +
                0.2,

            fase:
                Math.random() *
                Math.PI *
                2,

            profundidad:
                Math.random() *
                0.7 +
                0.1

        });
    }


    /* =====================================================
       ESTRELLAS CERCANAS
    ===================================================== */

    for (
        let i = 0;
        i < 42;
        i++
    ) {

        estrellasCercanas.push({

            x:
                Math.random() *
                ancho,

            y:
                Math.random() *
                alto,

            radio:
                Math.random() *
                2 +
                0.55,

            brillo:
                Math.random() *
                0.5 +
                0.28,

            profundidad:
                Math.random() *
                0.7 +
                0.8,

            fase:
                Math.random() *
                Math.PI *
                2

        });
    }


    /* =====================================================
       DESTELLOS GRANDES
    ===================================================== */

    for (
        let i = 0;
        i < 12;
        i++
    ) {

        destellosGalaxia.push({

            x:
                Math.random() *
                ancho,

            y:
                Math.random() *
                alto,

            tamaño:
                Math.random() *
                4 +
                2,

            brillo:
                Math.random() *
                0.35 +
                0.18,

            fase:
                Math.random() *
                Math.PI *
                2,

            profundidad:
                Math.random() *
                0.8 +
                0.3

        });
    }


    /* =====================================================
       POLVO GALÁCTICO

       Reducimos ligeramente en móvil para mantener
       la animación fluida.
    ===================================================== */

    const cantidadPolvo =
        ancho < 600
            ? 1800
            : 2500;


    const brazos =
        4;


    for (
        let i = 0;
        i < cantidadPolvo;
        i++
    ) {

        const brazo =
            i % brazos;


        const progreso =
            Math.random();


        const radio =
            30 +

            progreso *

            Math.min(
                ancho,
                alto
            )

            * 0.70;


        const dispersion =
            (
                Math.random() -
                0.5
            )

            *

            (
                16 +
                progreso *
                75
            );


        const angulo =
            progreso *
            Math.PI *
            4.6

            +

            brazo *
            (
                Math.PI *
                2 /
                brazos
            )

            +

            (
                Math.random() -
                0.5
            )

            * 0.32;


        polvoGalaxia.push({

            radio:
                radio +
                dispersion,

            angulo:
                angulo,

            tamaño:
                Math.random() *
                1.55 +
                0.18,

            brillo:
                Math.random() *
                0.62 +
                0.08,

            velocidad:
                0.00008 +
                Math.random() *
                0.00013,

            profundidad:
                Math.random() *
                0.7 +
                0.25

        });
    }
}


/* =========================================================
   14. FONDO DEL UNIVERSO FINAL
========================================================= */

function dibujarFondoGalaxia() {

    const ancho =
        window.innerWidth;


    const alto =
        window.innerHeight;


    ctxGalaxia.clearRect(
        0,
        0,
        ancho,
        alto
    );


    const fondo =
        ctxGalaxia.createRadialGradient(

            centroX +
            movimientoX *
            5,

            centroY +
            movimientoY *
            5,

            15,

            centroX,

            centroY,

            Math.max(
                ancho,
                alto
            )
        );


    fondo.addColorStop(
        0,
        "#1a1002"
    );


    fondo.addColorStop(
        0.22,
        "#0c0702"
    );


    fondo.addColorStop(
        0.52,
        "#030304"
    );


    fondo.addColorStop(
        1,
        "#000000"
    );


    ctxGalaxia.fillStyle =
        fondo;


    ctxGalaxia.fillRect(
        0,
        0,
        ancho,
        alto
    );


    /* =====================================================
       RESPLANDOR AMBIENTAL
    ===================================================== */

    const ambiente =
        ctxGalaxia.createRadialGradient(

            centroX,

            centroY,

            0,

            centroX,

            centroY,

            Math.min(
                ancho,
                alto
            ) * 0.8
        );


    ambiente.addColorStop(
        0,
        "rgba(255,170,20,.07)"
    );


    ambiente.addColorStop(
        0.45,
        "rgba(150,80,0,.025)"
    );


    ambiente.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );


    ctxGalaxia.fillStyle =
        ambiente;


    ctxGalaxia.fillRect(
        0,
        0,
        ancho,
        alto
    );
}


/* =========================================================
   15. ESTRELLAS LEJANAS
========================================================= */

function dibujarEstrellasGalaxia(
    tiempo
) {

    estrellasGalaxia.forEach(
        estrella => {

            const parallax =
                estrella.profundidad *
                9;


            const x =
                estrella.x +

                movimientoX *
                parallax;


            const y =
                estrella.y +

                movimientoY *
                parallax;


            const parpadeo =
                0.62 +

                Math.sin(
                    tiempo *
                    0.0015 +
                    estrella.fase
                )

                * 0.28;


            ctxGalaxia.beginPath();


            ctxGalaxia.arc(
                x,
                y,
                estrella.radio,
                0,
                Math.PI * 2
            );


            ctxGalaxia.fillStyle =

                `rgba(
                    255,
                    236,
                    180,
                    ${
                        estrella.brillo *
                        parpadeo
                    }
                )`;


            ctxGalaxia.fill();
        }
    );
}


/* =========================================================
   16. DESTELLOS
========================================================= */

function dibujarDestellos(
    tiempo
) {

    ctxGalaxia.save();


    destellosGalaxia.forEach(
        estrella => {

            const pulso =
                0.45 +

                Math.sin(
                    tiempo *
                    0.002 +
                    estrella.fase
                )

                * 0.35;


            const x =
                estrella.x +

                movimientoX *
                estrella.profundidad *
                15;


            const y =
                estrella.y +

                movimientoY *
                estrella.profundidad *
                15;


            const alpha =
                Math.max(
                    0.05,
                    estrella.brillo *
                    pulso
                );


            ctxGalaxia.strokeStyle =
                `rgba(
                    255,
                    220,
                    130,
                    ${alpha}
                )`;


            ctxGalaxia.lineWidth =
                0.7;


            ctxGalaxia.shadowBlur =
                8;


            ctxGalaxia.shadowColor =
                "rgba(255,195,45,.55)";


            ctxGalaxia.beginPath();


            ctxGalaxia.moveTo(
                x -
                estrella.tamaño,
                y
            );


            ctxGalaxia.lineTo(
                x +
                estrella.tamaño,
                y
            );


            ctxGalaxia.moveTo(
                x,
                y -
                estrella.tamaño
            );


            ctxGalaxia.lineTo(
                x,
                y +
                estrella.tamaño
            );


            ctxGalaxia.stroke();
        }
    );


    ctxGalaxia.restore();
}


/* =========================================================
   17. POLVO GALÁCTICO
========================================================= */

function dibujarPolvoGalactico() {

    polvoGalaxia.forEach(
        particula => {

            particula.angulo +=
                particula.velocidad;


            const escalaY =
                0.54;


            const x =
                centroX +

                Math.cos(
                    particula.angulo
                )

                *

                particula.radio

                +

                movimientoX *
                particula.profundidad *
                20;


            const y =
                centroY +

                Math.sin(
                    particula.angulo
                )

                *

                particula.radio *
                escalaY

                +

                movimientoY *
                particula.profundidad *
                20;


            ctxGalaxia.beginPath();


            ctxGalaxia.arc(
                x,
                y,
                particula.tamaño,
                0,
                Math.PI * 2
            );


            ctxGalaxia.fillStyle =

                `rgba(
                    255,
                    198,
                    62,
                    ${particula.brillo}
                )`;


            ctxGalaxia.fill();
        }
    );
}


/* =========================================================
   18. AGUJERO NEGRO
========================================================= */

function dibujarAgujeroNegro(
    tiempo
) {

    const x =
        centroX +
        movimientoX *
        6;


    const y =
        centroY +
        movimientoY *
        6;


    ctxGalaxia.save();


    ctxGalaxia.translate(
        x,
        y
    );


    ctxGalaxia.rotate(
        tiempo *
        0.000065
    );


    /* =====================================================
       HALO EXTERIOR
    ===================================================== */

    const halo =
        ctxGalaxia.createRadialGradient(

            0,
            0,
            28,

            0,
            0,
            165
        );


    halo.addColorStop(
        0,
        "rgba(255,250,205,.98)"
    );


    halo.addColorStop(
        0.12,
        "rgba(255,220,95,.90)"
    );


    halo.addColorStop(
        0.28,
        "rgba(255,160,10,.40)"
    );


    halo.addColorStop(
        0.55,
        "rgba(255,110,0,.10)"
    );


    halo.addColorStop(
        1,
        "rgba(255,100,0,0)"
    );


    ctxGalaxia.fillStyle =
        halo;


    ctxGalaxia.beginPath();


    ctxGalaxia.ellipse(
        0,
        0,
        165,
        75,
        0,
        0,
        Math.PI * 2
    );


    ctxGalaxia.fill();


    /* =====================================================
       DISCO DE ACRECIÓN
    ===================================================== */

    for (
        let i = 0;
        i < 20;
        i++
    ) {

        ctxGalaxia.beginPath();


        ctxGalaxia.ellipse(
            0,
            0,

            72 +
            i *
            4.5,

            24 +
            i *
            2,

            0,

            0,

            Math.PI *
            2
        );


        ctxGalaxia.strokeStyle =

            `rgba(
                255,
                ${172 + i * 3},
                30,
                ${0.045 + i * 0.013}
            )`;


        ctxGalaxia.lineWidth =
            0.7 +
            (
                i % 4
            ) *
            0.18;


        ctxGalaxia.stroke();
    }


    /* =====================================================
       PARTÍCULAS DEL DISCO
    ===================================================== */

    for (
        let i = 0;
        i < 110;
        i++
    ) {

        const semilla =
            i * 12.9898;


        const angulo =
            semilla +

            tiempo *
            (
                0.00004 +
                (
                    i % 7
                ) *
                0.000003
            );


        const variacion =
            (
                Math.sin(
                    semilla *
                    4.13
                ) +
                1
            ) /
            2;


        const distancia =
            62 +
            variacion *
            98;


        const px =
            Math.cos(
                angulo
            ) *
            distancia;


        const py =
            Math.sin(
                angulo
            ) *
            distancia *
            0.32;


        const tamaño =
            0.35 +

            (
                (
                    i % 8
                ) /
                8
            ) *
            1.3;


        ctxGalaxia.beginPath();


        ctxGalaxia.arc(
            px,
            py,
            tamaño,
            0,
            Math.PI *
            2
        );


        ctxGalaxia.fillStyle =

            `rgba(
                255,
                ${175 + (i % 55)},
                ${25 + (i % 30)},
                ${0.18 + (i % 6) * 0.065}
            )`;


        ctxGalaxia.fill();
    }


    /* =====================================================
       ANILLO INTERIOR
    ===================================================== */

    ctxGalaxia.save();


    ctxGalaxia.beginPath();


    ctxGalaxia.ellipse(
        0,
        0,
        65,
        49,
        0,
        0,
        Math.PI * 2
    );


    ctxGalaxia.strokeStyle =
        "rgba(255,222,100,.72)";


    ctxGalaxia.lineWidth =
        4;


    ctxGalaxia.shadowBlur =
        18;


    ctxGalaxia.shadowColor =
        "rgba(255,188,30,.85)";


    ctxGalaxia.stroke();


    ctxGalaxia.restore();


    /* =====================================================
       CENTRO NEGRO
    ===================================================== */

    const centro =
        ctxGalaxia.createRadialGradient(

            -12,
            -10,
            4,

            0,
            0,
            61
        );


    centro.addColorStop(
        0,
        "#080808"
    );


    centro.addColorStop(
        0.45,
        "#020202"
    );


    centro.addColorStop(
        1,
        "#000000"
    );


    ctxGalaxia.fillStyle =
        centro;


    ctxGalaxia.beginPath();


    ctxGalaxia.arc(
        0,
        0,
        58,
        0,
        Math.PI *
        2
    );


    ctxGalaxia.fill();


    ctxGalaxia.restore();
}


/* =========================================================
   19. ESTRELLAS CERCANAS
========================================================= */

function dibujarEstrellasCercanas(
    tiempo
) {

    ctxGalaxia.save();


    estrellasCercanas.forEach(
        estrella => {

            /*
               Continúan moviéndose más que las
               estrellas lejanas, creando profundidad,
               pero sin exagerar el desplazamiento.
            */

            const x =
                estrella.x +

                movimientoX *
                estrella.profundidad *
                38;


            const y =
                estrella.y +

                movimientoY *
                estrella.profundidad *
                38;


            const pulso =
                0.72 +

                Math.sin(
                    tiempo *
                    0.002 +
                    estrella.fase
                )

                * 0.24;


            ctxGalaxia.beginPath();


            ctxGalaxia.arc(
                x,
                y,
                estrella.radio,
                0,
                Math.PI *
                2
            );


            ctxGalaxia.shadowBlur =
                7 +
                estrella.radio *
                3;


            ctxGalaxia.shadowColor =
                "rgba(255,205,70,.75)";


            ctxGalaxia.fillStyle =

                `rgba(
                    255,
                    222,
                    125,
                    ${
                        estrella.brillo *
                        pulso
                    }
                )`;


            ctxGalaxia.fill();
        }
    );


    ctxGalaxia.restore();
}


/* =========================================================
   20. PARALLAX 3D DE LOS RAMOS

   CORRECCIÓN PRINCIPAL:
   Reducimos desplazamiento para que los PNG no se corten,
   pero añadimos escala según profundidad.
========================================================= */

function moverRamos3D(
    tiempo
) {

    ramosUniverso.forEach(
        (ramo, indice) => {

            const profundidad =
                Number(
                    ramo.dataset.profundidad
                ) || 1;


            /*
               Antes utilizábamos aproximadamente 55px.

               Ahora el máximo es mucho menor para mantener
               el ramo dentro de la zona segura.
            */

            const desplazamientoX =
                movimientoX *
                28 *
                profundidad;


            const desplazamientoY =
                movimientoY *
                24 *
                profundidad;


            /*
               Movimiento natural independiente.
            */

            const flotacion =
                Math.sin(
                    tiempo *
                    0.001 +
                    indice *
                    1.7
                )

                * 3.5;


            /*
               Rotación ligera.
            */

            const rotacion =
                movimientoX *
                profundidad *
                -2.2;


            /*
               La profundidad ahora también se percibe
               mediante escala.

               Los ramos cercanos son ligeramente mayores.
            */

            const escalaProfundidad =
                0.94 +
                profundidad *
                0.045;


            ramo.style.translate =
                `
                ${desplazamientoX}px
                ${
                    desplazamientoY +
                    flotacion
                }px
                `;


            ramo.style.rotate =
                `${rotacion}deg`;


            ramo.style.scale =
                escalaProfundidad;
        }
    );
}


/* =========================================================
   21. PARALLAX DE LAS FRASES

   Mucho más sutil que el de los ramos.
========================================================= */

function moverFrases3D() {

    frasesUniverso.forEach(
        frase => {

            const profundidad =
                Number(
                    frase.dataset.profundidad
                ) || 0.3;


            const x =
                movimientoX *
                12 *
                profundidad;


            const y =
                movimientoY *
                12 *
                profundidad;


            frase.style.translate =
                `${x}px ${y}px`;
        }
    );
}


/* =========================================================
   22. LOOP DEL UNIVERSO FINAL
========================================================= */

function animarGalaxia(
    tiempo = 0
) {

    if (
        !universoCorriendo
    ) {
        return;
    }


    /* =====================================================
       MOVIMIENTO SUAVE

       El valor 0.05 hace que la cámara tenga cierta
       "inercia" y no siga el dedo bruscamente.
    ===================================================== */

    movimientoX +=
        (
            objetivoX -
            movimientoX
        ) *
        0.05;


    movimientoY +=
        (
            objetivoY -
            movimientoY
        ) *
        0.05;


    /* =====================================================
       CAPAS DEL UNIVERSO
    ===================================================== */

    dibujarFondoGalaxia();


    dibujarEstrellasGalaxia(
        tiempo
    );


    dibujarDestellos(
        tiempo
    );


    dibujarPolvoGalactico();


    dibujarAgujeroNegro(
        tiempo
    );


    dibujarEstrellasCercanas(
        tiempo
    );


    /* =====================================================
       CÁMARA 3D GENERAL

       Reducimos un poco la inclinación respecto
       a la versión anterior.

       El resultado sigue siendo 3D pero ya no empuja
       tanto los extremos fuera de pantalla.
    ===================================================== */

    const inclinacionY =
        movimientoX *
        -4.5;


    const inclinacionX =
        movimientoY *
        4;


    camaraUniverso.style.transform =
        `
        perspective(1000px)

        translate3d(
            ${movimientoX * 6}px,
            ${movimientoY * 6}px,
            0
        )

        rotateY(
            ${inclinacionY}deg
        )

        rotateX(
            ${inclinacionX}deg
        )
        `;


    /* =====================================================
       RAMOS Y FRASES
    ===================================================== */

    moverRamos3D(
        tiempo
    );


    moverFrases3D();


    requestAnimationFrame(
        animarGalaxia
    );
}


/* =========================================================
   23. MOVIMIENTO DEL UNIVERSO
========================================================= */

function moverUniverso(
    clienteX,
    clienteY
) {

    const normalX =
        clienteX /
        window.innerWidth -
        0.5;


    const normalY =
        clienteY /
        window.innerHeight -
        0.5;


    /*
       El movimiento continúa siendo contrario al dedo
       para producir la sensación de mover la cámara.
    */

    objetivoX =
        normalX *
        -1.10;


    objetivoY =
        normalY *
        -1.10;


    /*
       CORRECCIÓN:
       Reducimos el máximo de ±0.65 a ±0.52.

       Esto ayuda muchísimo a evitar que los elementos
       cercanos desaparezcan por los bordes.
    */

    objetivoX =
        Math.max(
            -0.52,
            Math.min(
                0.52,
                objetivoX
            )
        );


    objetivoY =
        Math.max(
            -0.52,
            Math.min(
                0.52,
                objetivoY
            )
        );
}


/* =========================================================
   24. CONTROL TÁCTIL
========================================================= */

universoFinal.addEventListener(

    "touchmove",

    evento => {

        if (
            evento.touches.length === 0
        ) {
            return;
        }


        evento.preventDefault();


        const dedo =
            evento.touches[0];


        moverUniverso(
            dedo.clientX,
            dedo.clientY
        );
    },

    {
        passive: false
    }
);


/* =========================================================
   25. TOUCH START

   Hace que el universo empiece a reaccionar
   inmediatamente al poner el dedo.
========================================================= */

universoFinal.addEventListener(

    "touchstart",

    evento => {

        if (
            evento.touches.length === 0
        ) {
            return;
        }


        const dedo =
            evento.touches[0];


        moverUniverso(
            dedo.clientX,
            dedo.clientY
        );
    },

    {
        passive: true
    }
);


/* =========================================================
   26. INERCIA AL LEVANTAR EL DEDO
========================================================= */

universoFinal.addEventListener(

    "touchend",

    () => {

        /*
           No vuelve inmediatamente al centro.
           Conserva un poco de la posición final.
        */

        objetivoX *=
            0.38;


        objetivoY *=
            0.38;
    }
);


/* =========================================================
   27. CONTROL CON MOUSE

   Sirve para probarlo desde Chrome / VS Code.
========================================================= */

universoFinal.addEventListener(

    "mousemove",

    evento => {

        moverUniverso(
            evento.clientX,
            evento.clientY
        );
    }
);


universoFinal.addEventListener(

    "mouseleave",

    () => {

        objetivoX = 0;

        objetivoY = 0;
    }
);


/* =========================================================
   28. BOTÓN "TOCA AQUÍ"
========================================================= */

btnSorpresa.addEventListener(
    "click",
    abrirUniversoFinal
);


function abrirUniversoFinal() {

    /*
       Evita múltiples clics.
    */

    btnSorpresa.disabled =
        true;


    /*
       Ocultamos la pantalla anterior.
    */

    final.classList.remove(
        "activa"
    );


    setTimeout(
        () => {

            universoFinal.classList.add(
                "activo"
            );


            universoFinal.setAttribute(
                "aria-hidden",
                "false"
            );


            /*
               Posición inicial completamente centrada.
            */

            objetivoX = 0;

            objetivoY = 0;

            movimientoX = 0;

            movimientoY = 0;


            /*
               Construimos el universo con las dimensiones
               reales del dispositivo.
            */

            ajustarGalaxia();


            universoCorriendo =
                true;


            requestAnimationFrame(
                animarGalaxia
            );

        },
        800
    );
}


/* =========================================================
   29. RESIZE / ROTACIÓN / CAMBIO DE VIEWPORT
========================================================= */

let temporizadorResize = null;


window.addEventListener(
    "resize",
    () => {

        /*
           Evitamos reconstruir la galaxia decenas de veces
           mientras Chrome cambia el viewport.
        */

        clearTimeout(
            temporizadorResize
        );


        temporizadorResize =
            setTimeout(
                () => {

                    ajustarCanvas();


                    if (
                        universoCorriendo
                    ) {

                        ajustarGalaxia();
                    }

                },
                150
            );
    }
);


/* =========================================================
   30. ORIENTATION CHANGE
========================================================= */

window.addEventListener(
    "orientationchange",
    () => {

        setTimeout(
            () => {

                ajustarCanvas();


                if (
                    universoCorriendo
                ) {

                    ajustarGalaxia();
                }

            },
            300
        );
    }
);


/* =========================================================
   31. EVITAR MENÚ CONTEXTUAL
========================================================= */

universoFinal.addEventListener(

    "contextmenu",

    evento => {

        evento.preventDefault();

    }
);


/* =========================================================
   32. EVITAR ARRASTRAR LAS IMÁGENES
========================================================= */

document
    .querySelectorAll("img")
    .forEach(
        imagen => {

            imagen.addEventListener(
                "dragstart",
                evento => {

                    evento.preventDefault();

                }
            );
        }
    );


/* =========================================================
   33. PRECARGAR ASSETS

   Así reducimos la posibilidad de que Nayelly llegue
   a una pantalla y una flor tarde en aparecer.
========================================================= */

const assetsPrecargar = [

    "assets/girasol.png",

    "assets/rosa_amarilla.png",

    "assets/estrella_dorada.png",

    "assets/ramo_girasoles.png",

    "assets/ramo_rosas_amarillas.png",

    "assets/ramo_mixto.png"

];


assetsPrecargar.forEach(
    ruta => {

        const imagen =
            new Image();


        imagen.src =
            ruta;
    }
);


/* =========================================================
   34. INICIAR EXPERIENCIA
========================================================= */

ajustarCanvas();

animarUniversoInicial();