var attractors = [];
var particles = [];

function setup() {
    createCanvas(400, 400);
    for (let i = 0; i < 100; ++i) {
        particles.push(new Particle(random(width), random(height)));
    }
}

function mousePressed() {
    attractors.push(createVector(mouseX, mouseY));
}

function draw() {
    background(51);
    stroke(255);
    strokeWeight(4);
    for (let i = 0; i < attractors.length; ++i) {
        stroke(0, 255, 0);
        point(attractors[i].x, attractors[i].y);
    }

    for (let i = 0; i < particles.length; ++i) {
        let particle = particles[i];
        for (let j = 0; j < attractors.length; ++j) {
            particle.attracted(attractors[j], j);
        }

        particle.update();
        particle.show();
    }
}
