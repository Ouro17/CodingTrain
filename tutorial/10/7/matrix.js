function Matrix(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.matrix = [];

    this.init();
}

Matrix.prototype.map = function(apply, n) {
    for (var i = 0; i < this.rows; ++i) {
        for (var j = 0; j < this.cols; ++j) {
            this.matrix[i][j] = apply(this.matrix[i][j], (n instanceof Matrix) ? n.matrix[i][j] : n);
        }
    }
}

Matrix.prototype.init = function() {
    this.map(function(i, j) {
        return 0;
    }, 0);
}

Matrix.prototype.randomize = function() {
    this.map(function(i, j) {
        return Math.floor(Math.random() * 10);
    }, 0);
}

Matrix.prototype.add = function (n) {
    this.map(function sum (i, j) {
        return i + j;
    }, n);
}

Matrix.prototype.multiply = function (n) {
    this.map(function sum (i, j) {
        return i * j;
    }, n);
}
