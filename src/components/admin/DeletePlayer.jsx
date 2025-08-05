import { useState } from "react";
import { getDeck } from "../../utils/localStorage.js";

export const DeletePlayer = ({ setDecks }) => {
	const [name, setName] = useState("");

	function handleDeletePlayer(formData) {
		console.log("Delete Player: ", formData.get("name"));
		const player = formData.get("name");
		if (localStorage.getItem(player)) {
			console.log("We got a match", localStorage.getItem(player));
			localStorage.removeItem(player);
			setName(player);
			setDecks(getDeck());
		}
	}

	return (
		<div className="bg-fuchsia-300 p-5 text-3xl">
			<form action={handleDeletePlayer}>
				<fieldset>
					<legend className="rounded-sm">Delete Player</legend>
					<label htmlFor="name">Name</label>
					<input
						className="bg-gray-100"
						value={name}
						name="name"
						onChange={(e) => setName(e.target.value)}
						placeholder="enter name"
					/>
					<br />
					<button type="submit" className="content-center hover:bg-gray-300">
						Delete Player
					</button>
				</fieldset>
			</form>
		</div>
	);
};