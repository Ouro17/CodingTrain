// Sandpiles

// matrix
let sandpiles, nextpiles;
let col;
let num;

function setup () {
    createCanvas(200, 200);

    sandpiles = Array(width).fill().map(() => Array(height).fill(0));

    sandpiles[width / 2][height / 2] = 10000000;
}

function draw() {
    render();
    for (let i = 0; i <= 50; i++) {
        topple();
    }
}

function render() {
    loadPixels();

    for(let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            num = sandpiles[x][y];

            switch(num) {
                case 0:
                    col = color(255, 255, 0);
                    break;
                case 1:
                    col = color(0, 185, 63);
                    break;
                case 2:
                    col = color(0, 104, 255);
                    break;
                case 3:
                    col = color(122, 0, 229);
                    break;
                default:
                    col = color(255, 0, 0);
                    break;
            }

            // sets the pixel
            set(x, y, col);
        }
    }

    updatePixels();
}

function topple() {
    nextpiles = Array(width).fill().map(() => Array(height).fill(0));

    // Copy the ones that doesnt move
    for(let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            num = sandpiles[x][y];

            if (num < 4) {
                nextpiles[x][y] = sandpiles[x][y];
            }
        }
    }

    // Move the sand
    for(let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            num = sandpiles[x][y];

            if (num >= 4) {
                nextpiles[x][y] += num - 4;
                if (x + 1 < width){
                    nextpiles[x + 1][y]++;
                }

                if (x - 1 > 0) {
                    nextpiles[x - 1][y]++;
                }

                if (y + 1 < height) {
                    nextpiles[x][y + 1]++;
                }

                if (y > 0) {
                    nextpiles[x][y - 1]++;
                }                
            }
        }
    }

    sandpiles = nextpiles;
}