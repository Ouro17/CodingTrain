// module aliases
var Engine = Matter.Engine,
    //Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var circles = [];
var boundaries = [];
var ground;

function setup() {
    createCanvas(400, 400);
    engine = Engine.create();
    world  = engine.world;
    Engine.run(engine);

    let boundaryWidth = width * 0.6;
    let thinckness = 20;
    let boundaryAngle = 0.3;

    boundaries.push(new Boundary(150, 100, boundaryWidth, thinckness, boundaryAngle));
    boundaries.push(new Boundary(250, 300, boundaryWidth, thinckness, -boundaryAngle));
}

function mouseDragged() {
    circles.push(new Circle(mouseX, mouseY, random(5, 10)));
}

function mousePressed() {
    circles.push(new Circle(mouseX, mouseY, random(5, 10)));
}

function draw() {
    background(51);

    circles.forEach(function(circle) {
        circle.show();
    });

    boundaries.forEach(function(boundary) {
        boundary.show();
    });
}
