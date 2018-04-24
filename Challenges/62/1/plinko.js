function Plinko(x, y, r) {
    const options = {
        restitution: 0.5,
        friction: 0,
        isStatic: true
    };

    this.r = r;
    this.body = Bodies.circle(x, y, r, options);
    World.add(world, this.body);
}

Plinko.prototype.show = function () {
    fill(0, 255, 0);
    stroke(255);
    push();
    translate(this.body.position.x, this.body.position.y);
    ellipse(0, 0, this.r * 2);
    pop();
};
