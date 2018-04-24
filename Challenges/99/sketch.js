let r, g, b;
let brain;

function setup() {
    createCanvas(600, 300);
    pickColor();

    brain = new NeuralNetwork();
}

function draw() {
    background(r, g, b);
    printText();
   
}

function mousePressed() {
    pickColor();
}

const pickColor = () => {
    r = random(255);
    g = random(255);
    b = random(255);
};

const printText = () => {
    textSize(64);
    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);
    text('black', 200, 150);
    fill(255);
    text('white', 400, 150);
};