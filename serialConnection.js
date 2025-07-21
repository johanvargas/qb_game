// serialConnection.js
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
//import EventEmitter from 'events';

const port = new SerialPort({ path: "COM10", baudRate: 115200 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n'}));

port.on('open', () => {
	console.log('Serial port opened!');
});

parser.on('data', (data) => {
	console.log('Serial Received: ', data);
});
