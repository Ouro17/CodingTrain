let nn;
const training_data = [
    {
        inputs: [0, 0],
        targets: [0]
    },
    {
        inputs: [1, 1],
        targets: [0]
    },
    {
        inputs: [0, 1],
        targets: [1]
    },
    {
        inputs: [1, 0],
        targets: [1]
    }

];

function setup() {
    nn = new NeuralNetwork(2, 2, 1, 0.1);

    for (let i = 0; i < 500000; ++i) {
        let data = random(training_data);
        nn.train(data.inputs, data.targets);
    }

    console.table(nn.feedforward([0, 0]));
    console.table(nn.feedforward([0, 1]));
    console.table(nn.feedforward([1, 0]));
    console.table(nn.feedforward([1, 1]));

    nn.print();
}

function matrixTest() {
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