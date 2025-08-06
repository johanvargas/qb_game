// serialConnection.js

import { ReadlineParser } from "@serialport/parser-readline";
import { SerialPort } from "serialport";

const port = new SerialPort({ path: "COM10", baudRate: 115200 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

// Open the port and handle events
port.on("open", () => {
	console.log("Serial port opened. Listening for Nexmosphere data...");
});

// Listen for incoming data from Nexmosphere devices
parser.on("data", (data) => {
	console.log("Received:", data);
	// Example: Parse specific commands or responses
	//if (data.startsWith('X')) {
	//  console.log('Nexmosphere command detected:', data);
	// Add logic to handle specific commands or events
	//}
});

// Send command to XN-145
function sendCommand(command) {
	port.write(`${command}\r\n`, (err) => {
		if (err) {
			console.error("Error sending command:", err.message);
		} else {
			console.log("Command sent:", command);
		}
	});
}

function checkNexmo() {
	// Check device type, number of configured zones
	setTimeout(() => sendCommand("D007B[TYPE]"), 1000);
	setTimeout(() => sendCommand("X007B[ZONES?]"), 3000);
	setTimeout(() => sendCommand("X007B[FOI?]"), 4500);
}

function setupFoi() {
	// FOI
	// Create new FOI
	setTimeout(() => sendCommand("X007B[FOICORNER01=-045,-120]"), 1800);
	setTimeout(() => sendCommand("X007B[FOICORNER02=-045,+080]"), 2400);
	setTimeout(() => sendCommand("X007B[FOICORNER03=+045,+080]"), 3000);
	setTimeout(() => sendCommand("X007B[FOICORNER04=+045,-120]"), 3600);

	// Set new FOI
	setTimeout(() => sendCommand("X007B[RECALCULATEFOI]"), 4200);
}

function setupBoard() {
	/*** ZONES ***/
	// Clear default zones
	setTimeout(() => sendCommand("X007B[CLEARALLZONES]"), 1000);

	// Define active zone
	setTimeout(() => sendCommand("X007B[ZONE01=-010,+042,022,022]"), 2000);
	setTimeout(() => sendCommand("X007B[ZONE02=-041,+000,026,026]"), 3000);
	setTimeout(() => sendCommand("X007B[ZONE03=+019,+000,026,026]"), 4000);
	setTimeout(() => sendCommand("X007B[ZONE04=-000,-044,036,036]"), 5000);
	setTimeout(() => sendCommand("X007B[ZONE05=-042,-063,020,020]"), 6000);
	setTimeout(() => sendCommand("X007B[ZONE06=+022,-063,020,020]"), 7000);
	setTimeout(() => sendCommand("X007B[ZONE07=-019,-106,036,036]"), 8000);

	// Confirm number of zones
	setTimeout(() => sendCommand("X007B[ZONES?]"), 9000);

	// Adjust sensor behavior
	setTimeout(() => sendCommand("X007B[ZONE01DELAY=02]"), 10000);
	//setTimeout(() => sendCommand('X007B[ZONE01MINSIZE=15]'), 11000);
	//setTimeout(() => sendCommand('X007B[ZONE01MAXSIZE=025]'), 11600);

	// Further behavior adjustments
	// set multi dectection
	// setTimeout(() => sendCommand('X007S[4:1]'), 13900);
	// signal quality for detection.
	//setTimeout(() => sendCommand('X007S[8:100]'), 15800);
	// Completed
	setTimeout(() => console.log("Setup Complete"), 20000);
}

function ledControl() {
	setInterval(() => sendCommand("X003B[240005]"), 1000);
}

if (process.argv[2] === "check") {
	checkNexmo();
}
if (process.argv[2] === "updatezones") {
	setupBoard();
}
if (process.argv[2] === "setupfoi") {
	setupFoi();
}
if (process.argv[2] === "led") {
	ledControl();
}
