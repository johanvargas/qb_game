import { useEffect, useState } from "react";
// assets
import leaderboard_title from "./assets/leaderboard_title.png";
import mockQuaterbacks from "./mockQuarterbacks.js";

// collects users stored in localStorage for use in state
const realPlayers = () => {
	const sendArray = [];
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		const value = localStorage.getItem(key);
		if (value[0] !== "{") {
			continue;
		}
		const j = JSON.parse(value);
		sendArray.push(j);
	}

	const sortedArray = sendArray.sort(
		(a, b) => b.current_score - a.current_score,
	);
	// const filterArray = sortedArray.filter((a) => a.current_score > 0);

	return sortedArray;
};

// probably should be called HomeScreen, but I'm not changing rn
export default function Home() {
	const [ranked, setRanked] = useState([]);
	const [_hold, _setHold] = useState("Hold Item");

	useEffect(() => {
		const realPlayerList = realPlayers(mockQuaterbacks);
		const playerSort = realPlayerList.toSorted(realPlayerList.current_score);
		setRanked(playerSort);
	}, []);

	const Rank = (plops) => {
		const plug = Object.values(plops);
		const plugParsed = plug[0];

		return (
			<tr>
				<td className="text-white text-2xl bg-blue-500 text-center">
					<strong>{plops.rank + 1}</strong>
				</td>
				<td className="font-bold text-white text-xl bg-blue-800 text-center uppercase">
					{plugParsed.name}
				</td>
				<td className="font-bold text-white text-2xl bg-blue-800 text-center uppercase">
					{plugParsed.store_location}
				</td>
				<td className="font-bold text-white bg-blue-500 text-center text-3xl">
					{plugParsed.current_score}
				</td>
			</tr>
		);
	};

	return (
		<div className="m-auto w-300">
			<div className="p-7">
				<img
					className="h-50 m-auto w-200"
					src={leaderboard_title}
					alt="leaderboard"
				/>
			</div>
			<table className="w-full h-125 pt-4 m-2">
				<thead className="pt-10">
					<tr className="bg-blue-500 text-white">
						<th className="text-bold p-4 text-2xl">Rank</th>
						<th className="text-bold p-4 text-2xl">Player</th>
						<th className="text-bold p-4 text-2xl">Store Location</th>
						<th className="text-bold p-4 text-2xl">Score</th>
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
	);
}
