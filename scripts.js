document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    const colors = ['#ffffff', '#aaaaaa', '#888888'];
    const lineColor = 'rgba(200, 200, 200, 0.3)';  // Light grey with transparency

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1; // Ensure initial size
            this.speedX = Math.random() * 0.5 - 0.25; // Slower horizontal speed
            this.speedY = Math.random() * 0.5 - 0.25; // Slower vertical speed
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap around edges of the canvas
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < 200; i++) { // Increase number of particles
            particles.push(new Particle());
        }
    }

    function handleParticles() {
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = lineColor;  // Set the line color with transparency
                    ctx.lineWidth = 0.2;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleParticles();
        requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const revealText = document.getElementById('text');
    const letters = Array.from(revealText.textContent).map(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.classList.add('char');
        return span;
    });

    revealText.textContent = '';
    letters.forEach(letter => revealText.appendChild(letter));

    let virtualScroll = 0;
    const totalLetters = letters.length;
    let textRevealed = false;

    // Disable scrolling until text is fully revealed
    function disableScroll() {
        document.body.style.overflow = 'hidden';
    }

    // Enable scrolling after the color transition is complete
    function enableScroll() {
        document.body.style.overflow = 'auto';
    }

    // Track the completion of the color transition
    revealText.addEventListener('transitionend', (event) => {
        if (event.propertyName === 'color' && virtualScroll >= totalLetters) {
            enableScroll();  // Enable scroll only after text is fully white
        }
    });

    // Scroll event listener for letter reveal
    window.addEventListener('wheel', (e) => {
        e.preventDefault(); // Prevent default scroll

        const delta = e.deltaY > 0 ? 5 : -5;
        virtualScroll = Math.max(0, Math.min(virtualScroll + delta, totalLetters));

        letters.forEach((letter, index) => {
            if (index < virtualScroll) {
                letter.style.color = '#ffffff'; // Reveal letter
                letter.style.opacity = '1';
            } else {
                letter.style.color = 'grey';
                letter.style.opacity = '0.2';
            }
        });

        // When all text is revealed, allow normal scroll
        if (virtualScroll >= totalLetters && !textRevealed) {
            textRevealed = true;
            enableScroll();  // Enable regular scrolling once the text is fully revealed
        }
    }, { passive: false });  // passive: false to allow preventDefault()

    disableScroll();  // Initially disable scrolling
});
