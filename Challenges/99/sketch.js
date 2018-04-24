let r, g, b;
let inputs;
let brain;
let which = false; // false for white, true for black

function setup() {
    brain = new NeuralNetwork(3, [5, 3], 2, 0.1);
    brain.setActivactionFunction(tanh);
    createCanvas(600, 300);
    noLoop();

    for( let i = 0; i < 10000; i++) {
        let r = random(255);
        let g = random(255);
        let b = random(255);
        let targets = trainColor(r, g, b);
        let inputs = [r / 255, g / 255, b / 255];
        brain.train(inputs, targets);
    }

    pickColor();
}

function draw() {
    background(r, g, b);

    // line
    strokeWeight(4);
    stroke(0);
    line(width / 2, 0, width / 2, height);

    printText();
    which = colorPredictor(r, g, b);

    fill((which) ? 255 : 0);
    ellipse((which) ? 150: 450, 200, 60);
}

function mousePressed() {
    pickColor();

    let targets = (mouseX > width / 2) ? [1, 0] : [0, 1];

    brain.train(inputs, targets);
}

const colorPredictor = (r, g, b) => {
    let outputs = brain.predict(inputs);

    console.table(outputs);

    return outputs[0] > outputs[1];
}

const trainColor = (r, g, b) => {
   return ((r + g + b) > 382.5) ? [1, 0] : [0, 1];
}

const pickColor = () => {
    r = random(255);
    g = random(255);
    b = random(255);
    inputs = [r / 255, g / 255, b / 255]; // normalize the data
    redraw();
};

const printText = () => {
    textSize(64);
    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    text('white', 150, 100);
    fill(0);
    text('black', 450, 100);
};