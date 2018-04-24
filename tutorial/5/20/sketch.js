// module aliases
var Engine = Matter.Engine,
    //Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint;

var engine;
var world;
var particles = [];
var boundaries = [];
var ground;

function setup() {
    createCanvas(400, 400);
    engine = Engine.create();
    world  = engine.world;
    Engine.run(engine);

    let prev = null;
    for (let x = 200; x < 400; x+= 20) {
        let p = new Particle(x, 100, 5, !prev);
        particles.push(p);

        if (prev) {
            let options = {
                bodyA: p.body,
                bodyB: prev.body,
                length: 20,
                stiffness: 0.4
            }

            let constraint = Constraint.create(options);
            World.add(world, constraint);
        }

        prev = p;
    }

    let boundaryWidth = width;
    let thinckness = 20;
    let boundaryAngle = 0;

    boundaries.push(new Boundary(boundaryWidth / 2, height, boundaryWidth, thinckness, boundaryAngle));
}

function draw() {
    background(51);

    for (let index = 0; index < particles.length; index++){
        let particle = particles[index];
        particle.show();

        if (particle.isOffScreen()) {
            particle.removeFromWorld(); // remove from physic world
            particles.splice(index, 1); // remove from the draw array
            index--; // Avoid flickering caused by splice
        }
    }

    boundaries.forEach(function(boundary) {
        boundary.show();
    });
    //
    // line(particles[0].body.position.x,  particles[0].body.position.y,
    //      particles[1].body.position.x,  particles[1].body.position.y)
}
