import { PlayCircle, StopCircle } from "lucide-react";
import { useProps } from "../../hooks/useProps.jsx";

export default function GameControls() {
	const { handleInputChange } = useProps();

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			<button
				type="button"
				className="btn btn-primary p-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2"
				onClick={() => {
					handleInputChange("playing", true);
					handleInputChange("player", localStorage.getItem("current_player"));
				}}
			>
				<PlayCircle /> Start Game
			</button>
			<button
				type="button"
				className="btn btn-destructive p-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2"
				onClick={() => {
					handleInputChange("playing", false);
					const curr_player = localStorage.getItem("current_player");
					const player_set = localStorage.getItem(curr_player);
					if (player_set) {
						const jfy = JSON.parse(player_set);
						jfy.current_score = parseInt(localStorage.getItem("score"));
						localStorage.setItem(curr_player, JSON.stringify(jfy));
					}
				}}
			>
				<StopCircle /> Stop Game
			</button>
		</div>
	);
}
