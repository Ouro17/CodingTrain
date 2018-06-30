function setup () {
    noCanvas();

    delayES8(1000)
    .then(() => console.log('hello'))
    .catch(err => console.error(err));
}

async function delayES8(time) {
    // This function returns a promise!
    await delay(time);
    await delay(time);
    await delay(time);
    await delay(time);

    return;
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