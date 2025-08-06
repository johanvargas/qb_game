export const StatusIndicator = ({ isActive }) => {
	return (
		<div className="flex items-center gap-2">
			<span className="relative flex h-3 w-3">
				<span
					className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isActive ? "bg-green-400" : "bg-red-400"} opacity-75`}
				></span>
				<span
					className={`relative inline-flex rounded-full h-3 w-3 ${isActive ? "bg-green-500" : "bg-red-500"}`}
				></span>
			</span>
			<p
				className={`text-3xl font-bold ${isActive ? "text-green-400" : "text-red-400"} status-indicator-active`}
			>
				{isActive ? "Active" : "Stopped"}
			</p>
		</div>
	);
};
