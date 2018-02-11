let brain;

function setup() {

    brain = new NeuralNetwork(2, 2, 2);
    let inputs = [1, 0];
    let targets = [1, 0];

    // let output = brain.feedfoward([1, 0]);
    // console.log(output);

    brain.train(inputs, targets);

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