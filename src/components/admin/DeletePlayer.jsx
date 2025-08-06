import { useSnapshot } from "valtio";
import { store } from "../../stores/admin.store.js";

export default function DeletePlayer() {
	const { deck } = useSnapshot(store);

	function handleDeletePlayer(formData) {
		const player = formData.get("name");
		console.log("Delete Player: ", player);
		console.log("deck: ", deck);
		if (localStorage.getItem(player)) {
			localStorage.removeItem(player);
			store.deck = deck.filter((item) => item.name !== player);
			if (store.current_player === player) {
				store.current_player = "";
				localStorage.setItem("current_player", "");
			}
		}
	}

	return (
		<div className="card p-6">
			<form action={handleDeletePlayer}>
				<fieldset>
					<label
						htmlFor="name"
						className="block text-sm font-medium text-[var(--muted-foreground)] mb-1"
					>
						Delete Player
					</label>
					<select
						name="name"
						className="bg-[var(--input)] border border-[var(--border)] text-white w-full p-2 rounded-md"
					>
						{deck.map((item) => (
							<option key={item.id} value={item.name}>
								{item.name}
							</option>
						))}
					</select>
					<div className="pt-4">
						<button
							type="submit"
							className="btn btn-destructive px-4 py-2 rounded-lg"
						>
							Delete Player
						</button>
					</div>
				</fieldset>
			</form>
		</div>
	);
}
