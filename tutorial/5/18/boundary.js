function Boundary(x, y, w, h, a) {

    let options = {
        friction: 0.3,
        restitution: 0.6,
        angle: a,
        isStatic: true
    }

    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;

    World.add(world, this.body);
}

Boundary.prototype.show = function() {
    let pos   = this.body.position;

    push();
    translate(pos.x, pos.y);
    rotate(this.body.angle);
    rectMode(CENTER);
    strokeWeight(1);
    noStroke();
    fill(0);
    rect(0, 0, this.w, this.h);
    pop();
}
