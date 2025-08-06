import { useState, useEffect } from "react";
import { io } from "socket.io-client";

export const Serial = () => {
	const [serialData, setSerialData] = useState("Waiting...");
	const [score, setScore] = useState(0);
	const [points, setPoint] = useState([]);

	const socket = io("http://localhost:8080");

	useEffect(() => {
		socket.on("serialdata", (data) => {
			setSerialData(data.data);
			incrementScore(data.point);
		});
		localStorage.setItem("score", score);
	}, [score, socket.on]);

	const incrementScore = (points) => {
		setScore(score + points);
	};

	return (
		<div className="flex flex-col bg-blue-400">
			<div>
				<div className="text-2xl">
					Last Serial Command Received:<span className="">{serialData}</span>
				</div>
			</div>
			<div className="bg-green-500 text-center rounded-sm">
				<p className="text-3xl justify-center">Score</p>
				<p className="text-6xl justify-center font-bold test-gray-800 mb-2">
					{score}
				</p>
			</div>
		</div>
	);
};
