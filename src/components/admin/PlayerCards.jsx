import { useState, useEffect } from "react";
import { getDeck } from "../../utils/localStorage.js";
import star from "../../assets/Star.png";

export const PlayerCards = ({ deck }) => {
	const [state, setState] = useState(() => getDeck());

	useEffect(() => {
		setState(deck)
	}, [deck]);

	const playerCard = (item) => {
		const player = JSON.parse(item);
		return (
			<div
				className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-4 border border-blue-400/20 w-fit min-w-[200px] m-2"
				key={player.id}
			>
				<div className="flex items-center justify-center mb-3">
					<img className="h-5 w-5 opacity-80" src={star} alt="star" />
				</div>
				
				<div className="space-y-3">
					<div className="text-center">
						<h3 className="text-xl font-bold text-white mb-1 break-words">{player.name}</h3>
						<p className="text-blue-200 text-sm break-words">{player.store_location}</p>
					</div>
					
					<div className="bg-blue-500/20 rounded-lg p-2 text-center">
						<div className="text-xs text-blue-200 uppercase tracking-wide mb-1">Current Score</div>
						<div className="text-2xl font-bold text-yellow-300">{player.current_score}</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{state.map((item) => playerCard(item))}
		</div>
	);
};
