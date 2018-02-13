let mnist;
let nn;
let train;

function setup() {
   // train = xor;

   train = numbers;
}

function numbers() {
    // createCanvas(400, 200);
    
    if (undefined === nn) {
        nn = new NeuralNetwork(784, [64], 10, 0.1);
    }

    let user_digit = createGraphics(200, 200);
    user_digit.pixelDensity(1);

    let train_image = createImage(28, 28);


    loadMNIST(function(data) {
        mnist = data;
        console.log(mnist);

        console.log('Number of images : ' + mnist.train_images.length);

        for(let i = 0; i < mnist.train_images.length; i++) {
            train_images(i);
        }

        console.log('Trained');
    });
}

function image_to_array(image) {
    let array = [];

    for (let i = 0; i < 784; i++) {
        let bright = image[i];
        array[i] = bright / 255;
    }

    return array;
}

function label_to_array(label) {
    let array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    array[label] = 1;

    return array;
}

function train_images(train_index) {
    let inputs = image_to_array(mnist.train_images[train_index]);
    let targets = label_to_array(mnist.train_labels[train_index]);

    nn.train(inputs, targets);

    return (train_index + 1) % mnist.train_labels.length;
}

const save = () => {
    if (undefined !== nn) {
        nn.save();
    }
    else {
        alert('Cant save without training or loading!');
    }
}

const load = (files) => {
    const fr = new FileReader();

    fr.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            nn = new NeuralNetwork(data);
            console.log('Loaded');
            nn.print();
        }
        catch(e) {
            alert('Seems that this file is not a valid JSON');
        }
    }

    fr.readAsText(files[0]);
}


const xor = () => {
    const training_data = [
        {
            inputs: [0, 0],
            targets: [0]
        },
        {
            inputs: [0, 1],
            targets: [1]
        },
        {
            inputs: [1, 0],
            targets: [1]
        },
        {
            inputs: [1, 1],
            targets: [0]
        }
    ];

    if (undefined == nn) {
        nn = new NeuralNetwork(2, [3, 2], 1, 0.1);
    }

    for (let i = 0; i < 100000; ++i) {
        let data = random(training_data);
        nn.train(data.inputs, data.targets);
    }

    console.table(nn.predict([0, 0]));
    console.table(nn.predict([0, 1]));
    console.table(nn.predict([1, 0]));
    console.table(nn.predict([1, 1]));

    nn.print();
}

const matrixTest = () => {
    let a = new Matrix(2, 2, (value) => value + 2).print();

    let matrix = new Matrix(2, 2, true);

    let A = new Matrix(3, 2, true);
    let B = new Matrix(10, 5, true);

    console.log("A x B");
    A.multiply(B).print();

    let r = A.multiply(matrix)
            .print();

    A = new Matrix ([
                    [6,7,0], 
                    [7,2,6]
                  ])
                .print();

    B = new Matrix([
                    [5,3], 
                    [1,1],
                    [5,1]
               ])
                .print();

    console.log("A x B r");
    r = Matrix.multiply(A, B).print();

    Matrix.transpose(A)
    .print()
    .transpose()
    .print();

    
}