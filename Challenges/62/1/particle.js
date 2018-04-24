function Particle(x, y, r) {

    const options = {
        restitution: 0.5,
        friction: 0
    };

    this.r = r;
    this.body = Bodies.circle(x, y, r, options);
    World.add(world, this.body);
}

Particle.prototype.show = function () {
    fill(255);
    stroke(255);
    push();
    translate(this.body.position.x, this.body.position.y);
    ellipse(0, 0, this.r * 2);
    pop();
};
