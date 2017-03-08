function Firework() {
    this.hu = random(255);
    this.firework  = new Particle(random(width), height, this.hu, true);
    this.exploded  = false;
    this.particles = [];
    this.quantity  = 50;

    this.done = function() {
        return this.exploded && this.particles.length == 0;
    }

    this.update = function() {
        if (!this.exploded) {
            this.firework.applyForce(gravity);
            this.firework.update();

            if (this.firework.vel.y >= 0) {
                this.exploded = true;
                this.explode();
            }
        }
        else {
            for (let i = this.particles.length - 1; i >= 0 ; --i) {
                this.particles[i].applyForce(gravity);
                this.particles[i].update();
                if (this.particles[i].done()) {
                    this.particles.splice(i, 1);
                }
            }
        }

    }

    this.explode = function() {
        for (let i = 0; i < this.quantity; ++i) {
            let p = new Particle(this.firework.pos.x,
                                 this.firework.pos.y,
                                 this.hu, false);
            // let y = 13 * cos(i) - 5 *cos(2*i) - 2 * cos(3 * i) - cos(4*i);
            // let x = 16 * pow(sin(i), 3);
            // let p = new Particle(this.firework.pos.x + x, this.firework.pos.y + (-1) * y);

            this.particles.push(p);
        }
    }

    this.show = function() {
        if (!this.exploded) {
            this.firework.show();
        }
        else {
            for (let i = 0; i < this.particles.length; ++i) {
                this.particles[i].show();
            }
        }
    }
}
