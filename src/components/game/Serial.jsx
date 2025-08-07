import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Header } from "../shared/Header.jsx";
import gradientBg from "../../assets/gradient_blue_bg.png";

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
		<div 
			className="flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat fixed inset-0"
			style={{ backgroundImage: `url(${gradientBg})` }}
		>
			<div className="flex flex-col items-center justify-center flex-1 w-full">
				<div className="transform scale-105 mb-8">
					<Header />
				</div>
				<div className="text-center text-white">
					<div className="text-6xl mb-6">
						Last Serial Command Received: <span className="font-bold">{serialData}</span>
					</div>
					<div className="bg-green-500 text-center rounded-sm p-6">
						<p className="text-5xl text-white">Score</p>
						<p className="text-8xl font-bold text-white mb-4">
							{score}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
