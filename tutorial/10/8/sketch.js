let brain;

function setup() {

    brain = new NeuralNetwork(3, 3, 1);

    let matrix = new Matrix(3, 3);
    matrix.randomize().add(3).multiply(2);
    console.table(matrix.matrix);
}

function draw() {

}
