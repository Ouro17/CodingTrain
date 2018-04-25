const TOTAL    = 250;
const birds    = [];
let savedBirds = []
let pipes      = [];
let counter    = 0;
let slider;

function setup () {
    createCanvas(640, 480);

    slider = createSlider(1, 100, 1);

    for(let i = 0; i < TOTAL; ++i) {
        birds.push(new Bird());
    }

    pipes.push(new Pipe());
}

function draw() {
    for (let n = 0; n < slider.value(); ++n) {
        if (0 == (counter % 75)) {
            pipes.push(new Pipe());
        }

        counter++;

        for (let i = pipes.length - 1; i >= 0; --i) {
            pipes[i].update();
            
            for (let j = birds.length - 1; j >= 0; --j) {
                if (pipes[i].hits(birds[j])) {
                    pipes[i].hightlight = true;
                    savedBirds.push(birds.splice(j, 1)[0]);
                }
            }

            if (pipes[i].offscreen()) {
                pipes.splice(i, 1);
            }
        }

        for (let i = birds.length - 1; i >= 0; --i) {
            if (birds[i].offscreen()) {
                savedBirds.push(birds.splice(i, 1)[0]);
            }
        }

        for(let bird of birds) {
            bird.think(pipes);
            bird.update();
        }

        if (0 == birds.length) {
            nextGeneration();
            pipes = [];
            counter = 0;
        }
    }

    // Draw stuff
    background(0);

    for (let bird of birds) {
        bird.show();
    }

    for (let pipe of pipes) {
        pipe.show();
    }
}

function keyPressed() {
    if (key === 'S') {
        let bird = birds[0];
        // let json = bird.brain.serialize();

        saveJSON(bird.brain, 'bird.json');
        console.log(json);
    }
}

function preload() {
    let birdBrain = loadJSON('bestBird.json');
}