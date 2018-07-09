
const x_vals = [];
const y_vals = [];

let a, b, c, d, px, py, x1, x2, curveY;

let dragging = false;

const learningRate = 0.1;
const optimizer = tf.train.adam(learningRate);

const loss = (pred, labels) => pred.sub(labels).square().mean();
 // y = ax³ + b²x + cx + d
const predict = x => {
    let xs = tf.tensor1d(x);
    return xs
            .pow(tf.scalar(3)).mul(a)
            .add(xs.square().mul(b))
            .add(xs.mul(c))
            .add(d);
}

const curveX = [];

for (let x = -1; x < 1.01; x += 0.02) {
    curveX.push(x);
}

function setup() {
    createCanvas(400, 400);
    background(0);

    a = tf.variable(tf.scalar(random(-1, 1)));
    b = tf.variable(tf.scalar(random(-1, 1)));
    c = tf.variable(tf.scalar(random(-1, 1)));
    d = tf.variable(tf.scalar(random(-1, 1)));
}

function draw() {

    if (dragging) {
        // normalize values to -1 and 1, starting point at botton-left
        x_vals.push(map(mouseX, 0, width, -1, 1));
        y_vals.push(map(mouseY, 0, height, 1, -1));
    }

    if (!dragging && x_vals.length > 0) {
        tf.tidy(() => {
            optimizer.minimize(() => loss(predict(x_vals), tf.tensor1d(y_vals)));
        });
    }

    background(0);

    stroke(255);
    strokeWeight(8);

    for (let i = 0; i < x_vals.length; i++) {
        px = map(x_vals[i], -1, 1, 0, width);
        py = map(y_vals[i], -1, 1, height, 0);
        point(px, py);
    }

    curveY = tf.tidy(() => predict(curveX).dataSync());

    beginShape();
    noFill();
    stroke(0, 255, 0);
    strokeWeight(2);

    for (let i = 0; i < curveX.length; i++) {
        let x = map(curveX[i], -1, 1, 0, width);
        let y = map(curveY[i], -1, 1, height, 0);
        vertex(x, y);
    }

    endShape();

    // console.log(x_vals.length);
    // console.log(tf.memory().numTensors);
}

function mousePressed() {
    dragging = true;
}

function mouseReleased() {
    dragging = false;
}