    const canvas = document.createElement("canvas");
    canvas.id = "snowCanvas";
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

    const snowflakes = [];

    class Snowflake {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width; 
            this.y = Math.random() * canvas.height; 
            this.radius = Math.random() * 3 + 1;
            this.speed = Math.random() * 2 + 1; 
            this.opacity = Math.random();
            this.wind = (Math.random() - 0.5) * 0.5; 
        }

        update() {
            this.y += this.speed;
            this.x += this.wind;

            if (this.y > canvas.height) {
                this.reset();
                this.y = 0; 
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
            ctx.closePath();
        }
    }

    for (let i = 0; i < 150; i++) {
        snowflakes.push(new Snowflake());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        snowflakes.forEach((snowflake) => {
            snowflake.update();
            snowflake.draw();
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
