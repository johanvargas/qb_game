import { useState, useEffect } from "react";
import { useProps } from "../hooks/useProps.jsx";
import { getDeck } from "../utils/localStorage.js";
import { Header } from "./shared/Header.jsx";
import { StatusIndicator } from "./shared/StatusIndicator.jsx";
import { GameControls } from "./admin/GameControls.jsx";
import { CreatePlayer } from "./admin/CreatePlayer.jsx";
import { DeletePlayer } from "./admin/DeletePlayer.jsx";
import { PlayerCards } from "./admin/PlayerCards.jsx";

export const Admin = () => {
	const { props } = useProps();
	const { keepscore, setKeepScore } = useState(localStorage.getItem("score"));
	const [deck, setDecks] = useState(() => getDeck());

	useEffect(() => {
		const fetchData = getDeck();
		console.log("qbs, ", fetchData);
		setDecks(fetchData);
	}, []);

	//TODO: beautify forms +1/2
	return (
		<div className="m-auto w-300">
			<Header />
			<StatusIndicator playing={props.playing} />
			<GameControls />
			<div>
				<CreatePlayer setDeck={setDecks} />
			</div>
			<div>
				<DeletePlayer setDecks={setDecks} />
			</div>
			<div>
				<p className="text-gray-300 text-lg p-2">
					Number of players stored: {localStorage.length}
				</p>
			</div>
			<div className="grid grid-cols-3">
				<PlayerCards />
			</div>
		</div>
	);
};