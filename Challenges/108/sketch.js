// Barnsley fern

// Position
let x = 0;
let y = 0;

let nextX;
let nextY;
let sliderSpeed;
let sliderMapXMin;
let sliderMapXMax;
let sliderMapYMin;
let sliderMapYMax;


function setup () {
    createCanvas(600, 600);
    background(0);

    sliderSpeed = createSlider(0, 1000, 100);
    sliderMapXMin = createSlider(-4, 4, -2.1820, 0.0001);
    sliderMapXMax = createSlider(4, 8, 2.6558, 0.0001);
    sliderMapYMin = createSlider(0, 5, 0, 0.0001);
    sliderMapYMax = createSlider(8, 13, 9.9983, 0.0001);

    sliderMapXMin.changed(reset);
    sliderMapXMax.changed(reset);
    sliderMapYMin.changed(reset);
    sliderMapYMax.changed(reset);

    strokeWeight(1);
}

function draw() {
    for (let i = sliderSpeed.value(); i >= 0; i--) {
        drawPoint();
        nextPoint();
    }
}

function nextPoint() {
    let r = random(1);

    if (r < 0.01) {
        // 1
        nextX = 0;
        nextY = 0.16 * y;
    }
    else if (r < 0.86) {
         // 2
        nextX = 0.85 * x + 0.04 * y;
        nextY = -0.04 * x + 0.85 * y + 1.6;
    }
    else if (r < 0.93) {
        // 3
        nextX = 0.2 * x + -0.26 * y;
        nextY = 0.23 * x + 0.22 * y + 1.6;
    }
    else {
        // 4
        nextX = -0.15 * x + 0.28 * y;
        nextY = 0.26 * x + 0.24 * y + 0.44;
    }

    x = nextX;
    y = nextY;
}

function drawPoint() {
    colorMode(HSB, 255, 255, 255);
    stroke(map(y, 0, sliderMapYMax.value(), 0, 255), 255, 255, 200);
    
    let px = map(x, sliderMapXMin.value(), sliderMapXMax.value(), 0, width);
    let py = map(y, sliderMapYMin.value(), sliderMapYMax.value(), height, 0)

    point(px, py);
}

function reset() {
    y = 0;
    x = 0;
    background(0);
}