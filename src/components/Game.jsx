import { useState } from "react";
import { LoadScreen } from "./game/LoadScreen.jsx";
import { Serial } from "./game/Serial.jsx";

export const Game = () => {
	const [_msg, _setMsg] = useState("Ready");
	const [_addPoints, _setAddPoints] = useState(0);
	const [_player, _setPlayer] = useState("");
	const [_throws_, _setThrows] = useState(3);

	return (
		<div className="m-auto w-200">
			<LoadScreen />
			<Serial />
		</div>
	);
};
