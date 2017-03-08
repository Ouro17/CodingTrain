var symbolSize = 14;
var fadeInterval = 1.6;
var streams = [];

function setup() {
    createCanvas(window.innerWidth,
                 window.innerHeight);

    createStreams();
    textFont('Consolas');
    textSize(symbolSize);
}

function draw() {
    background(0, 150);

    streams.forEach(function(stream) {
        stream.render();
    });
}

function Symbol(x, y, speed, first, opacity) {
    this.x       = x;
    this.y       = y;
    this.speed   = speed;
    this.first   = first;
    this.opacity = opacity;
    this.switchInterval = round(random(2, 20));
    this.value;
}

Symbol.prototype.setToRandomSymbol = function () {
    if (frameCount % this.switchInterval == 0) {
        let charType = round(random(0, 5));
        this.value = (charType > 1) ?
            this.value = String.fromCharCode(
                0x30A0 + round(random(0, 96))
            )
            :
            round(random(0, 9));
    }
};

Symbol.prototype.render = function () {
    if (this.first) {
        fill(140, 255, 170, this.opacity);
    }
    else {
        fill(0, 255, 70, this.opacity);
    }

    text(this.value, this.x, this.y);
    this.rain();
    this.setToRandomSymbol();
};

Symbol.prototype.rain = function () {
    this.y = (this.y >= height) ? 0 : this.y + this.speed;
};

function Stream () {
    this.symbols = [];
    this.totalSymbols = round(random(5, 30));
    this.speed = random(5, 20);
}

Stream.prototype.generateSymbols = function (x, y) {
    let first = round(random(0, 4)) == 1;
    let opacity = 255;

    for (let i = 0; i < this.totalSymbols; ++i) {
        let symbol = new Symbol(x, y,
                                this.speed,
                                first,
                                opacity);
        symbol.setToRandomSymbol();
        this.symbols.push(symbol);
        y -= symbolSize;
        first = false;
        opacity -= (255 / this.totalSymbols) / fadeInterval;
    }
};

Stream.prototype.render = function () {
    this.symbols.forEach(function(symbol) {
        symbol.render();
    });
};

function createStreams() {
    let x = 0;

    for (let i = 0; i <= round(width / symbolSize); ++i) {
        let stream = new Stream();
        stream.generateSymbols(x, random(-2000, 0));
        streams.push(stream);
        x += symbolSize;
    }
}
