import { useSnapshot } from "valtio";
import { store } from "../../stores/admin.store.js";

export const DeletePlayer = () => {
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
		<div className="bg-fuchsia-300 p-5 text-3xl">
			<form action={handleDeletePlayer}>
				<fieldset>
					<legend className="rounded-sm">Delete Player</legend>
					<label htmlFor="name">Name</label>
					<select name="name" className="bg-gray-100 w-full">
            {deck.map((item) => (
              <option key={item.id} value={item.name}>{item.name}</option>
            ))}
          </select>

					<br />
					<button type="submit" className="content-center hover:bg-gray-300">
						Delete Player
					</button>
				</fieldset>
			</form>
		</div>
	);
};
