let qtree;
let range;
let boundary;
let particleCount;
let particles = [];

let framerateP;
let withQuadTree;
let total;

function setup() {
    createCanvas(400, 400);

    boundary = new Rectangle(width / 2, height / 2, width, height);
    particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(random(width), random(height), random(1, 4)));
    }

    framerateP = createP('framerate: ');
    withQuadTree = createCheckbox('using quadtree');
    withQuadTree.checked(true);
    let totalP = createP(particleCount);
    total = createSlider(1, 5000, 100);

    total.input(() => {
        particleCount = total.value();
        totalP.html(particleCount);

        while (particleCount > particles.length) {
            particles.push(new Particle(random(width), random(height), random(1, 4)));
        }
        if (particleCount < particles.length) {
          particles.splice(0, particles.length - particleCount);
        }
    });

 
}

function draw() {
    qtree = new QuadTree(boundary, 4);

    background(0);

    for (let p of particles) {
        p.move();
        p.render();
        p.setHighlight(false);

        qtree.insert(new Point(p.x, p.y, p));
    }

    for (let p of particles) {
        if (withQuadTree.checked()) {
            let points = qtree.query(new Circle(p.x, p.y, p.r * 2));
            for (let point of points) {
                let other = point.userData;
                if (p !== other && p.intersects(other)) {
                    p.setHighlight(true);
                }
            }
        }
        else {
            for (let other of particles) {
                if (p !== other && p.intersects(other)) {
                    p.setHighlight(true);
                }
            }
        }
    }

    if (withQuadTree.checked()) {
        qtree.show();
        /*stroke(0, 255, 0);
        rectMode(CENTER);

        range = new Rectangle(mouseX, mouseY, 25, 25);

        rect(range.x, range.y, range.w * 2, range.h * 2);

        for (let p of qtree.query(range)) {
            strokeWeight(4);
            point(p.x, p.y);
        }*/
    }

    framerateP.html("Framerate: " + floor(frameRate()));
}