import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
const server = new HttpServer(app);
const io = new SocketIOServer(server, { cors: { origin: "http://localhost:5173", methods: ["GET", "POST"]}});
const port = 8080;

app.use(cors());
server.listen(port, () => console.log('Socket IO Server running on port ' + port));

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

console.log(dirname);

app.use(express.static(dirname + '/'));

io.on('connection', (socket) => {
	console.log('socket id: ', socket.id);
});

import { SerialPort }  from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
const serial_port = new SerialPort({ path: 'COM10', baudRate: 115200});

const parser = serial_port.pipe(new ReadlineParser({ delimiter: '\r\n'}));
parser.on('data', (data) => {
    // can parse from here, to points system
    if ( data === 'X007B[ZONE01=ENTER]') {
	   console.log('Signal Received:', data);
	   io.emit('serialdata', { data: 1 });
    };
    if ( data === 'X007B[ZONE02=ENTER]') {
	   console.log('Signal Received:', data);
	   io.emit('serialdata', { data: 5 });
    };
    if ( data === 'X007B[ZONE03=ENTER]') {
	   console.log('Signal Received:', data);
	   io.emit('serialdata', { data: 5 });
    };
    if ( data === 'X007B[ZONE04=ENTER]') {
	   console.log('Signal Received:', data);
	   io.emit('serialdata', { data: 10 });
    };
    if ( data === 'X007B[ZONE05=ENTER]') {
	   console.log('Signal Received:', data);
	   io.emit('serialdata', { data: 5 });
    };
    if ( data === 'X007B[ZONE06=ENTER]') {
	   console.log('Signal Received:', data);
	   io.emit('serialdata', { data: 5 });
    };
    if ( data === 'X007B[ZONE07=ENTER]') {
	   console.log('Signal Received:', data);
	   io.emit('serialdata', { data: 1 });
    };
    console.log('Signal Received:', data);
});
