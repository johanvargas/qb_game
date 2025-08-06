import { useSnapshot } from "valtio";
import { store } from "../../stores/admin.store.js";

export const CurrentPlayer = () => {
	const { current_player } = useSnapshot(store);

	return (
		<div className="bg-white my-2">
			<div className="flex items-center justify-between p-4 text-3xl">
				<div>Current Player Ready</div>
				<div className="bg-green-400 text-6xl p-2 m-2 rounded-sm">
					{current_player !== "" ? current_player : "No Player Selected"}
				</div>
			</div>
		</div>
	);
};
