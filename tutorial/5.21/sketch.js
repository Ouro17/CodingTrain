// module aliases
var Engine          = Matter.Engine,
    World           = Matter.World,
    Bodies          = Matter.Bodies,
    Constraint      = Matter.Constraint,
    Mouse           = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

var engine;
var world;
var particles = [];
var boundaries = [];
var ground;

var mConstraint;
var radious = 10;

function setup() {
    let canvas = createCanvas(400, 400);
    engine = Engine.create();
    world  = engine.world;
    Engine.run(engine);

    let prev = null;
    for (let x = 200; x < 400; x+= 20) {
        let p = new Particle(x, 100, radious, !prev);
        particles.push(p);

        if (prev) {
            let options = {
                bodyA: p.body,
                bodyB: prev.body,
                length: 20,
                stiffness: 0.4
            };

            let constraint = Constraint.create(options);
            World.add(world, constraint);
        }

        prev = p;
    }

    let boundaryWidth = width;
    let thinckness = 20;
    let boundaryAngle = 0;

    boundaries.push(new Boundary(boundaryWidth / 2, height, boundaryWidth, thinckness, boundaryAngle));
    // Attach the mouse to the p5 canvas
    let canvasMouse = Mouse.create(canvas.elt);
    canvasMouse.pixelRatio = pixelDensity();

    let options = {
        mouse: canvasMouse
    };

    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);
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

    if (mConstraint.body) {
        let pos    = mConstraint.body.position;
        let m      = mConstraint.mouse.position;
        let offset = mConstraint.constraint.pointB;

        stroke(0, 255, 0);
        line(pos.x + offset.x, pos.y + offset.y, m.x, m.y);

        fill(0, 255, 0);
        ellipse(pos.x, pos.y, radious, radious);

    }

    //
    // line(particles[0].body.position.x,  particles[0].body.position.y,
    //      particles[1].body.position.x,  particles[1].body.position.y)
}
