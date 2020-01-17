const http = require('http');
const app = require('./src/app');
const mongoose = require('mongoose');

const {setupWebsocket} = require('./src/websocket')

/** Conexão com a base de dados */
mongoose.connect(
    'urldatabase',
    {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true} 
);
mongoose.set('useFindAndModify', false);

const port = process.env.PORT || 3000;

const server = http.createServer(app);
setupWebsocket(server);
server.listen(port);