class Bird {
    constructor(x, y, width, height) {
        this.x        = x;
        this.y        = y;
        this.width    = width;
        this.height   = height;
        this.gravity  = 0.2;
        this.velocity = 0;
        this.lift     = -5;
    }

    show() {
        fill(255);
        ellipse(this.x, this.y, this.width, this.height);
    }

    update() {
        this.changeSpeed(this.velocity + this.gravity);
        this.y += this.velocity;

        if (this.y >= height) {
            this.y = height;
            this.changeSpeed(0);
        }
        else if (this.y <= 0) {
            this.y = 0;
            this.changeSpeed(0);
        }
    }

    up() {
        this.velocity += this.lift;
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
}