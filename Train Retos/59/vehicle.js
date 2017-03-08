function Vehicle(x, y) {
    // this.pos      = createVector(x, y);
    this.pos      = createVector(random(width), random(height));
    this.target   = createVector(x, y);
    // this.vel      = createVector();
    this.vel      = p5.Vector.random2D();
    this.acc      = createVector();
    this.r        = 8;
    this.maxSpeed = 7;
    this.maxForce = 0.75;

    this.red   = round(random(0, 255));
    this.blue  = round(random(0, 255));
    this.green = round(random(0, 255));
}

Vehicle.prototype.behaviors = function() {
    let mouse  = createVector(mouseX, mouseY);
    let arrive = this.arrive(this.target);
    let flee   = this.flee(mouse);

    arrive.mult(1);
    flee.mult(5);

    this.applyForce(arrive);
    this.applyForce(flee);
}

Vehicle.prototype.applyForce = function (f) {
    this.acc.add(f);
}

Vehicle.prototype.arrive = function(target) {
    let desired  = p5.Vector.sub(target, this.pos);
    let distance = desired.mag();
    let speed = this.maxSpeed;

    if (distance < 100) {
        speed = map(distance, 0 , 100, 0, this.maxSpeed);
    }

    desired.setMag(speed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
}

Vehicle.prototype.seek = function(target) {
    let desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
}

Vehicle.prototype.flee = function(target) {
    let desired = p5.Vector.sub(target, this.pos);
    let distance = desired.mag();
    let result = createVector();

    if (distance < 50) {
        desired.setMag(this.maxSpeed);
        desired.mult(-1);
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        result = steer;
    }

    return result;
}

Vehicle.prototype.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
}

Vehicle.prototype.show = function() {
    stroke(this.red, this.blue, this.green);
    strokeWeight(this.r);
    point(this.pos.x, this.pos.y);
}
