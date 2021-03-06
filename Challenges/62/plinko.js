function Plinko(x, y, r) {
    const options = {
        restitution: 0,
        friction: 1,
        isStatic: true
    };

    this.r = r;
    this.body = Bodies.circle(x, y, r, options);
    this.body.label = "plinko";
    World.add(world, this.body);
}

Plinko.prototype.show = function () {
    fill(255);
    stroke(255);
    push();
    translate(this.body.position.x, this.body.position.y);
    ellipse(0, 0, this.r * 2);
    pop();
};
