let brain;

function setup() {

    brain = new NeuralNetwork(3, 3, 1);

    let matrix = new Matrix(2, 2);
    matrix.randomize();
    matrix.show();

    let A = new Matrix(3, 2);
    A.randomize();
    let B = new Matrix(10, 5);

    A.multiply(B);

    A.show();

    let r = A.multiply(matrix);

    r.show();

    A = new Matrix (2, 3);
    A.matrix = [
                    [6,7,0], 
                    [7,2,6]
               ];
    A.show();

    B = new Matrix(3, 2);
    B.matrix = [
                    [5,3], 
                    [1,1],
                    [5,1]
               ];

    B.show();

    r = A.multiply(B);
    r.show();

    let b = A.transpose();

    b.show();
}
