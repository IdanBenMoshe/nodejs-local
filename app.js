require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const port = process.env.PORT || 8000;
const { spawn } = require('child_process');
const axios = require('axios').default;
const firebase = require('./src/firebase');
const DB = require('./src/db');

const db = new DB();
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = http.createServer(app);

let serverId;

if(db.getServerId() === null) {
    (async () => { serverId = await axios.get('https://pool-off.eu.ngrok.io/getbackendId')
        .then(res => { return { id: res.data.id, status: 200 } })
        .catch(err => { return { error: err.response.data, status: 500 } });
    })()
    .then(() => {
        if(serverId.status === 200) 
            db.setServerId(serverId.id);
        else {
            server.close();
            return;
        }
    });
}

/*const python = spawn('python3', ['proc.py']);

python.stdout.on('data', data => {
    let token = db.getToken();
    let messages = [];

    messages.push({
        to: token,
        sound: null,
        title: 'PoolOff',
        body: data.toString(),
        data: { body: data.toString() }
    });

    let chunks = expo.chunkPushNotifications(messages);

    (async () => {
        try {
            let receipts = await expo.sendPushNotificationsAsync(chunks[0]);
            console.log(receipts);
        }
        catch (error) {
            console.log(error);
        }
    })();
});

python.stdout.on('error', err => console.log(err));

python.on('close', code => console.log(code));*/

server.listen(port, () => console.log(`App is listening in ${port}`));





