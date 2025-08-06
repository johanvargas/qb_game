import { useSnapshot } from "valtio";
import { useProps } from "../../hooks/useProps.jsx";
import { store } from "../../stores/admin.store.js";

export const PlayerSelector = () => {
	const { deck } = useSnapshot(store);
	const { handleInputChange } = useProps();

	const handlePlayerSelect = (playerName) => {
		localStorage.setItem("current_player", playerName);
		handleInputChange("player", playerName);
		store.current_player = playerName;
	};

	if (deck.length === 0) {
		return (
			<div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
				<div className="text-slate-400 mb-2">No players available</div>
				<div className="text-sm text-slate-500">
					Add a player to get started
				</div>
			</div>
		);
	}

	return (
		<div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
			<h3 className="text-lg font-semibold text-white mb-3">
				Select Active Player
			</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
				{deck.map((player) => (
					<button
						type="button"
						key={player.id}
						onClick={() => handlePlayerSelect(player.name)}
						className={`p-3 rounded-lg text-left transition-colors border ${
							store.current_player === player.name
								? "bg-purple-600 border-purple-500 text-white"
								: "bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
						}`}
					>
						<div className="font-medium">{player.name}</div>
						<div className="text-sm opacity-75">{player.store_location}</div>
						<div className="text-sm opacity-75">
							Score: {player.current_score}
						</div>
					</button>
				))}
			</div>
		</div>
	);
};
