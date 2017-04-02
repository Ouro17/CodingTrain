function Boundary(x, y, w, h) {

    const options = {
        isStatic: true
    };

    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(x, y, w, h, options);
    World.add(world, this.body);
}

Boundary.prototype.show = function () {
    fill(127);
    stroke(0,255, 0);
    push();
    translate(this.body.position.x, this.body.position.y);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
};
