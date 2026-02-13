const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// STARFIELD
const stars = 800;
const colorrange = [0, 60, 240];
const starArray = [];
function getRandom(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
for(let i=0;i<stars;i++){
    starArray.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        radius:Math.random()*1.5,
        hue:colorrange[getRandom(0,colorrange.length-1)],
        sat:getRandom(50,100),
        opacity:Math.random()
    });
}

// TEXT
let frame=0, opacity=0, secondOpacity=0, thirdOpacity=0;

// HEART
let heartParticles=[];
const heartCount=3000;
let heartAngle=0, heartVisible=false;

function heartShape(t,layer){
    const scale=12;
    return {x:scale*16*Math.pow(Math.sin(t),3),y:-scale*(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t)),z:layer};
}
function createHeart(){
    heartParticles=[];
    const layers=30;
    const perLayer=Math.floor(heartCount/layers);
    for(let l=0;l<layers;l++){
        let z=(l/layers-0.5)*150;
        for(let i=0;i<perLayer;i++){
            let t=(i/perLayer)*Math.PI*2;
            let pos=heartShape(t,z);
            let scale=Math.random();
            heartParticles.push({
                currentX:(Math.random()-0.5)*canvas.width*2,
                currentY:(Math.random()-0.5)*canvas.height*2,
                currentZ:(Math.random()-0.5)*1000,
                targetX:pos.x*scale,
                targetY:pos.y*scale,
                targetZ:pos.z+(Math.random()-0.5)*20
            });
        }
    }
}
createHeart();

function drawStars(){
    for(let s of starArray){
        ctx.beginPath();
        ctx.arc(s.x,s.y,s.radius,0,Math.PI*2);
        ctx.fillStyle=`hsla(${s.hue},${s.sat}%,88%,${s.opacity})`;
        ctx.fill();
        if(Math.random()>0.99) s.opacity=Math.random();
    }
}

function drawHeart(){
    heartAngle+=0.008;
    const cos=Math.cos(heartAngle), sin=Math.sin(heartAngle);
    const sorted=heartParticles.slice().sort((a,b)=> (a.targetX*sin+a.targetZ*cos)-(b.targetX*sin+b.targetZ*cos));
    for(let p of sorted){
        p.currentX+=(p.targetX-p.currentX)*0.03;
        p.currentY+=(p.targetY-p.currentY)*0.03;
        p.currentZ+=(p.targetZ-p.currentZ)*0.03;

        let x=p.currentX*cos-p.currentZ*sin;
        let z=p.currentX*sin+p.currentZ*cos;
        let scaleFactor=250/(250+z);
        let px=x*scaleFactor+canvas.width/2;
        let py=p.currentY*scaleFactor+canvas.height/2;
        let size=scaleFactor*2.5;
        let brightness=Math.max(0.3,Math.min(1,scaleFactor));
        ctx.fillStyle=`rgba(255,150,200,${brightness*0.8})`;
        ctx.fillRect(px,py,size,size);
    }
}

function drawText(){
    const fontSize=Math.min(30,canvas.width/24), lineHeight=8;
    ctx.font=`${fontSize}px Comic Sans MS`;
    ctx.textAlign="center";
    ctx.shadowColor="rgba(255,100,200,1)";
    ctx.shadowBlur=10;

    // First line
    if(frame<300){ctx.fillText("everyday day I cannot believe how lucky I am",canvas.width/2,canvas.height/2);opacity+=0.0067;}
    if(frame>=300 && frame<600){ctx.fillText("everyday day I cannot believe how lucky I am",canvas.width/2,canvas.height/2);}
    if(frame>=600 && frame<900){ctx.fillText("everyday day I cannot believe how lucky I am",canvas.width/2,canvas.height/2);opacity-=0.0067;}
    if(frame==900) opacity=0;

    // Second line
    if(frame>900 && frame<1200){
        if(canvas.width<600) ctx.fillText("amongst trillions and trillions of stars,\nover billions of years",canvas.width/2,canvas.height/2);
        else ctx.fillText("amongst trillions and trillions of stars, over billions of years",canvas.width/2,canvas.height/2);
        opacity+=0.0067;
    }
    if(frame>=1200 && frame<1500){
        if(canvas.width<600) ctx.fillText("amongst trillions and trillions of stars,\nover billions of years",canvas.width/2,canvas.height/2);
        else ctx.fillText("amongst trillions and trillions of stars, over billions of years",canvas.width/2,canvas.height/2);
    }
    if(frame>=1500 && frame<1800){opacity-=0.0067;}
    if(frame==1800) opacity=0;

    // Third line
    if(frame>1800 && frame<2100){ctx.fillText("to be alive, and to get to spend this life with you",canvas.width/2,canvas.height/2);opacity+=0.0067;}
    if(frame>=2100 && frame<2400) ctx.fillText("to be alive, and to get to spend this life with you",canvas.width/2,canvas.height/2);
    if(frame>=2400 && frame<2700){ctx.fillText("to be alive, and to get to spend this life with you",canvas.width/2,canvas.height/2);opacity-=0.0067;}
    if(frame==2700) opacity=0;

    // Fourth line
    if(frame>2700 && frame<3000){ctx.fillText("is so incredibly, unfathomably unlikely",canvas.width/2,canvas.height/2);opacity+=0.0067;}
    if(frame>=3000 && frame<3300) ctx.fillText("is so incredibly, unfathomably unlikely",canvas.width/2,canvas.height/2);
    if(frame>=3300 && frame<3600){ctx.fillText("is so incredibly, unfathomably unlikely",canvas.width/2,canvas.height/2);opacity-=0.0067;}
    if(frame==3600) opacity=0;

    // Fifth line
    if(frame>3600 && frame<3900){ctx.fillText("and yet here I am to get the impossible chance to get to know you",canvas.width/2,canvas.height/2);opacity+=0.0067;}
    if(frame>=3900 && frame<4200) ctx.fillText("and yet here I am to get the impossible chance to get to know you",canvas.width/2,canvas.height/2);
    if(frame>=4200 && frame<4500){ctx.fillText("and yet here I am to get the impossible chance to get to know you",canvas.width/2,canvas.height/2);opacity-=0.0067;}
    if(frame==4500) opacity=0;

    if(frame>4500){
        ctx.fillStyle=`rgba(255,150,200,${secondOpacity})`;
        ctx.fillText("I love you so much Dalal, more than all the time and space in the universe can contain",canvas.width/2,canvas.height*0.18);
        if(secondOpacity<1) secondOpacity+=0.0067;
    }

    if(frame>4800){
        ctx.fillStyle=`rgba(255,150,200,${thirdOpacity})`;
        ctx.fillText("and I can't wait to spend all the time in the world to share that love with you!",canvas.width/2,canvas.height*0.18+60);
        if(thirdOpacity<1) thirdOpacity+=0.0067;
    }

    if(frame>4980) heartVisible=true;
    ctx.shadowBlur=0;
}

function animate(){
    ctx.fillStyle="rgba(0,0,0,0.25)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    drawStars();
    drawText();
    if(heartVisible) drawHeart();
    frame++;
    requestAnimationFrame(animate);
}
animate();
