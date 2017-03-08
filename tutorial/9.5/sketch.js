var circles = [];

function setup() {
    createCanvas(640, 360);

    // Generate circles
    let protection = 0;
    let exit = false;
    while (!exit) {
        let circle = {
            x: random(width),
            y: random(height),
            r: random(1, 40),
            color: {
                red:   random(0, 255),
                blue:  random(0, 255),
                green: random(0, 255),
                alpha: random(25, 75)
            }
        };

        if (!checkOverlapping(circle)) {
            circles.push(circle);
        }
        else if (protection < 10000) {
            ++protection;
        }
        else {
            exit = true;
        }
    }

    // Draw
    for (let i = 0; i < circles.length; ++i) {
        let circle = circles[i];
        fill(circle.color.red, circle.color.blue,
             circle.color.green, circle.color.alpha);
        noStroke();
        ellipse(circle.x, circle.y, circle.r*2, circle.r*2);
    }


}

function checkOverlapping(circle) {
    let overlapping = false;
    let j = 0;

    while (!overlapping && j < circles.length) {
            let other = circles[j];
            let d = dist(circle.x, circle.y, other.x, other.y);

            overlapping = d < circle.r + other.r;
            ++j;
    }

    return overlapping;
}

function draw() {

}
