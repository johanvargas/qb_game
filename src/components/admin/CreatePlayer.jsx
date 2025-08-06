import { useSnapshot } from "valtio";
import { useProps } from "../../hooks/useProps.jsx";
import { store } from "../../stores/admin.store.js";

export default function SelectExistingPlayer() {
	const { handleInputChange } = useProps();
	const { deck } = useSnapshot(store);

	// Handle Select Existing Player to Play
	function handleSubmitPick(e) {
		e.preventDefault();
		localStorage.setItem("current_player", e.target.curr_name.value);
		handleInputChange("player", e.target.curr_name.value);
	}

	return (
		<div className="my-2">
			<div className="card p-6">
				<form onSubmit={handleSubmitPick}>
					<fieldset>
						<label
							htmlFor="curr_name"
							className="block text-sm font-medium text-[var(--muted-foreground)] mb-1"
						>
							Select Existing Player
						</label>
						<select
							name="curr_name"
							className="bg-[var(--input)] border border-[var(--border)] text-white w-full p-2 rounded-md"
						>
							{deck.map((item) => (
								<option
									className="text-gray-900"
									key={item.id}
									value={item.name}
								>
									{item.name}
								</option>
							))}
						</select>
						<div className="pt-4">
							<button
								type="submit"
								className="btn btn-primary px-4 py-2 rounded-lg"
							>
								Select Player
							</button>
						</div>
					</fieldset>
				</form>
			</div>
		</div>
	);
}
