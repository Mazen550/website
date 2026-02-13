var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");

var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

// HEART PARTICLES
var heartParticles = [];
var heartParticleCount = 1800;
var heartActive = false;

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize stars
for (var i = 0; i < stars; i++) {

    starArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2,
        hue: colorrange[getRandom(0, colorrange.length - 1)],
        sat: getRandom(50, 100),
        opacity: Math.random()
    });
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

var baseFrame = context.getImageData(0, 0, canvas.width, canvas.height);

// HEART SHAPE FUNCTION
function heartShape(t, scale = 14) {

    return {

        x: scale * 16 * Math.pow(Math.sin(t), 3),

        y: -scale * (
            13 * Math.cos(t)
            - 5 * Math.cos(2*t)
            - 2 * Math.cos(3*t)
            - Math.cos(4*t)
        )
    };
}

// CREATE HEART
function createHeart() {

    heartParticles = [];

    for (let i = 0; i < heartParticleCount; i++) {

        let t = Math.random() * Math.PI * 2;

        let pos = heartShape(t);

        heartParticles.push({

            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,

            targetX: canvas.width/2 + pos.x,
            targetY: canvas.height/2 + pos.y,

            vx: 0,
            vy: 0
        });
    }
}

// DRAW HEART
function drawHeart() {

    for (let p of heartParticles) {

        let dx = p.targetX - p.x;
        let dy = p.targetY - p.y;

        p.vx += dx * 0.002;
        p.vy += dy * 0.002;

        p.vx *= 0.92;
        p.vy *= 0.92;

        p.x += p.vx;
        p.y += p.vy;

        context.fillStyle = "rgb(255,120,180)";
        context.fillRect(p.x, p.y, 2, 2);
    }
}

function drawStars() {

    for (var i = 0; i < stars; i++) {

        var star = starArray[i];

        context.beginPath();

        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

        context.fillStyle =
        "hsla(" + star.hue + "," + star.sat + "%,88%," + star.opacity + ")";

        context.fill();
    }
}

function updateStars() {

    for (var i = 0; i < stars; i++) {

        if (Math.random() > 0.99) {

            starArray[i].opacity = Math.random();
        }
    }
}

function drawText() {

    var fontSize = Math.min(30, canvas.width / 24);

    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";

    context.shadowColor = "rgba(255,100,200,1)";
    context.shadowBlur = 10;

    if(frameNumber < 250){

        context.fillStyle = `rgba(255,150,200,${opacity})`;

        context.fillText(
        "everyday I cannot believe how lucky I am",
        canvas.width/2,
        canvas.height/2);

        opacity += 0.01;
    }

    if(frameNumber >= 250 && frameNumber < 500){

        context.fillStyle = `rgba(255,150,200,${opacity})`;

        context.fillText(
        "everyday I cannot believe how lucky I am",
        canvas.width/2,
        canvas.height/2);

        opacity -= 0.01;
    }

    if(frameNumber == 500) opacity = 0;

    if(frameNumber > 500 && frameNumber < 750){

        context.fillStyle = `rgba(255,150,200,${opacity})`;

        context.fillText(
        "amongst trillions of stars, over billions of years",
        canvas.width/2,
        canvas.height/2);

        opacity += 0.01;
    }

    if(frameNumber >= 750 && frameNumber < 1000){

        context.fillStyle = `rgba(255,150,200,${opacity})`;

        context.fillText(
        "amongst trillions of stars, over billions of years",
        canvas.width/2,
        canvas.height/2);

        opacity -= 0.01;
    }

    if(frameNumber == 1000) opacity = 0;

    if(frameNumber > 1000 && frameNumber < 1250){

        context.fillStyle = `rgba(255,150,200,${opacity})`;

        context.fillText(
        "to be alive and spend this life with you",
        canvas.width/2,
        canvas.height/2);

        opacity += 0.01;
    }

    if(frameNumber >= 1250 && frameNumber < 1500){

        context.fillStyle = `rgba(255,150,200,${opacity})`;

        context.fillText(
        "to be alive and spend this life with you",
        canvas.width/2,
        canvas.height/2);

        opacity -= 0.01;
    }

    if(frameNumber == 1500) opacity = 0;

    if(frameNumber > 1500 && frameNumber < 1750){

        context.fillStyle = `rgba(255,150,200,${opacity})`;

        context.fillText(
        "is unbelievably unlikely",
        canvas.width/2,
        canvas.height/2);

        opacity += 0.01;
    }

    if(frameNumber >= 1750 && frameNumber < 2000){

        context.fillStyle = `rgba(255,150,200,${opacity})`;

        context.fillText(
        "is unbelievably unlikely",
        canvas.width/2,
        canvas.height/2);

        opacity -= 0.01;
    }

    if(frameNumber == 2000) opacity = 0;

    if(frameNumber > 2000 && frameNumber < 2300){

        context.fillStyle = `rgba(255,150,200,${opacity})`;

        context.fillText(
        "and yet here I am",
        canvas.width/2,
        canvas.height/2);

        opacity += 0.01;
    }

    if(frameNumber > 2300 && frameNumber < 2600){

        context.fillStyle = `rgba(255,150,200,${secondOpacity})`;

        context.fillText(
        "I love you ❤️",
        canvas.width/2,
        canvas.height/2 + 50);

        secondOpacity += 0.01;
    }

    if(frameNumber > 2600){

        heartActive = true;
    }

    context.shadowBlur = 0;
}

function draw() {

    context.fillStyle = "rgba(0,0,0,0.3)";
    context.fillRect(0,0,canvas.width,canvas.height);

    drawStars();
    updateStars();
    drawText();

    if(heartActive){

        if(heartParticles.length === 0){

            createHeart();
        }

        drawHeart();
    }

    frameNumber++;

    requestAnimationFrame(draw);
}

draw();

window.addEventListener("resize", function(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

