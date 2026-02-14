const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// STARFIELD
const stars = 200; // reduced from 800
const starArray = [];
for(let i=0;i<stars;i++){
    starArray.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        r:Math.random()*1.5,
        opacity:Math.random()
    });
}

// HEART
let heartParticles=[];
const heartCount = 300; // reduced from 3000
let heartAngle = 0, heartVisible=false;

// TEXT
let frame=0, opacity=0, secondOpacity=0, thirdOpacity=0;

function heartShape(t,scale=12){
    return {
        x: scale*16*Math.pow(Math.sin(t),3),
        y: -scale*(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))
    };
}

function createHeart(){
    heartParticles=[];
    for(let i=0;i<heartCount;i++){
        let t = Math.random() * Math.PI*2;
        let pos = heartShape(t,Math.random()*12+6);
        heartParticles.push({
            cx: Math.random()*canvas.width,
            cy: Math.random()*canvas.height,
            tx: pos.x,
            ty: pos.y
        });
    }
}
createHeart();

function drawStars(){
    ctx.fillStyle="rgba(0,0,0,0.2)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    for(let s of starArray){
        ctx.beginPath();
        ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,255,255,${s.opacity})`;
        ctx.fill();
        s.opacity += (Math.random()-0.5)*0.02;
        if(s.opacity<0) s.opacity=0;
        if(s.opacity>1) s.opacity=1;
    }
}

function drawHeart(){
    heartAngle += 0.01;
    const cos = Math.cos(heartAngle), sin = Math.sin(heartAngle);
    for(let p of heartParticles){
        p.cx += (p.tx - p.cx) * 0.05;
        p.cy += (p.ty - p.cy) * 0.05;
        let x = p.cx*cos - p.cy*sin + canvas.width/2;
        let y = p.cy + canvas.height/2;
        ctx.beginPath();
        ctx.arc(x,y,3,0,Math.PI*2);
        ctx.fillStyle="rgba(255,150,200,0.8)";
        ctx.fill();
    }
}

function drawText(){
    ctx.font = `${Math.min(30,canvas.width/24)}px Comic Sans MS`;
    ctx.textAlign="center";
    ctx.shadowColor="rgba(255,100,200,1)";
    ctx.shadowBlur=10;

    if(frame<300){ctx.fillText("everyday day I cannot believe how lucky I am",canvas.width/2,canvas.height/2); opacity+=0.01;}
    if(frame>4500){
        ctx.fillStyle=`rgba(255,150,200,${secondOpacity})`;
        ctx.fillText("I love you so much Dalal",canvas.width/2,canvas.height*0.2);
        if(secondOpacity<1) secondOpacity+=0.01;
        ctx.fillStyle=`rgba(255,150,200,${thirdOpacity})`;
        ctx.fillText("and I can't wait to spend all the time in the world!",canvas.width/2,canvas.height*0.3);
        if(thirdOpacity<1) thirdOpacity+=0.01;
        heartVisible = true;
    }
}

function animate(){
    drawStars();
    drawText();
    if(heartVisible) drawHeart();
    frame++;
    requestAnimationFrame(animate);
}
animate();
