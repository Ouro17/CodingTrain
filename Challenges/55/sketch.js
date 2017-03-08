var d = 8;
var n = 5;
var sliderD;
var sliderN;

function setup() {
    createCanvas(400, 400);
    sliderD = createSlider(1, 10, 5);
    sliderN = createSlider(1, 10, 5);
}

function draw() {
    d = sliderD.value();
    n = sliderN.value();
    let k = n / d;
    background(51);
    translate(width / 2, height / 2);

    beginShape();

    noFill();
    stroke(255);
    strokeWeight(1);

    for (let a = 0; a < TWO_PI * d; a += 0.02) {

        let r = 200 * cos(k * a);
        let x = r * cos(a);
        let y = r * sin(a);

        vertex(x, y);
    }

    endShape(CLOSE);
}
