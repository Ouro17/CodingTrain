class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes) {
        this.input_nodes  = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;

        this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes, true);
        this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes, true);

        this.bias_h = new Matrix(this.hidden_nodes, 1, true);
        this.bias_o = new Matrix(this.output_nodes, 1, true);
    }

    feedfoward(input_array) {
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

        // Calculate deltas
        let weights_ho_deltas = Matrix.multiply(gradients, Matrix.transpose(hidden));

        // is this right???
        this.weights_ho.add(weights_ho_deltas);

        // Calculate the hidden layer errors
        let hidden_errors = Matrix.transpose(this.weights_ho)
                            .multiply(outputs_errors)
                            ;

        let hidden_gradients = Matrix.map(hidden, dsigmoid)
        .hadamard(hidden_errors)
        .multiply(this.learning_rate);

        // Calculate input -> hidden deltas
        let weights_ih_deltas = Matrix.multiply(hidden_gradients, Matrix.transpose(inputs));

        this.weights_ih.add(weights_ih_deltas);
    }
}


const sigmoid = (x) => {
    return 1 / (1 + Math.exp(-x));
}

const dsigmoid = (y) => {
    // return sigmoid(x) * (1 - sigmoid(x));
    return y * (1 - y);
}