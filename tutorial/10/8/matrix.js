class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.matrix = [];

        this.init();
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
        this.map((i, j) =>  i * j, n);

        return this;
    }
}