class NeuralNetwork {
    // input, hidden, output, learning rate
    constructor(a, b, c, d) {
        if (a instanceof Object || a instanceof NeuralNetwork) {
            this.times_trained = a.times_trained;
            this.input_nodes   = a.input_nodes;
            this.hidden_nodes  = a.hidden_nodes;
            this.output_nodes  = a.output_nodes;
            this.learning_rate = a.learning_rate;
            this.weights = [];

            for(let data of a.weights) {
                this.weights.push(new Matrix(data.data));
            }

            this.biases = [];

            for(let data of a.bias) {
                this.biases.push(new Matrix(data.data));
            }

            // TODO pass the activation function?
            this.setActivactionFunction();
        }
        else {
            this.input_nodes  = a;
            this.hidden_nodes = b;
            this.output_nodes = c;

            this.weights = [];

            // first hidden layer
            this.weights.push(new Matrix(this.hidden_nodes[0], this.input_nodes, true));

            // Rest of the layers
            for (let i = 1; i < this.hidden_nodes.length; ++i) {
                this.weights.push(new Matrix(this.hidden_nodes[i], this.hidden_nodes[i - 1], true));
            }

            // Last layer        
            this.weights.push(new Matrix(this.output_nodes, this.hidden_nodes[this.hidden_nodes.length - 1], true));

            // this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes, true);
            // this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes, true);

            this.biases = [];

            for(const data of this.hidden_nodes) {
                this.biases.push(new Matrix(data, 1, true));
            }

            // Last bias
            this.biases.push(new Matrix(this.output_nodes, 1, true));

            this.learning_rate = d;

            this.times_trained = 0;

            this.setActivactionFunction();
        }
    }

    predict(input_array) {

        const layers = [];

        layers.push(
             Matrix.multiply(this.weights[0], new Matrix(input_array))
                    .add(this.biases[0])
                    .map(this.activation_function.func)
        );

        // Generating the Hidden Output
        for (let i = 1; i < this.weights.length; ++i) {
            layers.push(
                 Matrix.multiply(this.weights[i], layers[i - 1])
                        .add(this.biases[i])
                        .map(this.activation_function.func)
            );
        }

        // Generating the output's output!
        return layers[layers.length - 1].toArray();
    }

    train(input_array, target_array) {
        let inputs = new Matrix(input_array);

        const layers = [];

        layers.push(
             Matrix.multiply(this.weights[0], inputs)
                    .add(this.biases[0])
                    .map(this.activation_function.func)
        );

        // Generating the Hidden Output
        for (let i = 1; i < this.weights.length; ++i) {
            layers.push(
                 Matrix.multiply(this.weights[i], layers[i - 1])
                        .add(this.biases[i])
                        .map(this.activation_function.func)
            );
        }

        let targets = new Matrix(target_array);

        // Calculate the error
        // ERROR = TARGETS - OUTPUTS
        let outputs_errors = Matrix.subtract(targets, layers[layers.length - 1]);

        const errors = [];

        for (let layer = layers.length - 1; layer >= 0; --layer) {
            // Calculate the error
            let error_index = layers.length - 1 - layer;

            if (layer == (layers.length - 1)) {
                errors.push(outputs_errors);
            }
            else {
                // δ(l)=(Θ(l))Tδ(l+1)
                // Calculate the next layer from us, because the last layer is just a differential.
                errors.push(Matrix.multiply(Matrix.transpose(this.weights[layer + 1]), errors[error_index - 1]));
            }

            // Calculate gradient
            let gradients = Matrix.map(layers[layer], this.activation_function.dfunc)
            .hadamard(errors[error_index])
            .multiply(this.learning_rate)
            ;

            // Adjust the weights by deltas (// Calculate deltas)
            this.weights[layer].add(Matrix.multiply(gradients, Matrix.transpose(
                // previous layer (output is last layer)
                // if first layer, then inputs
                (0 == layer) ?
                    inputs :
                    layers[layer - 1]
                )));

            // Adjust the bias by its deltas (which is just the gradients)
            this.biases[layer].add(gradients);
        }

        this.times_trained++;
    }

    print() {
        let r = '[';

        for(let i = 0; i < this.hidden_nodes.length; ++i) {
            r += this.hidden_nodes[i];

            if (i != (this.hidden_nodes.length - 1)) {
                r += ', ';
            }

        }

        r += ']';

        console.log('Nodes: [' + this.input_nodes + ', '
                        + r + ', ' 
                        + this.output_nodes
                        + ']');

        console.log('Current weights: ');

        for(const matrix of this.weights) {
            matrix.print();
        }

        console.log('Current bias: ');
        for(const matrix of this.biases) {
            matrix.print();
        }

        console.log('Learning rate: ' + this.learning_rate);
        console.log('Times trained: ' + this.times_trained);
    }

    serialize() {
        return JSON.stringify(nn);
    }

    setLearningRate(value) {
        this.learning_rate = (value > 0) ? value : 0.1;
    }

    setActivactionFunction(func = sigmoid) {
        this.activation_function = func;
    }

    copy() {
        return new NeuralNetwork(this);
    }

    mutate(rate) {
        const mutation = val => {
            return (Math.random() < rate) ? ((Math.random() * 2) - 1) : val;
        }

        for (const matrix of this.weights) {
            matrix.map(mutation);
        }

        for (const bias of this.biases) {
            bias.map(mutation);
        }
    }
}

class ActivationFunction {
    constructor(func, dfunc) {
        this.func = func;
        this.dfunc = dfunc;
    }
}

const sigmoid = new ActivationFunction(
    x => 1 / (1 + Math.exp(-x)),
    y => y * (1 - y)
);

const tanh = new ActivationFunction(
    x => Math.tanh(x),
    y => 1 - (y * y)
);
