const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

const public = require('./public.json');
const config = require('./config.json');

app.use(cors({
    origin: '*'
}));

app.get('*', (req, res) => {
    let hostname = req.hostname;
    if (public.hasOwnProperty(hostname)) {
        let filePath = req.baseUrl + req.originalUrl;
        if (filePath == '/') filePath = path.join(__dirname, 'public', public[hostname]["folder"], 'index.html');
        else filePath = path.join(__dirname, 'public', public[hostname]["folder"],  filePath);
        res.sendFile(filePath);
        console.log(`Request: ${filePath}`);
    } else {
        res.send(req.hostname);
    }
});

app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
    const lists = [];
    for (const file in public) {
        if (public.hasOwnProperty(file)) {
            lists.push({ Link: file ,Server: public[file]['folder'] });
        }
    }
    console.log('\nWeb server lists: ');
    console.table(lists);
});