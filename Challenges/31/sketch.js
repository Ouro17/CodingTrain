
let bird;
const pipes = [];

function setup () {
    createCanvas(640, 480);
    bird = new Bird(64, height / 2, 32, 32);

    pipes.push(new Pipe());
}

function draw() {
    background(0);

    for (let i = pipes.length - 1; i >= 0; --i) {
        pipes[i].update();
        

        if (pipes[i].hits(bird)) {
            pipes[i].hightlight = true;
            console.warn('HIT!!');
        }

        pipes[i].show();

        if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
        }
    }

    bird.update();
    bird.show();

    if (0 == (frameCount % 75)) {
        pipes.push(new Pipe());
    }
}

function keyPressed() {
    if (key == ' ') {
        bird.up();
    }
}