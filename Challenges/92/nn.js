class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes, learning_rate) {
        if (input_nodes instanceof Object) {
            this.times_trained = input_nodes.times_trained;
            this.input_nodes   = input_nodes.input_nodes;
            this.hidden_nodes  = input_nodes.hidden_nodes;
            this.output_nodes  = input_nodes.output_nodes;
            this.learning_rate = input_nodes.learning_rate;
            this.weights = [];

            for(let data of input_nodes.weights) {
                this.weights.push(new Matrix(data.data));
            }

            this.bias = [];

            for(let data of input_nodes.bias) {
                this.bias.push(new Matrix(data.data));
            }
        }
        else {
            this.input_nodes  = input_nodes;
            this.hidden_nodes = hidden_nodes;
            this.output_nodes = output_nodes;

            this.weights = [];

            // first hidden layer
            this.weights.push(new Matrix(this.hidden_nodes[0], this.input_nodes, true));

            // Rest of the layers
            for (let i = 1; i < hidden_nodes.length; ++i) {
                this.weights.push(new Matrix(this.hidden_nodes[i], this.hidden_nodes[i - 1], true));
            }

            // Last layer        
            this.weights.push(new Matrix(this.output_nodes, this.hidden_nodes[this.hidden_nodes.length - 1], true));

            // this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes, true);
            // this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes, true);

            this.bias = [];

            for(const data of hidden_nodes) {
                this.bias.push(new Matrix(data, 1, true));
            }

            // Last bias
            this.bias.push(new Matrix(this.output_nodes, 1, true));

            this.learning_rate = learning_rate;

            this.times_trained = 0;
        }
    }

    predict(input_array) {

        const layers = [];

        layers.push(
             Matrix.multiply(this.weights[0], new Matrix(input_array))
                    .add(this.bias[0])
                    .map(sigmoid)
        );

        // Generating the Hidden Output
        for (let i = 1; i < this.weights.length; ++i) {
            layers.push(
                 Matrix.multiply(this.weights[i], layers[i - 1])
                        .add(this.bias[i])
                        .map(sigmoid)
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
                    .add(this.bias[0])
                    .map(sigmoid)
        );

        // Generating the Hidden Output
        for (let i = 1; i < this.weights.length; ++i) {
            layers.push(
                 Matrix.multiply(this.weights[i], layers[i - 1])
                        .add(this.bias[i])
                        .map(sigmoid)
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
                // Se calcula de la layer siguiente a nosotros porque para la ultima layer es la diferencia normal.
                errors.push(Matrix.multiply(Matrix.transpose(this.weights[layer + 1]), errors[error_index - 1]));
            }

            // Calculate gradient
            let gradients = Matrix.map(layers[layer], dsigmoid)
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
            this.bias[layer].add(gradients);
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
        for(const matrix of this.bias) {
            matrix.print();
        }

        console.log('Learning rate: ' + this.learning_rate);
        console.log('Times trained: ' + this.times_trained);
    }

    save() {
        let a = document.createElement('a');
        a.href = 'data:' + 'data:text/json;charset=utf8,' + encodeURIComponent(JSON.stringify(this));
        a.download = 'nn.json';
        a.innerHTML = 'download JSON';

        // let container = document.getElementById('container');
        document.getElementsByTagName('body')[0].appendChild(a);
        a.click();
        a.remove();
    }

    setLearningRate(value) {
        this.learning_rate = (value > 0) ? value : 0.1;
    }
}


const sigmoid = (x) => {
    return 1 / (1 + Math.exp(-x));
}

const dsigmoid = (y) => {
    // return sigmoid(x) * (1 - sigmoid(x));
    return y * (1 - y);
}