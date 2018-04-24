class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.matrix = [];

        this.init();
    }

    show() {
        console.table(this.matrix);
    }

    map(apply, n) {
        for (let i = 0; i < this.rows; ++i) {
            for (let j = 0; j < this.cols; ++j) {
                this.matrix[i][j] = apply(this.matrix[i][j], (n instanceof Matrix) ? n.matrix[i][j] : n);
            }
        }
    }

    init() {
        for (let i = 0; i < this.rows; ++i) {
            this.matrix[i] = [];
        }

        this.map((i, j) => 0, 0);

        return this;
    }

    randomize() {
        this.map((i, j) => Math.floor(Math.random() * 10), 0);

        return this;
    }

    add(n) {
        this.map((i, j) =>  i + j, n);

        return this;
    }

    multiply(n) {
        if (n instanceof Matrix) {
            // Matrix product
            if (this.cols !== n.rows) {
                console.log('Columns of A must match rows of B');
                return undefined;
            }

            let result = new Matrix(this.rows, n.cols);
            let A = this.matrix;
            let B = n.matrix;
            let C = result.matrix;

            for (let i = 0; i < result.rows; ++i) {
                for (let j = 0; j < result.cols; ++j) {
                    // Dot product of values in col
                    let sum = 0;
                    for (let k = 0; k < this.cols; ++k) {
                        sum += A[i][k] * B[k][j];
                    }

                    C[i][j] = sum;
                }
            }

            return result;
        } else {
            //scalar
            this.map((i, j) =>  i * j, n);
        }


        return this;
    }

    transpose() {
        let result = new Matrix(this.cols, this.rows); 


        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                result.matrix[j][i] = this.matrix[i][j]; 
            }
        }

        return result;
    }
}