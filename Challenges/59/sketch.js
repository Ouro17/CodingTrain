var font;
var vehicles = [];
var phrase = 'Yasmina';

function preload() {
    font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
    createCanvas(900, 300);

    let points = font.textToPoints(phrase, 100, 200, 192);

    points.forEach(function(pt){
        vehicles.push(new Vehicle(pt.x, pt.y));
    });
}

function draw() {
    background(75);

    vehicles.forEach(function(vehicle) {
        vehicle.behaviors();
        vehicle.update();
        vehicle.show();
    });
}
