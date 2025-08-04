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

// Serial Connection
import { SerialPort }  from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
const serial_port = new SerialPort({ path: 'COM10', baudRate: 115200});

console.log(serial_port)

serial_port.on('open', () => {
    console.log('Serial port opened. Listening for Nexmosphere data...');
});
const command = 'X003B[240405]'

serial_port.write(`${command}\r\n`, (err) => {
  if (err) {
    console.log('error sending command: ', err.message)
  }
  console.log('command sent: ', command)
})

const parser = serial_port.pipe(new ReadlineParser({ delimiter: '\r\n'}));
const dataHold = ''
parser.on('data', (data) => {
  //setInterval(() => {
  //  serial_port.write('X001B[103C96FF]', (err) => {
//	 if (err) {
//	   console.log('error sending command: ', err.message)
//	 }
//	 console.log('command sent: ', command)
  //  })
  //}, 2000)

  if ( data === 'X007B[ZONE01=EXIT]') {
	 console.log('Signal Received:', data);
	 io.emit('serialdata', { data: data, time: Date.now(), point: 10 });
	 //serial_port.close()
	 //serial_port.on('open', () => console.log('connection reestablished with NEXMO'))
  };
  if ( data === 'X007B[ZONE02=EXIT]') {
	 console.log('Signal Received:', data);
	 io.emit('serialdata', { data: data, time: Date.now(), point: 5 });
  };
  if ( data === 'X007B[ZONE03=EXIT]') {
	 console.log('Signal Received:', data);
	 io.emit('serialdata', { data: data, time: Date.now(), point: 5});
  };
  if ( data === 'X007B[ZONE04=EXIT]') {
	 console.log('Signal Received:', data);
	 io.emit('serialdata', { data: data, time: Date.now(), point: 1});
  };
  if ( data === 'X007B[ZONE05=EXIT]') {
	 console.log('Signal Received:', data);
	 io.emit('serialdata', { data: data, time: Date.now(), point: 6 });
  };
  if ( data === 'X007B[ZONE06=EXIT]') {
	 console.log('Signal Received:', data);
	 io.emit('serialdata', { data: data, time: Date.now(), point: 6 });
  };
  if ( data === 'X007B[ZONE07=EXIT]') {
	 console.log('Signal Received:', data);
	 io.emit('serialdata', { data: data, time: Date.now(), point: 1 });
  };
  console.log('Signal Received:', data);
});
