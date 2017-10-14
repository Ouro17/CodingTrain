function setup() {
    noCanvas();

    let num = floor(random(10));
    console.log(num);

    let bot = new RiveScript();
    bot.loadFile("brain.rive", brainReady, brainError);

    let button = select('#submit');
    let user_input = select('#user_input');
    let output = select('#output');


    button.mousePressed(chat);

    function chat() {
        let input = user_input.value();
        let reply = bot.reply('local-user', input); 

        if(bot.getUservar('local-user', 'ok') == 1) {
            num = floor(random(10));
            bot.setVariable('num', num);
            bot.setUservar('local-user', 'ok', 0);
        }

        output.html(reply);
    }

    function brainReady(done) {
        console.log("Chat ready!");
        bot.sortReplies();
        bot.setVariable('num', num);
    }

    function brainError(error) {
        console.log("Chat error!");
        console.log(error);
    }
    
}

