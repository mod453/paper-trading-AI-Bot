require('dotenv').config();

const Alpaca = require('@alpacahq/alpaca-trade-api');
alpaca = new Alpaca()
const WebSocket = require('ws');

const wss = new WebSocket('wss://stream.data.alpaca.markets/v1beta1/news');

wss.on('open', function(){

    const authMsg = {
    action: 'auth',
    key: process.env.APCA_API_KEY_ID,       
    secret: process.env.APCA_API_SECRET_KEY 
    };


    wss.send(JSON.stringify(authMsg));

    const subscribeMsg = {
        action: 'subscribe',
        news: ['*'] 
    };

    wss.send(JSON.stringify(subscribeMsg));
})
wss.on('message', async function(message) {
    console.log('Received message:', message.toString());

    const currentEvent = JSON.parse(message)[0];
    if (currentEvent.T === 'n') {

        let companyImpact = 0;

        const apiRequestBody = {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "respond only with a number between 1 to 100 based on the positivity of impact of headline on the company"
                },
                {
                    role: "user",
                    content: "given the headline '" + currentEvent.headline + "', respond only with a number between 1 to 100 based on the positivity of impact of headline on the company"
                }
            ]
        };

        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        })
        .then((data) => {
            return data.json();
        })
        .then(async (data) => {
            console.log(data);
            if (data.choices && data.choices.length > 0) {
                console.log(data.choices[0].message);
                companyImpact = parseInt(data.choices[0].message.content);
            } else {
                console.log("Fallback: GPT unavailable, using dummy impact = 75");
                companyImpact = 75;
            }

            const tickerSymbol = currentEvent.symbols[0];

            if(companyImpact >= 70) { 
                let order = await alpaca.createOrder({
                    symbol: tickerSymbol,
                    qty: 1,
                    side: 'buy',
                    type: 'market',
                    time_in_force: 'day' 
                });
                console.log("BUY ORDER PLACED", order);
            } else if (companyImpact <= 30) { 
                let closedPosition = await alpaca.closePosition(tickerSymbol); 
                console.log("POSITION CLOSED", closedPosition);
            }
        });
    }
});

