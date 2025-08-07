export const StatusIndicator = ({ playing }) => {
	return (
		<div className="relative w-full max-w-xs">
			{/* Sign Unit Container */}
			<div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-3 shadow-2xl border-2 border-gray-600">
				{/* Status Display */}
				<div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl p-4 border border-gray-500">
					<div className="text-center mb-2">
						<div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
							Game Status
						</div>
					</div>
					
					<div
						className={`w-full p-4 rounded-lg font-bold text-4xl text-center shadow-inner transition-all duration-500 ${
							playing
								? "bg-gradient-to-r from-green-500 to-green-600 text-white animate-pulse shadow-lg"
								: "bg-gradient-to-r from-red-500 to-red-600 text-white animate-pulse shadow-lg"
						}`}
					>
						{playing ? "HIKE!" : "TIMEOUT"}
					</div>
					
					{/* Status Lights */}
					<div className="flex justify-center space-x-2 mt-3">
						<div className={`w-3 h-3 rounded-full ${playing ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
						<div className={`w-3 h-3 rounded-full ${playing ? 'bg-gray-500' : 'bg-red-400 animate-pulse'}`}></div>
					</div>
				</div>
				
				{/* Sign Unit Details */}
				<div className="flex justify-between items-center mt-2 text-xs text-gray-400">
					<div>QB GAME</div>
					<div className="text-green-400">● LIVE</div>
				</div>
			</div>
		</div>
	);
};