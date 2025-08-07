import { useEffect, useState } from "react";
import { useProps } from "./hooks/useProps.jsx";
import { getDeck } from "./utils/localStorage.js";

// assets
import leaderboard_title from "./assets/leaderboard_title.png";
import mockQuaterbacks from "./mockQuarterbacks.js";

// collects users stored in localStorage for use in state
const realPlayers = () => {
	const sendArray = getDeck().map(value => JSON.parse(value));

	//const sortedArray = sendArray.sort(
	//	(a, b) => b.current_score - a.current_score,
	//);
	const filterArray = sendArray.filter((a) => a.current_score > 0);

	return filterArray;
};

// probably should be called HomeScreen, but I'm not changing rn
export default function Home() {
	const [ranked, setRanked] = useState([]);
	const [hold, setHold] = useState("Hold Item");

	useEffect(() => {
		const updateRankings = () => {
			const realPlayerList = realPlayers();
			const mockQbs = mockQuaterbacks();

			if ( realPlayerList.length === 0 ) { 
				const playerSort = mockQbs.toSorted((a, b) => b.current_score - a.current_score)
				setRanked(playerSort.filter((item) => playerSort.indexOf(item) < 5 ))   
			} else {
				const playerSort = realPlayerList.toSorted((a, b) => b.current_score - a.current_score)
				setRanked(playerSort.filter((item) => playerSort.indexOf(item) < 5 ))   
			}
		};

		// Initial load
		updateRankings();

		// Set up polling to check for changes every 2 seconds
		const interval = setInterval(updateRankings, 2000);

		// Listen for storage events (when localStorage changes in other tabs/windows)
		const handleStorageChange = (e) => {
			if (e.key && e.key !== 'current_player') {
				updateRankings();
			}
		};
		window.addEventListener('storage', handleStorageChange);

		return () => {
			clearInterval(interval);
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);

	const Rank = (plops) => {
		const plug = Object.values(plops);
		const plugParsed = plug[0];
		const rank = plops.rank + 1;

		// Add medal icon for top 3 positions
		const getMedalIcon = () => {
			if (rank === 1) return "🥇";
			if (rank === 2) return "🥈";
			if (rank === 3) return "🥉";
			return "";
		};

		return (
		    	<tr className="mb-2">
				<td className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-blue-700 text-center p-2 sm:p-3 md:p-4 m-1">
					<strong>{getMedalIcon()}</strong>
				</td>
				<td className="font-bold text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl bg-blue-800 text-center uppercase p-2 sm:p-3 md:p-4 break-words m-1">
					{plugParsed.store_location}
				</td>
				<td className="font-bold text-white bg-blue-700 text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl p-2 sm:p-3 md:p-4 m-1">
					{plugParsed.current_score}
				</td>
			</tr>
		);
	};

	return (
		<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-screen flex flex-col">
			<div className="p-2 sm:p-3 md:p-4 flex-shrink-0">
				<img
					className="h-32 sm:h-40 md:h-48 lg:h-50 m-auto w-full max-w-lg object-contain"
					src={leaderboard_title}
					alt="leaderboard"
				/>
			</div>
			<div className="flex-1 flex flex-col pb-8">
				<div className="flex-1 overflow-hidden">
					<table className="w-full h-full shadow-lg rounded-lg">
						<thead>
							<tr className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4">
								<th className="font-bold p-2 sm:p-3 md:p-4 m-1">Rank</th>
								<th className="font-bold p-2 sm:p-3 md:p-4 m-1">Store Location</th>
								<th className="font-bold p-2 sm:p-3 md:p-4 m-1">Score</th>
							</tr>
						</thead>
						<tbody className="h-full">
							{ranked.map((player, index) => (
								<Rank
									key={player.id}
									plops={ranked[index]}
									rank={index}
									name={player.name}
									store_location={player.store_location}
									current_score={player.current_score}
								/>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
