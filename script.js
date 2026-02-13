var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");

// STARFIELD
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// initialize stars
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

// TEXT TIMING
var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

// 3D HEART
var heartParticles = [];
var heartCount = 2000;
var heartAngle = 0;
var heartVisible = false;

function heartShape(t, scale = 12) {

    return {

        x: scale * 16 * Math.pow(Math.sin(t), 3),

        y: scale * (
            13 * Math.cos(t)
            - 5 * Math.cos(2*t)
            - 2 * Math.cos(3*t)
            - Math.cos(4*t)
        )
    };
}

function createHeart() {

    heartParticles = [];

    for (let i = 0; i < heartCount; i++) {

        let t = Math.random() * Math.PI * 2;
        let pos = heartShape(t);

        heartParticles.push({

            x: pos.x,
            y: pos.y,
            z: (Math.random() - 0.5) * 200

        });
    }
}

createHeart();

// DRAW STARS
function drawStars() {

    for (var star of starArray) {

        context.beginPath();

        context.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );

        context.fillStyle =
        "hsla(" +
        star.hue +
        "," +
        star.sat +
        "%,88%," +
        star.opacity +
        ")";

        context.fill();

        if (Math.random() > 0.99) {
            star.opacity = Math.random();
        }
    }
}

// DRAW HEART
function drawHeart() {

    heartAngle += 0.01;

    let cos = Math.cos(heartAngle);
    let sin = Math.sin(heartAngle);

    for (let p of heartParticles) {

        let x = p.x * cos - p.z * sin;
        let z = p.x * sin + p.z * cos;

        let scale = 300 / (300 + z);

        let px = x * scale + canvas.width / 2;
        let py = p.y * scale + canvas.height / 2;

        let size = scale * 3;

        context.fillStyle =
        "rgba(255, 80, 160," + scale + ")";

        context.fillRect(px, py, size, size);
    }
}

// TEXT LINE BREAK FUNCTION
function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {

    lines.forEach((line, index) => {

        context.fillText(
            line,
            x,
            y + index * (fontSize + lineHeight)
        );
    });
}

// DRAW TEXT
function drawText() {

    var fontSize = Math.min(30, canvas.width / 24);
    var lineHeight = 8;

    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";

    context.shadowColor = "rgba(255,100,200,1)";
    context.shadowBlur = 10;

    context.fillStyle =
    "rgba(255,150,200," + opacity + ")";

    if(frameNumber < 250){

        context.fillText(
        "everyday day I cannot believe how lucky I am",
        canvas.width/2,
        canvas.height/2);

        opacity += 0.01;
    }

    if(frameNumber >= 250 && frameNumber < 500){

        context.fillText(
        "everyday day I cannot believe how lucky I am",
        canvas.width/2,
        canvas.height/2);

        opacity -= 0.01;
    }

    if(frameNumber == 500) opacity = 0;

    if(frameNumber > 500 && frameNumber < 750){

        if (canvas.width < 600){

            drawTextWithLineBreaks(
            [
            "amongst trillions and trillions of stars,",
            "over billions of years"
            ],
            canvas.width/2,
            canvas.height/2,
            fontSize,
            lineHeight);

        } else {

            context.fillText(
            "amongst trillions and trillions of stars, over billions of years",
            canvas.width/2,
            canvas.height/2);
        }

        opacity += 0.01;
    }

    if(frameNumber >= 750 && frameNumber < 1000){

        opacity -= 0.01;
    }

    if(frameNumber == 1000) opacity = 0;

    if(frameNumber > 1000 && frameNumber < 1250){

        context.fillText(
        "to be alive, and to get to spend this life with you",
        canvas.width/2,
        canvas.height/2);

        opacity += 0.01;
    }

    if(frameNumber >= 1250 && frameNumber < 1500){

        opacity -= 0.01;
    }

    if(frameNumber == 1500) opacity = 0;

    if(frameNumber > 1500 && frameNumber < 1750){

        context.fillText(
        "is so incredibly, unfathomably unlikely",
        canvas.width/2,
        canvas.height/2);

        opacity += 0.01;
    }

    if(frameNumber >= 1750 && frameNumber < 2000){

        opacity -= 0.01;
    }

    if(frameNumber == 2000) opacity = 0;

    if(frameNumber > 2000 && frameNumber < 2250){

        context.fillText(
        "and yet here I am to get the impossible chance to get to know you",
        canvas.width/2,
        canvas.height/2);

        opacity += 0.01;
    }

    if(frameNumber >= 2250 && frameNumber < 2500){

        opacity -= 0.01;
    }

    if(frameNumber == 2500) opacity = 0;

    if(frameNumber > 2500){

        context.fillStyle =
        "rgba(255,150,200," + secondOpacity + ")";

        context.fillText(
        "I love you so much Dalal, more than all the time and space in the universe can contain",
        canvas.width/2,
        canvas.height/2);

        secondOpacity += 0.01;
    }

    if(frameNumber > 2750){

        context.fillStyle =
        "rgba(255,150,200," + thirdOpacity + ")";

        context.fillText(
        "and I can't wait to spend all the time in the world to share that love with you!",
        canvas.width/2,
        canvas.height/2 + 60);

        thirdOpacity += 0.01;
    }

    if(frameNumber > 3000){

        context.fillText(
        "Happy Valentine's Day <3",
        canvas.width/2,
        canvas.height/2 + 120);

        heartVisible = true;
    }

    context.shadowBlur = 0;
}

// MAIN LOOP
function draw() {

    context.fillStyle = "rgba(0,0,0,0.25)";
    context.fillRect(0,0,canvas.width,canvas.height);

    drawStars();
    drawText();

    if(heartVisible){

        drawHeart();
    }

    frameNumber++;

    requestAnimationFrame(draw);
}

draw();

// RESIZE
window.addEventListener("resize", function(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});
