let qtree;
let range;

function setup() {
    createCanvas(400, 400);

    let boundary = new Rectangle(200, 200, 200, 200);
    qtree = new QuadTree(boundary, 4);
}

function draw() {
    background(0);
    strokeWeight(1);

    qtree.show();

    stroke(0, 255, 0);
    rectMode(CENTER);

    range = new Rectangle(mouseX, mouseY, 25, 25);

    rect(range.x, range.y, range.w * 2, range.h * 2);

    for (let p of qtree.query(range)) {
        strokeWeight(4);
        point(p.x, p.y);
    }
}

function mouseClicked() {
    if (LEFT === mouseButton) {
         qtree.insert(new Point(mouseX, mouseY));
    }
    else {
        for(let i = 0; i < 3; i++) {
            qtree.insert(new Point(mouseX + random(-5, 5), mouseY + random(-5, 5)));
        }
    }
}