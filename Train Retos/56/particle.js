function Particle(x, y) {
    this.pos  = createVector(x, y);
    this.prev = createVector(x, y);

    this.vel = createVector();
    // this.vel = p5.Vector.random2D();
    // this.vel.setMag(random(2, 5));
    this.acc = createVector();

    this.update = function() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.show = function() {
        stroke(255);
        strokeWeight(3);
        // point(this.pos.x, this.pos.y);
        line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);

        this.prev.x = this.pos.x;
        this.prev.y = this.pos.y;
    }

    this.attracted = function(target) {
        let G        = 5;
        let force    = p5.Vector.sub(target, this.pos);
        let d = constrain(force.mag(), 0.0001, 25);

        force.setMag(G / (d*d));

        if (d < 20) {
            force.mult(-10);
        }

        this.acc.add(force);
    }
}
