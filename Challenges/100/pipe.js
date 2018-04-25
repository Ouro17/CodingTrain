class Pipe {
    constructor() {
        this.spacing    = 125;
        this.top        = random(height / 6, 3 / 4 * height);
        this.bottom     = height - (this.top + this.spacing);
        this.x          = width;
        this.w          = 60;
        this.speed      = 2;
        this.hightlight = false;
    }

    show() {
        fill(255);
        if (this.hightlight) {
            fill(255, 0, 0);
        }

        rect(this.x, 0, this.w, this.top);
        rect(this.x, height - this.bottom, this.w, this.bottom);
    }

    update() {
        this.x -= this.speed;
        this.hightlight = false;
    }

    offscreen() {
        return this.x < -this.w;
    }

    hits(bird) {
        return (bird.y < this.top || (bird.y > (height - this.bottom))) &&
               (bird.x > this.x && (bird.x < (this.x + this.w)));
    }
}