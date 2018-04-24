class Point {
    constructor(x, y, userData) {
        this.x = x;
        this.y = y;
        this.userData = userData;
    }
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point) {
        return point.x >= (this.x - this.w) &&
               point.x <= (this.x + this.w) &&
               point.y >= (this.y - this.h) &&
               point.y <= (this.y + this.h)
               ;
    }

    intersects(range) {
        return !((range.x - range.w) > (this.x + this.w) ||
                 (range.x + range.w) < (this.x - this.w) ||
                 (range.y - range.h) > (this.y + this.h) ||
                 (range.y + range.h) < (this.y - this.h));

    }
}

class Circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.rSquared = this.r * this.r;
    }

    contains(point) {
        // check if the point is in the circle by checking if the euclidean distance of
        // the point and the center of the circle if smaller or equal to the radius of
        // the circle

        return (Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2)) <= this.rSquared;
    }

    intersects(range) {
        let xDist = Math.abs(range.x - this.x);
        let yDist = Math.abs(range.y - this.y);

        let edges = Math.pow((xDist - range.w), 2) + Math.pow((yDist - range.h), 2);

        // no intersection
        if (xDist > (this.r + range.w) || yDist > (this.r + range.h))
          return false;

        // intersection within the circle
        if (xDist <= range.w || yDist <= range.h)
          return true;

        // intersection on the edge of the circle
        return edges <= this.rSquared;
    }
}

class QuadTree {
    constructor(boundary, n) {
        this.boundary = boundary;
        this.capacity = n;
        this.points = [];
        this.divided = false;
    }

    subdivide() {
        let w2 = this.boundary.w / 2;
        let h2 = this.boundary.h / 2;
        let xpw2 = this.boundary.x + w2;
        let xmw2 = this.boundary.x - w2;
        let yph2 = this.boundary.y + h2;
        let ymh2 = this.boundary.y - h2;

        this.northeast = new QuadTree(new Rectangle(xpw2, ymh2, w2, h2), this.capacity);
        this.northwest = new QuadTree(new Rectangle(xmw2, ymh2, w2, h2), this.capacity);
        this.southeast = new QuadTree(new Rectangle(xpw2, yph2, w2, h2), this.capacity);
        this.southwest = new QuadTree(new Rectangle(xmw2, yph2, w2, h2), this.capacity);

        this.divided = true;
    }

    insert(point) {

        if (!this.boundary.contains(point)) {
            return false;
        }

        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        }
        else {
            if (!this.divided) {
                this.subdivide();
            }
            
            return this.northeast.insert(point) || 
                   this.northwest.insert(point) ||
                   this.southeast.insert(point) ||
                   this.southwest.insert(point)
            ;
        }
    }

    query(range, found) {
        if (!found) {
            found = [];
        }

        if (this.boundary.intersects(range)) {
            for (let p of this.points) {
                if (range.contains(p)) {
                    found.push(p);
                }
            }

            if (this.divided) {
                this.northwest.query(range, found);
                this.northeast.query(range, found);
                this.southwest.query(range, found);
                this.southeast.query(range, found);
            }
        }

        return found;
    }

    show() {
        stroke(255);
        strokeWeight(1);
        noFill();
        rectMode(CENTER);
        rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);

        if (this.divided) {
            this.northeast.show();
            this.northwest.show();
            this.southeast.show();
            this.southwest.show();
        }

        for(let p of this.points) {
            strokeWeight(2);
            point(p.x, p.y);
        }
    }
}