let nn;
let data;
let resolution;
let cols;
let rows;
let x1;
let x2;
let inputs;
let y;
let data_set;
let training;
let learning;
let red, green, blue;

function setup() {
    createCanvas(400, 400);

    training = 10;
    learning = 0.1;
    data_set = AND;

    red   = 255;
    green = 255;
    blue  = 255;

    nn = network();

    resolution = 5;
    cols = width / resolution;
    rows = height / resolution;
}

function draw() {
    background(0);

    for(let i = 0; i < training; i++){
        data = random(data_set);
        nn.train(data.inputs, data.outputs);
    }

    for (let i = 0; i < cols; ++i) {
        for (let j = 0; j < rows; ++j) {
            x1 = i / cols;
            x2 = j / rows;
            inputs = [x1, x2];
            y = nn.predict(inputs);
            noStroke();
            fill (y * red, y * green, y * blue);
            rect(i * resolution, j * resolution, resolution, resolution);
        }
    }
}

const reset = () => {
    nn = network();
}

const network = () => {
    return new NeuralNetwork(2, [4], 1, learning);
}

const changeData = (value) => {
    switch(value) {
        case 'AND':
            data_set = AND;
            break;
        case 'OR':
            data_set = OR;
            break;
        case 'NOR':
            data_set = NOR;
            break;
        case 'NAND':
            data_set = NAND;
            break;
        case 'XOR':
            data_set = XOR;
            break;
        case 'XNOR':
            data_set = XNOR;
            break;
    }

    reset();
}

const changeLearning = (value) => {
    nn.setLearningRate(value);
    learning = value;
}

const changeTraining = (value) => {
    training = 1;

    for (let i = 0; i < value - 1; ++i) {
        training *= 10;
    }

    console.log(training);
}

const changeColor = (value) => {
    let result = hexToRgb(value);

    red   = result.r;
    green = result.g;
    blue  = result.b;
}

const hexToRgb = (hex) => {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

const AND = [
    {
        inputs: [0, 0],
        outputs: [0]
    },
    {
        inputs: [0, 1],
        outputs: [0]
    },
    {
        inputs: [1, 0],
        outputs: [0]
    },
    {
        inputs: [1, 1],
        outputs: [1]
    }
];

const NAND = [
    {
        inputs: [0, 0],
        outputs: [1]
    },
    {
        inputs: [0, 1],
        outputs: [1]
    },
    {
        inputs: [1, 0],
        outputs: [1]
    },
    {
        inputs: [1, 1],
        outputs: [0]
    }
];

const OR = [
    {
        inputs: [0, 0],
        outputs: [0]
    },
    {
        inputs: [0, 1],
        outputs: [1]
    },
    {
        inputs: [1, 0],
        outputs: [1]
    },
    {
        inputs: [1, 1],
        outputs: [1]
    }
];

const NOR = [
    {
        inputs: [0, 0],
        outputs: [1]
    },
    {
        inputs: [0, 1],
        outputs: [0]
    },
    {
        inputs: [1, 0],
        outputs: [0]
    },
    {
        inputs: [1, 1],
        outputs: [0]
    }
];

const XOR = [
    {
        inputs: [0, 0],
        outputs: [0]
    },
    {
        inputs: [0, 1],
        outputs: [1]
    },
    {
        inputs: [1, 0],
        outputs: [1]
    },
    {
        inputs: [1, 1],
        outputs: [0]
    }
];

const XNOR = [
    {
        inputs: [0, 0],
        outputs: [1]
    },
    {
        inputs: [0, 1],
        outputs: [0]
    },
    {
        inputs: [1, 0],
        outputs: [0]
    },
    {
        inputs: [1, 1],
        outputs: [1]
    }
];
