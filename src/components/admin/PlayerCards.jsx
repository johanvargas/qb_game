import { useState, useEffect } from "react";
import { getDeck } from "../../utils/localStorage.js";
import star from "../../assets/Star.png";

export const PlayerCards = ({ deck }) => {
	const [state, setState] = useState(() => getDeck());

	useEffect(() => {
		setState(deck)
	}, [deck]);

	const playerCard = (item) => {
		console.log("item: ", item);
		return (
			<div
				className="m-2 p-4 bg-violet-300 text-center grid grid-cols-4 rounded-sm"
				key={JSON.parse(item).id}
			>
				<img className="h-5 w-5" src={star} alt="star" />
				<div className="text-3xl">{JSON.parse(item).name}</div>
				<div>{JSON.parse(item).store_location}</div>
				<div>{JSON.parse(item).current_score}</div>
			</div>
		);
	};

	return <>{state.map((item) => playerCard(item))}</>;
};
