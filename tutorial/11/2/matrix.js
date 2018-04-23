class Matrix {
    constructor(a, b, operation) {
        if (a instanceof Matrix) {
            // Copy the matrix
            this.rows = a.rows;
            this.cols = a.cols;
            this.copy(a.data);
        }
        else if (a instanceof Array && a[0] instanceof Array) {
            // Two dimensional array
            this.rows = a.length;
            this.cols = a[0].length;
            
            this.copy(a);
        }
        else if (a instanceof Array && !(a[0] instanceof Array)) {
            // One dimensional array
            this.rows = a.length;
            this.cols = 1;
            this.data = [];

            for (let i = 0; i < a.length; i++) {
                this.data[i] = [];
                this.data[i][0] = a[i];
            }
        }
        else {
            if (a === undefined || b === undefined) {
                console.error("Error: Need to be provided with rows and cols");
            }
            else {
                this.rows = a;
                this.cols = b;
                this.data = [];

                this.init();

                if (operation === true) {
                    this.randomize();
                }
                else if (typeof operation === "function") {
                    this.map(operation);
                }
            }
        }       
    }

    duplicate() {
        let m = new Matrix(this.rows, this.cols);

        for (let i = 0; i < this.rows; ++i) {
            for(let j = 0; j < this.cols; ++j) {
                m.data[i][j] = this.data[i][j];
            }
        }

        return m;
    }

    copy(matrixArray) {
        this.data = [];

        for (let i = 0; i < this.rows; ++i) {
            this.data[i] = [];
            
            for(let j = 0; j < this.cols; ++j) {
                this.data[i][j] = matrixArray[i][j];
            }
        }

        return this;
    }

    print() {
        console.table(this.data);

        return this;
    }

    map(apply) {
        for (let i = 0; i < this.rows; ++i) {
            for (let j = 0; j < this.cols; ++j) {
                this.data[i][j] = apply(this.data[i][j]);
            }
        }

        return this;
    }

    init() {
        for (let i = 0; i < this.rows; ++i) {
            this.data[i] = [];
        }

        return this.map((value) => 0);
    }

    randomize() {
        return this.map((value) => Math.random() * 2 - 1);
    }

    add(A) {
        return (A instanceof Matrix) ? 
                this.replace(Matrix.add(this, A))
                :
                this.map((value) =>  value + A);
    }

    subtract(A) {
        return (A instanceof Matrix) ? 
                this.replace(Matrix.subtract(this, A))
                :
                this.map((value) =>  value - A);
    }

    multiply(A) {
        return (A instanceof Matrix) ? 
                this.replace(Matrix.multiply(this, A))
                :
                this.map((value) =>  value * A);
    }

    hadamard(A) {
        return this.replace(Matrix.hadamard(this, A));
    }

    transpose() {
        return this.replace(Matrix.transpose(this));
    }

    replace(A) {
        if (A instanceof Matrix) {
            this.cols = A.cols;
            this.rows = A.rows;
            this.data = A.data;
        }

        return this;
    }

    toArray() {
        let array = [];

        for (let i = 0; i < this.rows; ++i) {
            for (let j = 0; j < this.cols; ++j) {
                array.push(this.data[i][j]);
            }
        }

        return array;
    }

    static add(A, B) {
        if (A instanceof Matrix && B instanceof Matrix) {
            if (A.cols !== B.cols || A.rows !== B.rows) {
                console.error('Can add matrices with distinct numbers of rows or cols');
            }
            else {
                let result = new Matrix(A.rows, A.cols);

                for (let i = 0; i < result.rows; ++i) {
                    for (let j = 0; j < result.cols; ++j) {
                        result.data[i][j] = A.data[i][j] + B.data[i][j];
                    }
                }

                return result;
            }
        }
        else {
            console.error("A or B arent Matrix");
        }
    }

    static subtract(A, B) {
        if (A instanceof Matrix && B instanceof Matrix) {
            if (A.cols !== B.cols || A.rows !== B.rows) {
                console.error('Can subtract matrices with distinct numbers of rows or cols');
            }
            else {
                let result = new Matrix(A.rows, A.cols);

                for (let i = 0; i < result.rows; ++i) {
                    for (let j = 0; j < result.cols; ++j) {
                        result.data[i][j] = A.data[i][j] - B.data[i][j];
                    }
                }

                return result;
            }
        }
        else {
            console.error("A or B arent Matrix");
        }
    }

    // Element wise multiplication
    static hadamard(A, B) {
         if (A instanceof Matrix && B instanceof Matrix) {
            if (A.cols !== B.cols || A.rows !== B.rows) {
                console.error('Matrices must have same dimensions');
            }
            else {
                let result = new Matrix(A.rows, A.cols);

                for (let i = 0; i < result.rows; ++i) {
                    for (let j = 0; j < result.cols; ++j) {
                        result.data[i][j] = A.data[i][j] * B.data[i][j];
                    }
                }

                return result; 
            }
         }
         else {
            console.error("A or B arent Matrix");
        }

    }

    static multiply(A, B) {
        if (A instanceof Matrix && B instanceof Matrix) {
            if (A.cols !== B.rows) {
                console.error('Columns of A must match rows of B');
            }
            else {
                let result = new Matrix(A.rows, B.cols);

                for (let i = 0; i < result.rows; ++i) {
                    for (let j = 0; j < result.cols; ++j) {
                        // Dot product of values in col
                        let sum = 0;
                        for (let k = 0; k < A.cols; ++k) {
                            sum += A.data[i][k] * B.data[k][j];
                        }

                        result.data[i][j] = sum;
                    }
                }

                return result; 
            }
        }
        else {
            console.error("A or B arent Matrix");
        }
    }

    static transpose(A) {
        if (A instanceof Matrix) {
            let result = new Matrix(A.cols, A.rows); 

            for (let i = 0; i < A.rows; i++) {
                for (let j = 0; j < A.cols; j++) {
                    result.data[j][i] = A.data[i][j]; 
                }
            }

            return result;
        }
        else {
            console.error('Tranpose must be on a Matrix');
        }
    }

    static map(A, apply) {
        if (A instanceof Matrix) {
            return new Matrix(A).map(apply);
        }
        else {
            console.error('First argument must be a Matrix');
        }
    }
}