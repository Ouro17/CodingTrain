let database, dataSave;

const buttons = [];

const resolution = 10;

let label = 'blue-ish';
let set, user;

const colorByLabel = {
    'blue-ish': [],
    'green-ish': [],
    'red-ish': [],
    'pink-ish': [],
    'purple-ish': [],
    'orange-ish': [],
    'grey-ish': [],
    'brown-ish': [],
    'yellow-ish': [],
}

function setup() {
    // Initialize Firebase
    const config = {
        apiKey: 'AIzaSyCdgTB9Y4PKz4Svdyg_Nxq2g7ZrHqew1dw',
        authDomain: 'crowdsource-color-65213.firebaseapp.com',
        databaseURL: 'https://crowdsource-color-65213.firebaseio.com',
        projectId: 'crowdsource-color-65213',
        storageBucket: 'crowdsource-color-65213.appspot.com',
        messagingSenderId: '279620511487'
    };

    firebase.initializeApp(config);
    database = firebase.database();
    let ref = database.ref('colors');
    ref.once('value', gotData); //, errorData);

}

function mousePressed() {
    let i = floor(mouseX / resolution);
    let j = floor(mouseY / resolution);
    let index = i + (j * (width / resolution));
    let data = colorByLabel[label];

    if (data[index] != undefined) {
        console.log(data[index]);
        user = data[index].uid;
        drawData();
    }
}

function gotData(results) {
    ready = true;

    let data = results.val();
    let keys = Object.keys(data);

    let dataByUser = [];

    for (let key of keys) {
        let record = data[key];
        colorByLabel[record.label].push(record);
    }

    set = colorByLabel[label];

    drawData(set.length * resolution, );
}

function drawData() {
    background(255);

    let x = 0;
    let y = 0;

    for (let i = 0; i < set.length; i++) {

        if (set[i].uid == user) {
            strokeWeight(1);
            stroke(51);
        }
        else {
            noStroke();
        }

        fill(set[i].r, set[i].g, set[i].b);
        rect(x, y, resolution, resolution);

        x += resolution;

        if (x >= width) {
            x = 0;
            y += resolution;
        }
    }
}