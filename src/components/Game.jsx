import { useState } from "react";
import { LoadScreen } from "./game/LoadScreen.jsx";
import { Serial } from "./game/Serial.jsx";

export const Game = () => {
	const [msg, setMsg] = useState("Ready");
	const [addPoints, setAddPoints] = useState(0);
	const [player, setPlayer] = useState("");
	const [throws_, setThrows] = useState(3);

	return (
		<div className="m-auto w-200">
			<LoadScreen />
			<Serial />
		</div>
	);
};
