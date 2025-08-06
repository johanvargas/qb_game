import { useProps } from "../../hooks/useProps.jsx";

export const GameControls = () => {
	const { props, handleInputChange } = useProps();

	// Handle Start Game //
	function handleSubmitStart(e) {
		e.preventDefault();
		handleInputChange("player", localStorage.getItem("current_player"));
	}

	// Handle Stop Game //
	function handleSubmitStop(e) {
		e.preventDefault();
		// setting game state to player obj in localStorage
		const curr_player = localStorage.getItem("current_player");
		const player_set = localStorage.getItem(curr_player);
		const u = localStorage.getItem(e.target.test_name.value);
		const jfy = JSON.parse(u);
		jfy.current_score = parseInt(localStorage.getItem("score"));
		localStorage.setItem(e.target.test_name.value, JSON.stringify(jfy));
	}

	return (
		<div className="h-100 font-sans rounded-sm">
			<br />
			<div>
				<form onSubmit={handleSubmitStart}>
					<fieldset>
						<button
							type="submit"
							className="w-full"
							onClick={() => handleInputChange("playing", true)}
						>
							Start Game
						</button>
					</fieldset>
				</form>
			</div>
			<div>
				<form onSubmit={handleSubmitStop}>
					<fieldset>
						<input
							className="hidden"
							value={props.player}
							name="test_name"
							readOnly
						/>
						<button
							type="submit"
							className="w-full"
							onClick={() => handleInputChange("playing", false)}
						>
							Stop Game
						</button>
					</fieldset>
				</form>
			</div>
		</div>
	);
};
