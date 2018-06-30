let wordnikAPI = 'https://api.wordnik.com/v4/words.json/randomWord?&minLength=3&maxLength=5&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7';
let giphyAPI = 'https://api.giphy.com/v1/gifs/search?rating=PG&api_key=dc6zaTOxFJmzC&q=';

function setup () {
    noCanvas();

    wordGIF()
    .then(results => {
        console.log(results);
        createP(results.word);
        createImg(results.img);
    })
    .catch(err => console.error(err));
}

async function wordGIF() {
    const response = await fetch(wordnikAPI);
    const json = await response.json();
    const response2 = await fetch(giphyAPI + json.word);
    const json2 = await response2.json();

    return {
        word: json.word,
        img: json2.data[0].images['fixed_height_small'].url
    }
}