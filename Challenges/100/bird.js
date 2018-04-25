class Bird {
    constructor(brain) {
        this.x        = 64;
        this.y        = height / 2;
        this.width    = 32;
        this.height   = 32;
        this.gravity  = 0.2;
        this.velocity = 0;
        this.lift     = -8;

        this.score   = 0;
        this.fitness = 0;

        if (brain instanceof NeuralNetwork) {
            this.brain = brain.copy();
        }
        else {
           this.brain = new NeuralNetwork(5, [8], 2, 0.1);
        }
    }

    closestPipe(pipes) {
        let closest = null;
        let closestD = Infinity;

        for (let i = 0; i < pipes.length; i++) {
            let d = (pipes[i].x + pipes[i].w) - this.x;
            if (d < closestD && d > 0) {
                closestD = d;
                closest = pipes[i];
            }
        }

        return closest;
    }

    mutate(func) {
        this.brain.mutate(func);
    }

    think(pipes) {
        let closest = this.closestPipe(pipes);
        let inputs = [];
        inputs.push(this.y / height);
        inputs.push(closest.top / height);
        inputs.push(closest.bottom / height);
        inputs.push(closest.x / width);
        inputs.push(this.velocity /10);

        let output = this.brain.predict(inputs);
        if (output[0] > output[1]) {
            this.up();
        }
    }

    show() {
        stroke(255);
        fill(255, 50);
        ellipse(this.x, this.y, this.width, this.height);
    }

    update() {
        this.score++;
        this.changeSpeed(this.velocity + this.gravity);
        this.y += this.velocity;
    }

    up() {
        if (this.velocity >= 0) {
            this.velocity += this.lift;
        }
    }

    changeSpeed(speed) {
        if (speed > 10) {
            this.velocity = 10;
        }
        else if (speed < -10) {
            speed = -10;
        }
        
        this.velocity = speed;
    }

    offscreen() {
        return this.y > height || this.y < 0;
    }
}