import cors from "cors";
import express from "express";
import { Server as HttpServer } from "http";
import path from "path";
import { Server as SocketIOServer } from "socket.io";
import { fileURLToPath } from "url";

const app = express();
const server = new HttpServer(app);
const io = new SocketIOServer(server, {
	cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
});
const port = 8080;

app.use(cors());
server.listen(port, () =>
	console.log("Socket IO Server running on port " + port),
);

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

console.log(dirname);

app.use(express.static(dirname + "/"));

io.on("connection", (socket) => {
	console.log("socket id: ", socket.id);
});

import { ReadlineParser } from "@serialport/parser-readline";
// Serial Connection
import { SerialPort } from "serialport";

const serial_port = new SerialPort({ path: "COM10", baudRate: 115200 });

console.log(serial_port);

serial_port.on("open", () => {
	console.log("Serial port opened. Listening for Nexmosphere data...");
});

//const command = 'X003B[240405]'

//serial_port.write(`${command}\r\n`, (err) => {
//  if (err) {
//    console.log('error sending command: ', err.message)
//  }
//  console.log('command sent: ', command)
//})

const parser = serial_port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

function sendCommand(command) {
	serial_port.write(`${command}\r\n`, (err) => {
		if (err) {
			console.error("Error sending command:", err.message);
		} else {
			console.log("Command sent:", command);
		}
	});
}

setTimeout(() => sendCommand("X004B[230001]"), 50);
setTimeout(() => sendCommand("X005B[230001]"), 100);
setTimeout(() => sendCommand("X006B[230001]"), 150);
setTimeout(() => sendCommand("X001B[230001]"), 200);
setTimeout(() => sendCommand("X002B[230001]"), 250);
setTimeout(() => sendCommand("X003B[230001]"), 300);
setTimeout(() => sendCommand("X008B[230001]"), 350);

parser.on("data", (data) => {
	if (data === "X007B[ZONE01=EXIT]") {
		console.log("Signal Received:", data);
		io.emit("serialdata", { data: data, time: Date.now(), point: 10 });

		setTimeout(() => sendCommand("X001B[240301]"), 50);
		setTimeout(() => sendCommand("X001B[260001]"), 100);
		//serial_port.close()
		//serial_port.on('open', () => console.log('connection reestablished with NEXMO'))
	}
	if (data === "X007B[ZONE02=EXIT]") {
		console.log("Signal Received:", data);
		io.emit("serialdata", { data: data, time: Date.now(), point: 5 });

		setTimeout(() => sendCommand("X002B[240301]"), 50);
		setTimeout(() => sendCommand("X002B[260001]"), 500);
	}
	if (data === "X007B[ZONE03=EXIT]") {
		console.log("Signal Received:", data);
		io.emit("serialdata", { data: data, time: Date.now(), point: 5 });

		setTimeout(() => sendCommand("X003B[240301]"), 50);
		setTimeout(() => sendCommand("X003B[260001]"), 500);
	}
	if (data === "X007B[ZONE04=EXIT]") {
		console.log("Signal Received:", data);
		io.emit("serialdata", { data: data, time: Date.now(), point: 1 });

		setTimeout(() => sendCommand("X004B[240301]"), 50);
		setTimeout(() => sendCommand("X004B[260001]"), 500);
	}
	if (data === "X007B[ZONE05=EXIT]") {
		console.log("Signal Received:", data);
		io.emit("serialdata", { data: data, time: Date.now(), point: 6 });

		setTimeout(() => sendCommand("X005B[240301]"), 50);
		setTimeout(() => sendCommand("X005B[260001]"), 500);
	}
	if (data === "X007B[ZONE06=EXIT]") {
		console.log("Signal Received:", data);
		io.emit("serialdata", { data: data, time: Date.now(), point: 6 });

		setTimeout(() => sendCommand("X006B[240301]"), 50);
		setTimeout(() => sendCommand("X006B[260001]"), 500);
	}
	if (data === "X007B[ZONE07=EXIT]") {
		console.log("Signal Received:", data);
		io.emit("serialdata", { data: data, time: Date.now(), point: 1 });

		setTimeout(() => sendCommand("X008B[240301]"), 50);
		setTimeout(() => sendCommand("X008B[260001]"), 500);
	}
	//setTimeout(() => sendCommand('X001B[260301]'), 50);
	//setTimeout(() => sendCommand('X002B[260301]'), 100);
	//setTimeout(() => sendCommand('X003B[260301]'), 150);
	//setTimeout(() => sendCommand('X004B[260301]'), 200);
	//setTimeout(() => sendCommand('X005B[260301]'), 250);
	//setTimeout(() => sendCommand('X006B[260301]'), 300);
	//setTimeout(() => sendCommand('X008B[260301]'), 350);
});
