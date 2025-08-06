import { useEffect, useState } from "react";
import { useProps } from "../hooks/useProps.jsx";
import { getDeck } from "../utils/localStorage.js";
import { CreatePlayer } from "./admin/CreatePlayer.jsx";
import { DeletePlayer } from "./admin/DeletePlayer.jsx";
import { GameControls } from "./admin/GameControls.jsx";
import { PlayerCards } from "./admin/PlayerCards.jsx";
import { Header } from "./shared/Header.jsx";
import { StatusIndicator } from "./shared/StatusIndicator.jsx";
import { store } from "../stores/admin.store.js";

export const Admin = () => {
	const { props } = useProps();
	const { keepscore, setKeepScore } = useState(localStorage.getItem("score"));

	useEffect(() => {
		const deck = getDeck();

		store.deck = deck;
	}, []);

	//TODO: beautify forms +1/2
	return (
		<div className="m-auto w-300">
			<Header />
			<StatusIndicator playing={props.playing} />
			<GameControls />
			<div>
				<CreatePlayer />
			</div>
			<div>
				<DeletePlayer />
			</div>
			<div>
				<p className="text-gray-300 text-lg p-2">
					Number of players stored: {localStorage.length - 2}
				</p>
			</div>
			<div className="grid grid-cols-3">
				<PlayerCards />
			</div>
		</div>
	);
};
