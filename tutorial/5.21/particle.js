function Particle(x, y, r, fixed) {
    let options = {
        friction: 0,
        restitution: 0.95,
        isStatic: fixed
    }

    this.r = r;
    this.body = Bodies.circle(x, y, r, options);

    World.add(world, this.body);
}

Particle.prototype.show = function() {
    let pos = this.body.position;

    push();
    translate(pos.x, pos.y);
    rotate(this.body.angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(255);
    fill(127);
    ellipse(0, 0, this.r * 2);
    //stroke(127);
    line(0, 0, this.r, 0);
    pop();
}

Particle.prototype.isOffScreen = function() {
    return this.body.position.y > height + 10;
}

Particle.prototype.removeFromWorld = function () {
    World.remove(world, this.body);
};
