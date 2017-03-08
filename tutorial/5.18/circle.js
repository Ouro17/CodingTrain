function Circle(x, y, r) {
    let options = {
        friction: 0.3,
        restitution: 0.6
    }

    this.r = r;
    this.body = Bodies.circle(x, y, r, options);

    World.add(world, this.body);
}

Circle.prototype.show = function() {
    let pos   = this.body.position;

    push();
    translate(pos.x, pos.y);
    rotate(this.body.angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(255);
    fill(127);
    ellipse(0, 0, this.r * 2);
    pop();
}
