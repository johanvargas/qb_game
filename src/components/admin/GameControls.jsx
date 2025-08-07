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
		<div className="relative w-full max-w-xs">
			{/* Control Unit Container */}
			<div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-3 shadow-2xl border-2 border-gray-600">
				{/* Control Panel */}
				<div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl p-4 border border-gray-500">
					<div className="text-center mb-4">
						<div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
							Game Controls
						</div>
					</div>
					
					<div className="space-y-3">
						{/* Start Game Button */}
						<form onSubmit={handleSubmitStart}>
							<fieldset>
								<button
									type="submit"
									className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 border border-green-400"
									onClick={() => handleInputChange("playing", true)}
								>
									<div className="flex items-center justify-center space-x-2">
										<div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
										<span>START GAME</span>
										<div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
									</div>
								</button>
							</fieldset>
						</form>
						
						{/* Stop Game Button */}
						<form onSubmit={handleSubmitStop}>
							<fieldset>
								<input className="hidden" value={props.player} name="test_name" readOnly />
								<button
									type="submit"
									className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 border border-red-400"
									onClick={() => handleInputChange("playing", false)}
								>
									<div className="flex items-center justify-center space-x-2">
										<div className="w-2 h-2 bg-red-300 rounded-full animate-pulse"></div>
										<span>STOP GAME</span>
										<div className="w-2 h-2 bg-red-300 rounded-full animate-pulse"></div>
									</div>
								</button>
							</fieldset>
						</form>
					</div>
					
					{/* Control Status */}
					<div className="flex justify-center mt-4">
						<div className="text-xs text-gray-400 bg-gray-800 px-3 py-1 rounded-full border border-gray-600">
							CONTROL READY
						</div>
					</div>
				</div>
				
				{/* Control Unit Details */}
				<div className="flex justify-between items-center mt-2 text-xs text-gray-400">
					<div>CONTROLS</div>
					<div className="text-blue-400">● ACTIVE</div>
				</div>
			</div>
		</div>
	);
};