
const x_vals = [];
const y_vals = [];

let m, b, px, py, x1, x2, lineY;

const learningRate = 0.5;
const optimizer = tf.train.sgd(learningRate);

const loss = (pred, labels) => pred.sub(labels).square().mean();
 // y = mx + b
const predict = x => tf.tensor1d(x).mul(m).add(b);

const lineX = [0, 1];

function setup() {
    createCanvas(400, 400);
    background(0);

    m = tf.variable(tf.scalar(random(1)));
    b = tf.variable(tf.scalar(random(1)));

    x1 = map(lineX[0], 0, 1, 0, width);
    x2 = map(lineX[1], 0, 1, 0, width);
}

function draw() {

    if (x_vals.length > 0) {
        tf.tidy(() => {
            optimizer.minimize(() => loss(predict(x_vals), tf.tensor1d(y_vals)));
        });
    }

    background(0);

    stroke(255);
    strokeWeight(8);

    for (let i = 0; i < x_vals.length; i++) {
        px = map(x_vals[i], 0, 1, 0, width);
        py = map(y_vals[i], 0, 1, height, 0);
        point(px, py);
    }

    lineY = tf.tidy(() => predict(lineX).dataSync());

    let y1 = map(lineY[0], 0, 1, height, 0);
    let y2 = map(lineY[1], 0, 1, height, 0);

    stroke(0, 255, 0);
    strokeWeight(2);

    line(x1, y1, x2, y2);
}

function mousePressed() {

    // normalize values to 0 and 1, starting point at botton-left
    x_vals.push(map(mouseX, 0, width, 0, 1));
    y_vals.push(map(mouseY, 0, height, 1, 0));
}