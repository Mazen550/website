<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Heart Animation</title>

<style>
html, body {
    margin: 0;
    padding: 0;
    background: black;
    overflow: hidden;
    font-family: Arial, sans-serif;
}

canvas {
    position: absolute;
    top: 0;
    left: 0;
}

#textContainer {
    position: absolute;
    top: 20%;
    width: 100%;
    text-align: center;
    color: white;
    font-size: 40px;
    font-weight: 300;
    opacity: 0;
    transition: opacity 2.5s ease;
    pointer-events: none;
}
</style>
</head>

<body>

<canvas id="starfield"></canvas>
<div id="textContainer"></div>

<script>
// ======================
// CANVAS SETUP
// ======================
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// ======================
// STARFIELD
// ======================
const stars = [];
for (let i = 0; i < 600; i++) {
    stars.push({
        x: Math.random() * canvas.width - canvas.width/2,
        y: Math.random() * canvas.height - canvas.height/2,
        z: Math.random() * canvas.width
    });
}

function drawStars() {

    for (let star of stars) {

        star.z -= 0.4;

        if (star.z <= 0)
            star.z = canvas.width;

        let k = 128 / star.z;

        let x = star.x * k + canvas.width/2;
        let y = star.y * k + canvas.height/2;

        let size = (1 - star.z / canvas.width) * 2;

        ctx.fillStyle = "white";
        ctx.fillRect(x, y, size, size);
    }
}

// ======================
// 3D CLOSED HEART
// ======================
let heart = [];
let angleY = 0;
let angleX = -0.3; // fixes upside-down issue

function createHeart() {

    heart = [];

    const layers = 35;
    const points = 200;

    for (let l = 0; l < layers; l++) {

        let depth = (l - layers/2) * 3;

        for (let i = 0; i < points; i++) {

            let t = (i / points) * Math.PI * 2;

            let x = 16 * Math.pow(Math.sin(t), 3);
            let y =
                13 * Math.cos(t)
                - 5 * Math.cos(2*t)
                - 2 * Math.cos(3*t)
                - Math.cos(4*t);

            heart.push({
                x: x * 10,
                y: -y * 10,
                z: depth
            });
        }
    }
}

createHeart();

function drawHeart() {

    angleY += 0.01;

    let cosY = Math.cos(angleY);
    let sinY = Math.sin(angleY);

    let cosX = Math.cos(angleX);
    let sinX = Math.sin(angleX);

    for (let p of heart) {

        // rotate Y
        let x = p.x * cosY - p.z * sinY;
        let z = p.x * sinY + p.z * cosY;

        // rotate X
        let y = p.y * cosX - z * sinX;
        z = p.y * sinX + z * cosX;

        let scale = 400 / (400 + z);

        let px = x * scale + canvas.width/2;
        let py = y * scale + canvas.height * 0.65; // lower so text doesn't overlap

        let size = scale * 3;

        ctx.fillStyle = "rgba(255,80,160," + scale + ")";
        ctx.fillRect(px, py, size, size);
    }
}

// ======================
// TEXT FADE SYSTEM
// ======================
const messages = [
    "Hi",
    "I just wanted to tell you something",
    "You are very special",
    "And this heart is for you ❤️"
];

let textIndex = 0;
const textDiv = document.getElementById("textContainer");

function showNextText() {

    textDiv.style.opacity = 0;

    setTimeout(() => {

        textDiv.innerHTML = messages[textIndex];
        textDiv.style.opacity = 1;

        textIndex++;

    }, 2500);

    if (textIndex < messages.length)
        setTimeout(showNextText, 7000);
}

// start text after delay
setTimeout(showNextText, 2000);

// ======================
// MAIN LOOP
// ======================
function animate() {

    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawStars();
    drawHeart();

    requestAnimationFrame(animate);
}

animate();

</script>

</body>
</html>
