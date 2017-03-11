var Engine          = Matter.Engine,
    World           = Matter.World,
    Bodies          = Matter.Bodies
    //Constraint      = Matter.Constraint,
    //Mouse           = Matter.Mouse,
    //MouseConstraint = Matter.MouseConstraint
;

const engine = Engine.create();
const world  = engine.world;
const particles = [];
const plinkos = [];
const cols = 11;
const rows = 10;

function setup() {
    createCanvas(600, 800);

    Engine.run(engine);

    addParticle();

    createPlinkos();
}

function draw() {

    if (frameCount % 60 == 0) {
        addParticle();
    }

    background(75);

    particles.forEach(function (particle) {
        particle.show();
    });

    plinkos.forEach(function (plinko) {
        plinko.show();
    });
}

function addParticle() {
    const p = new Particle(300, 0, 10);
    particles.push(p);
}

function createPlinkos() {
    const spacing = width / cols;

    for (let j = 0; j < rows; j++)
        for (let i = 0; i < cols; i++) {
            let x = i * spacing;
            let y = spacing + j * spacing;
            if (j % 2 == 1) {
                x += spacing / 2;
            }

            const p = new Plinko(x, y, 4);
            plinkos.push(p);
        }
}
