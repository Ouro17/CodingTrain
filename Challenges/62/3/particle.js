function Particle(x, y, r) {
    this.hue = random(360);

    const options = {
        restitution: 0.9,
        friction: 0.5,
        density: 1,
        frictionStatic: 100

    };
    x += random(-1, 1);
    this.r = r;
    this.body = Bodies.circle(x, y, r, options);
    World.add(world, this.body);
}

Particle.prototype.isOffScreen = function () {
    const x = this.body.position.x;
    const y = this.body.position.y;
    return (x < -50 || x > width + 50 || y > height + 50);
};

Particle.prototype.show = function () {
    fill(this.hue, 255, 255);
    //stroke(255);
    push();
    translate(this.body.position.x, this.body.position.y);
    ellipse(0, 0, this.r * 2);
    pop();
};
