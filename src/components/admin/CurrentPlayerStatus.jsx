export const CurrentPlayerStatus = () => {
	return (
		<div className="bg-white my-1 rounded-lg shadow-md">
			<div className="p-2 text-2xl">
				Current Player Ready
				<span className="bg-green-400 ml-180 text-4xl p-1 m-1 rounded-lg shadow-sm">
					{localStorage.getItem("current_player")}
				</span>
			</div>
		</div>
	);
};
