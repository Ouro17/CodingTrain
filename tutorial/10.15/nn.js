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


    train(inputs, targets) {
        let outputs = new Matrix(this.feedfoward(inputs));
        targets = new Matrix(targets);

        // Calculate the error
        // ERROR = TARGETS - OUTPUTS
        let output_errors = Matrix.subtract(targets, outputs);

        // Calculate the hidden layer errors
        let hidden_errors = Matrix.transpose(this.weights_ho)
                            .multiply(output_errors)
                            ;


    }
}


const sigmoid = (x) => {
    return 1 / (1 + Math.exp(-x));
}