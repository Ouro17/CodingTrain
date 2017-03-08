// module aliases
var Engine = Matter.Engine,
    //Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var boxes = [];
var ground;

function setup() {
    createCanvas(400, 400);
    engine = Engine.create();
    world  = engine.world;
    Engine.run(engine);

    ground = Bodies.rectangle(200, height - 50, width, 100, {isStatic: true});
    World.add(world, ground);
}

function mousePressed() {
    boxes.push(new Box(mouseX, mouseY, random(10, 40), random(10, 40)));
}

function draw() {
    background(51);

    boxes.forEach(function(item) {
        item.show();
    });

    noStroke(255);
    fill(170);
    rectMode(CENTER);
    rect(ground.position.x, ground.position.y, width, 100);
}
