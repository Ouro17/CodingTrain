var Engine          = Matter.Engine,
    World           = Matter.World,
    Bodies          = Matter.Bodies,
    Events          = Matter.Events
    //Constraint      = Matter.Constraint,
    //Mouse           = Matter.Mouse,
    //MouseConstraint = Matter.MouseConstraint
;

const engine = Engine.create();
const world  = engine.world;
const particles  = [];
const plinkos    = [];
const boundaries = [];
const cols = 11;
const rows = 10;
let spacing;
let ding;

function preload() {
    ding = loadSound('ding.mp3');
}

function mousePressed() {
    ding.play();
}

function setup() {
    createCanvas(600, 700);
    colorMode(HSB);

    ding.setVolume(0.1);

    spacing = width / cols;

    addParticle();
    createPlinkos();

    // Floor
    const b = new Boundary(width / 2, height + 50, width, 100);
    boundaries.push(b);

    createBuckets();

//    world.gravity.y = 2;
    function collision(event) {
        const pairs = event.pairs;

        for (let i = 0; i < pairs.length; i++) {

            let labelA = pairs[i].bodyA.label;
            let labelB = pairs[i].bodyB.label;
            if (
                labelA == 'particle' && labelB == 'plinko' ||
                labelB == 'particle' || labelA == 'plinko'
            ) {
                ding.play();
            }
        }
    }

    Events.on(engine, 'collisionStart', collision);

    Engine.run(engine);
}

function draw() {

    if (frameCount % 60 == 0) {
        addParticle();
    }

    background(0);

    Engine.update(engine, 1/16);

    for (let i = 0; i < particles.length; ++i) {

        if (particles[i].isOffScreen()) {
            // Remove this particle
            World.remove(world, particles[i].body);
            particles.splice(i, 1);
            i--;
        }
        else {
            particles[i].show();
        }
    }

    particles.forEach(function (particle) {
        particle.show();
    });

    plinkos.forEach(function (plinko) {
        plinko.show();
    });

    boundaries.forEach(function (boundary) {
        boundary.show();
    });
}

function addParticle() {
    const p = new Particle(300, 0, 10);
    particles.push(p);
}

function createPlinkos() {
    for (let j = 0; j < rows; j++)
        for (let i = 0; i < cols + 1; i++) {
            let x = i * spacing;
            const y = spacing + j * spacing;
            if (j % 2 == 1) {
                x += spacing / 2;
            }

            plinkos.push(new Plinko(x, y, 16));
        }
}

function createBuckets() {
    for (let i = 0; i < cols + 1; i++) {
        const x = i * spacing - 10;
        const h = 100;
        const w = 10;
        const y = height - h / 2;

        boundaries.push(new Boundary(x, y, w, h));
    }
}
