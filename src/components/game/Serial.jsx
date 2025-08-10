import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Header } from "../shared/Header.jsx";
import gradientBg from "../../assets/gradient_blue_bg.png";
import { updateDeckPlayerScore } from "../../utils/localStorage.js";

export const Serial = () => {
	const [serialData, setSerialData] = useState("Waiting...");
	const [score, setScore] = useState(0);
	const [points, setPoint] = useState(0);

	const socket = io("http://localhost:8080");

	useEffect(() => {
		socket.on("serialdata", (data) => {
			setSerialData(data.data);
			incrementScore(data.point);
		});
		localStorage.setItem("score", score);
		updateDeckPlayerScore(localStorage.getItem("current_player"), score);
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
					<div className="bg-green-500 pt-10 mt-10 text-center rounded-xl p-7 w-100 h-auto">
						<p className="text-5xl text-white">Score</p>
						<p className="text-9xl font-bold text-white mb-4">
							{score}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
