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
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			<form onSubmit={handleSubmitStart}>
				<button
					type="submit"
					className="w-full bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 transition-all hover:transform hover:-translate-y-0.5 hover:shadow-lg"
					onClick={() => handleInputChange("playing", true)}
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m4-10V8a3 3 0 01-3 3H9a3 3 0 01-3-3V6a3 3 0 013-3h8a3 3 0 013 3z"
						/>
					</svg>
					Start Game
				</button>
			</form>

			<form onSubmit={handleSubmitStop}>
				<input
					className="hidden"
					value={props.player}
					name="test_name"
					readOnly
				/>
				<button
					type="submit"
					className="w-full bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 transition-all hover:transform hover:-translate-y-0.5 hover:shadow-lg"
					onClick={() => handleInputChange("playing", false)}
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 9l6 6m0-6l-6 6"
						/>
					</svg>
					Stop Game
				</button>
			</form>
		</div>
	);
};
