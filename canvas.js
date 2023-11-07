// let canvas = document.querySelector('canvas');
 
// const c = canvas.getContext('2d');
 
// canvas.width = innerWidth;
// canvas.height = innerHeight;

// const mouse = {
//     x : innerWidth/2 ,
//     y : innerHeight/2
// }

// function randomRGB(){
//     const r = Math.floor(Math.random() * 255);
//     const g = Math.floor(Math.random() * 255);
//     const b = Math.floor(Math.random() * 255);

//     const color = `rgb(${r}, ${g}, ${b})`;
//     return color;
// }

// addEventListener('resize' , (event)=> {
//     canvas.width = innerWidth;
//     canvas.height = innerHeight;
// })

// const gravity = 0.03;
// const friction = 0.99;

// // objects
// class Particle {
//     constructor(x, y, radius, color,velocity){
//         this.x = x;
//         this.y = y;
//         this.radius = radius;
//         this.color = color; 
//         this.velocity = velocity;
//         this.alpha = 1;
//     }

//     draw(){
//        c.save();
//        c.globalAlpha = this.alpha;
//        c.beginPath();
//        c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
//        c.fillStyle = this.color;
//        c.fill();
//        c.closePath(); 
//        c.restore();
//     //    c.font = "30px Arial";
//     //    c.strokeText("Hello World", 50, 50);

//     }

//     update(){
//         this.draw();
//         this.velocity.x *= friction;
//         this.velocity.y *= friction;
//         this.velocity.y += gravity;
//         this.x += this.velocity.x;
//         this.y += this.velocity.y;
//         this.alpha -= 0.005;

//     }
// }

// let particles;

// function init(){
//     particles = [];
// }

// function animate(){
//     requestAnimationFrame(animate);
//     c.fillStyle = 'rgba(0, 0, 0, 0.05)'
//     c.fillRect(0 ,0 ,canvas.width , canvas.height)
//     particles.forEach((particle , i) => {
//         if (particle.alpha > 0){
//             particle.update();

//         }
//         else{
//             particles.splice(i,1)
//         }
//     });
// }

// init();
// animate();

// addEventListener('click' , (event)=>{
// mouse.x = event.clientX;
// mouse.y = event.clientY;

// const particleCount  = 400;
// const angleIncrement = Math.PI * 2 / particleCount;
// const power = 10;

// for( let i = 0; i < particleCount ; i++){
//     particles.push( new Particle(mouse.x , mouse.y , Math.random()*4 , randomRGB() ,{
//         x :Math.cos(angleIncrement*i) * Math.random()*power,
//         y :Math.sin(angleIncrement*i) * Math.random()*power
//     }))
// }
// })

let canvas = document.querySelector('canvas');
let alpha=0;
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};
let allowed=true;

function randomRGB() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    return `rgb(${r}, ${g}, ${b})`;
}

function pickRandomColor() {
    const colors = [`rgba(0,255,0,${0.1})`,`rgba(0,255,255,${0.1})`];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const gravity = 0.03;
const friction = 0.99;
let img = new Image();
img.src = './candle.png';
const event1=new CustomEvent("loaded");
img.onload = function() {
document.dispatchEvent(event1)
};

class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }

    draw() {
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
        c.restore();
    }

    update() {
        this.draw();
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.velocity.y += gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.005;
    }
}

let particles = [];
let displayText = "";
let clickTime = 0;

function init() {
    particles = [];
    displayText = "";
}
let frame=0
let screenPainted=false;
let write = false;
function animate() {
    requestAnimationFrame(animate);
frame++;
    c.font = "20px Arial";
    c.fillStyle = "white";
    c.fillText("Click at the Center ....", 15, 50);

    c.fillStyle = 'rgba(0, 0, 0, 0.048)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, i) => {
        if (particle.alpha > 0) {
            particle.update();
            write = false;
        } else {
            particles.splice(i, 1);
            write = true;
        }
    });
    if(write){
        c.font = "35px Merriweather";
        c.fillStyle = pickRandomColor();
        c.drawImage(img,mouse.x-150,mouse.y-200,57.7*5,43.3*5)
        c.fillText(displayText, mouse.x - 100, mouse.y);
        c.globalAlpha = 1; 
    }
    // Display text smoothly over time
    if (displayText !== "" && Date.now() - clickTime > 500) {
        console.log("hello")
        c.font = "35px Merriweather";
        c.fillStyle = pickRandomColor();
        // c.globalAlpha = Math.min(1, (Date.now() - clickTime) / 500);
        // c.globalAlpha=1*frame/frameAdjuster-1
//         if(c.globalAlpha>0.1&&!screenPainted)
// {
//     screenPainted=false
// }   
        // Reset global alpha
    }
}

init();
document.addEventListener("loaded",()=>{
animate();

})
let frameAdjuster=0
addEventListener('click', (event) => {
    c.fillStyle = 'rgba(0, 0, 0, 1)';
    c.globalAlpha = 1;
    c.fillRect(0,0,canvas.width,canvas.height);

    mouse.x = event.clientX;
    mouse.y = event.clientY;
frameAdjuster=frame;
screenPainted=false
    const particleCount = Math.random()*1000;
    const angleIncrement = (Math.PI * 2) / particleCount;
    const power = 10;

if(allowed){
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(mouse.x, mouse.y, Math.random() * 4, randomRGB(), {
            x: Math.cos(angleIncrement * i) * Math.random() * power,
            y: Math.sin(angleIncrement * i) * Math.random() * power
        }));
    }

    // Set the text to be displayed
    displayText = "Happy Diwali !";

    // Record the click time
    allowed=false

    clickTime = Date.now();
    setTimeout(()=>{
        particles=[];
        
    allowed=true;
    },3500)}

});

