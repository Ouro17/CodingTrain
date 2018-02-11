class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes, learning_rate) {
        this.input_nodes  = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;

        this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes, true);
        this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes, true);

        this.bias_h = new Matrix(this.hidden_nodes, 1, true);
        this.bias_o = new Matrix(this.output_nodes, 1, true);
        this.learning_rate = learning_rate;
    }

    feedforward(input_array) {
        // Generating the Hidden Output
        const hidden = Matrix.multiply(this.weights_ih, new Matrix(input_array))
                    .add(this.bias_h)
                    .map(sigmoid) // Activation function!
        ;

        // Generating the output's output!
        return Matrix.multiply(this.weights_ho, hidden)
                    .add(this.bias_o)
                    .map(sigmoid)
                    .toArray()
        ;
    }

    train(input_array, target_array) {
        let inputs = new Matrix(input_array);

        const hidden = Matrix.multiply(this.weights_ih, inputs)
                    .add(this.bias_h)
                    .map(sigmoid) // Activation function!
        ;

        // Generating the output's output!
        let outputs = Matrix.multiply(this.weights_ho, hidden)
                    .add(this.bias_o)
                    .map(sigmoid);

        let targets = new Matrix(target_array);

        // Calculate the error
        // ERROR = TARGETS - OUTPUTS
        let outputs_errors = Matrix.subtract(targets, outputs);

        // Calculate gradient
        let gradients = Matrix.map(outputs, dsigmoid)
        .hadamard(outputs_errors)
        .multiply(this.learning_rate)
        ;

        // Adjust the weights by deltas (// Calculate deltas)
        this.weights_ho.add(Matrix.multiply(gradients, Matrix.transpose(hidden)));

        // Adjust the bias by its deltas (which is just the gradients)
        this.bias_o.add(gradients);

        let hidden_gradients = Matrix.map(hidden, dsigmoid)
        // Calculate the hidden layer errors and hadamard it
        .hadamard(Matrix.multiply(Matrix.transpose(this.weights_ho), outputs_errors))
        .multiply(this.learning_rate);

        // Adjust the weights by deltas (// Calculate input -> hidden deltas)
        this.weights_ih.add(Matrix.multiply(hidden_gradients, Matrix.transpose(inputs)));
        this.bias_h.add(hidden_gradients);
    }

    print() {
        console.log('Nodes: [' + this.input_nodes + ', ' 
                        + this.hidden_nodes + ', ' 
                        + this.output_nodes
                        + ']');

        console.log('Current weights: ');
        console.log('Input to hidden: ');
        this.weights_ih.print();
        console.log('Hidden to output: ');
        this.weights_ho.print();

        console.log('Current bias: ');
        console.log('Bias hidden: ');
        this.bias_h.print()
        console.log('Bias output: ');
        this.bias_o.print()

        console.log('Learning rate: ' + this.learning_rate);
    }
}


const sigmoid = (x) => {
    return 1 / (1 + Math.exp(-x));
}

const dsigmoid = (y) => {
    // return sigmoid(x) * (1 - sigmoid(x));
    return y * (1 - y);
}