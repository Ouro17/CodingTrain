function setup () {
    noCanvas();

    delay(1000)
    .then(() => console.log('hello'))
    .catch(err => console.error(err));

    delay('promising')
    .then(() => console.log('hello'))
    .catch(err => console.error(err));
}

function delay(time) {
    return new Promise((resolve, reject) => {
        if (isNaN(time)) {
            reject(new Error('delay requires a valid number.'));
        }
        else {
            setTimeout(resolve, time);
        }
    }); 
}