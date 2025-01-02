const canvas = document.createElement("canvas");
canvas.id = "particleCanvas";
document.body.appendChild(canvas);

const canvasStyle = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1; 
    pointer-events: none; 
`;
canvas.setAttribute("style", canvasStyle);

const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

const particles = [];

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height - Math.random() * 80;
        this.radius = Math.random() * 3 + 1;
        this.speed = Math.random() * 3 + 3; 
        this.opacity = Math.random() * 0.9 + 0.1;
        this.wind = (Math.random() - 0.5) * 2; 
    }

    update() {
        this.y -= this.speed;
        this.x += this.wind;

        const fadeHeight = canvas.height * 0.4; 
        if (this.y < fadeHeight) {
            this.opacity -= 0.04; 
        }

        if (this.y < 0 || this.opacity <= 0) {
            this.reset();
            this.y = canvas.height - Math.random() * 80;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 49, 49, ${this.opacity})`;
        ctx.fill();
        ctx.closePath();
    }
}

for (let i = 0; i < 70; i++) {
    particles.push(new Particle()); 
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", resizeCanvas);

document.addEventListener("DOMContentLoaded", () => {
    const bodyStyle = `
        position: relative;
        background: #0F0F0F; 
        overflow: auto; 
        z-index: 1; 
    `;
    document.body.setAttribute("style", bodyStyle);
});
