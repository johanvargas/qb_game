export const StatusIndicator = ({ playing }) => {
	return (
		<div
			className={
				playing
					? "w-80 m-auto p-2 pt-4 bg-green-300 text-green-700 font-bold text-7xl text-center rounded-full"
					: "w-80 m-auto p-2 pt-4 text-center bg-red-400 text-red-700 font-bold font-sans text-7xl rounded-full"
			}
		>
			{playing ? "Hike" : "Timeout"}
		</div>
	);
};
