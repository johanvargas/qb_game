export const CurrentPlayerStatus = () => {
	return (
		<div className="bg-gradient-to-r from-blue-600 to-blue-800 my-1 rounded-xl shadow-lg border-2 border-blue-400/30 overflow-hidden w-full max-w-xs">
			<div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-1">
				<div className="text-center text-yellow-900 text-xs font-bold uppercase tracking-wider">
					🏈 Quarterback Ready 🏈
				</div>
			</div>
			<div className="p-3 text-center">
				<div className="text-white text-lg font-semibold mb-2">
					Current Player
				</div>
				<div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-2xl font-bold p-3 rounded-lg shadow-lg border border-green-400">
					{localStorage.getItem("current_player") || "No Player Selected"}
				</div>
				<div className="flex justify-center space-x-1 mt-2">
					<div className="w-2 h-2 bg-green-400 rounded-full"></div>
					<div className="w-2 h-2 bg-green-400 rounded-full"></div>
					<div className="w-2 h-2 bg-green-400 rounded-full"></div>
				</div>
			</div>
		</div>
	);
};
