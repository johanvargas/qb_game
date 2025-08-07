import { useEffect, useState } from "react";
import { useProps } from "./hooks/useProps.jsx";

// assets
import leaderboard_title from "./assets/leaderboard_title.png";
import mockQuaterbacks from "./mockQuarterbacks.js";

// collects users stored in localStorage for use in state
const realPlayers = () => {
	const sendArray = [];
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		const value = localStorage.getItem(key);
		if (value[0] != "{") {
			continue;
		}
		const j = JSON.parse(value);
		sendArray.push(j);
	}

	const sortedArray = sendArray.sort(
		(a, b) => b.current_score - a.current_score,
	);
	const filterArray = sortedArray.filter((a) => a.current_score > 0);

	return filterArray;
};

// probably should be called HomeScreen, but I'm not changing rn
export default function Home() {
	const [ranked, setRanked] = useState([]);
	const [hold, setHold] = useState("Hold Item");

	useEffect(() => {
		const realPlayerList = realPlayers();
	     const mockQbs = mockQuaterbacks();

		  console.log('type: ', mockQbs)
	     //const playerSort = realPlayerList.toSorted(realPlayerList.current_score)

		if ( realPlayerList.length === 0 ) { 
		     const playerSort = mockQbs.toSorted((a, b) => b.current_score - a.current_score)
		     setRanked(playerSort.filter((item) => playerSort.indexOf(item) < 5 ))   
		} else {
		     //const playerSort = realPlayerList.toSorted(realPlayerList.current_score)
		     const playerSort = realPlayerList.toSorted((a, b) => b.current_score - a.current_score)
		     setRanked(playerSort.filter((item) => playerSort.indexOf(item) < 5 ))   
		}
	}, []);

	const Rank = (plops) => {
		const plug = Object.values(plops);
		const plugParsed = plug[0];

		return (
		    	<tr>
				<td className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl bg-blue-500 text-center p-2 sm:p-3">
					<strong>{plops.rank + 1}</strong>
				</td>
				<td className="font-bold text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl bg-blue-800 text-center uppercase p-2 sm:p-3">
					{plugParsed.store_location}
				</td>
				<td className="font-bold text-white bg-blue-500 text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl p-2 sm:p-3">
					{plugParsed.current_score}
				</td>
			</tr>
		);
	};

	return (
		<div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="p-4 sm:p-6 lg:p-8">
				<img
					className="h-auto max-h-32 sm:max-h-40 md:max-h-48 lg:max-h-56 mx-auto w-full max-w-4xl object-contain"
					src={leaderboard_title}
					alt="leaderboard"
				/>
			</div>
			<div className="overflow-x-auto">
				<table className="w-full min-h-96 border-collapse shadow-lg rounded-lg overflow-hidden">
					<thead>
						<tr className="bg-blue-500 text-white text-lg sm:text-xl md:text-2xl lg:text-3xl">
							<th className="font-bold p-3 sm:p-4 md:p-5">Rank</th>
							<th className="font-bold p-3 sm:p-4 md:p-5">Store Location</th>
							<th className="font-bold p-3 sm:p-4 md:p-5">Score</th>
						</tr>
					</thead>
					<tbody>
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
	);
}
