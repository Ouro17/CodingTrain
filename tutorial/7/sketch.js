let r, g, b;
let rgbDiv, bodyElement;
let ready = false;
let database, authPromise;

const buttons = [];

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
    authPromise = firebase.auth().signInAnonymously();

    createCanvas(100, 100).parent('#root');
    rgbDiv = createDiv().parent('#root');

    createCanvas(200, 200).parent('#root');
    rgbDiv = createDiv().parent('#root');
    bodyElement = document.body;
    
    pickColor();
    ready = true;
    rgbDiv.html(`R:${r} G:${g} B:${b}`);

    createP('What color do you think this is?').parent('#root');

    buttons.push(createButton('red-ish').parent('#root').class('red-ish'));
    buttons.push(createButton('green-ish').parent('#root').class('green-ish'));
    buttons.push(createButton('blue-ish').parent('#root').class('blue-ish'));
    buttons.push(createButton('orange-ish').parent('#root').class('orange-ish'));
    buttons.push(createButton('yellow-ish').parent('#root').class('yellow-ish'));
    buttons.push(createButton('pink-ish').parent('#root').class('pink-ish'));
    buttons.push(createButton('purple-ish').parent('#root').class('purple-ish'));
    buttons.push(createButton('brown-ish').parent('#root').class('brown-ish'));
    buttons.push(createButton('grey-ish').parent('#root').class('grey-ish'));

    for (let i = buttons.length - 1; i >= 0; i--) {
        buttons[i].mouseClicked(sendData);
    }

}

function pickColor() {
    r = floor(random(256));
    g = floor(random(256));
    b = floor(random(256));

    background(r, g, b);
    bodyElement.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 1.0)`;
}

async function sendData() {
    // send this data to firebase
    if (!ready) return;
    showLoading();

    let { user } = await authPromise;

    let colorDatabase = database.ref('colors');

    let data = {
        uid: user.uid,
        r: r,
        g: g,
        b: b,
        label: this.html()
    };

    let color = colorDatabase.push(data, (err) => {
        if (err) {
            console.error('ooops, something went wrong.');
            console.error(err);
        }
        else {
            console.info('Data saved successfully');
            setTimeout(hideLoading, 600);
        }
    });

    // new color
    pickColor();
}

function showLoading() {
  select('.loading').show();
  select('canvas').hide();
  for (button of buttons) button.addClass('disabled');
  ready = false;
}

function hideLoading() {
  select('.loading').hide();
  select('canvas').show();
  rgbDiv.html(`R:${r} G:${g} B:${b}`);
  for (button of buttons) button.removeClass('disabled');
  setTimeout(function(){ ready = true;}, 600);
}
