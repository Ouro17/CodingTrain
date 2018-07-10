let model, ys, xs,
    index, resI, resJ, bright,
    cols, rows
;

const waitTime = 10;
const learningRate = 0.1;
const resolution = 20;
const halfRes = resolution / 2;
const inputs = [];

const training = 10;

const train_xs = tf.tensor2d([
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
]);

const train_ys = tf.tensor2d([
    [0],
    [1],
    [1],
    [0],
]);

function setup() {
    createCanvas(400, 400);

    cols = width / resolution;
    rows = height / resolution;

    textSize(8);
    textAlign(CENTER, CENTER);

    // Create the input data    
    for (let i = 0; i < cols; ++i) {
        for (let j = 0; j < rows; ++j) {
            inputs.push([i / cols, j / rows]);
        }
    }

    model = tf.sequential();

    let hidden = tf.layers.dense({
        inputShape: [2],
        units: 4,
        activation: 'sigmoid'
    });

    let output = tf.layers.dense({
        units: 1,
        activation: 'sigmoid'
    });

    model.add(hidden);
    model.add(output);

    model.compile({
        optimizer: tf.train.adam(learningRate),
        loss: 'meanSquaredError'
    });

    // Create the input tensor
    xs = tf.tensor2d(inputs);

    setTimeout(train, waitTime);
}

function trainModel() {
    return model.fit(train_xs, train_ys, {
        shuffle: true,
        epochs: training
    });
}

function train() {
    trainModel()
    .then(r => setTimeout(train, waitTime));
}

function draw() {
    background(0);

    // Get the predictions
    ys = tf.tidy(() => model.predict(xs).dataSync());

    // Draw the results
    index = 0;

    for (let i = 0; i < cols; ++i) {
        for (let j = 0; j < rows; ++j) {
            resI = i * resolution;
            resJ = j * resolution;

            bright = ys[index] * 255;
            fill(bright);

            rect(resI, resJ, resolution, resolution);

            fill(255 - bright);
            text(nf(ys[index], 1, 2), resI + halfRes, resJ + halfRes);

            index++;
        }
    }
}