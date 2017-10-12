let particles = [];

function setup() {
    createCanvas(600, 400);
}

function draw() {
    background(0);
    
    particles.push(new Particle(300, 380));

    for (let i = particles.length - 1; i > -1; --i) {
        particles[i].update();
        particles[i].show();
        if (particles[i].finished()) {
            particles.splice(i, 1);
        }
    }
}

class Particle {
    constructor(x, y) {
        this.x      = x;
        this.y      = y;
        this.vx     = random(-1, 1);
        this.vy     = random(-5, -1);
        this.red    = random(0, 255);
        this.green  = random(0, 100);
        this.blue   = random(0, 35);
        this.alpha  = 255;
        this.vAlpha = random(-1, -10);
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha += this.vAlpha;
    }

    show() {
        noStroke();
        fill(this.red, this.blue, this.green, this.alpha);
        ellipse(this.x, this.y, 16);
    }

    finished() {
        return this.alpha < 0;
    }
}