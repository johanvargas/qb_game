import { useState } from "react";
import { getDeck } from "../../utils/localStorage.js";

export const DeletePlayer = ( { deck, setDeck } ) => {
	const [name, setName] = useState("");

	function handleDeletePlayer(formData) {
		const player = formData.get("name");
		console.log("Delete Player: ", player);
		console.log('deck: ', deck)
		if (localStorage.getItem(player)) {
			localStorage.removeItem(player);
			//setName(player);
			setDeck(getDeck());
		}

		// cleanup input fields
		setName("")
	}

	return (
		<div className="bg-blue-700 p-3 text-xl text-white rounded-lg shadow-md flex flex-col">
			<form action={handleDeletePlayer} className="flex flex-col h-full">
				<fieldset className="flex flex-col h-full">
					<legend className="rounded-sm font-bold mb-2 text-white">Delete Player</legend>
					<label htmlFor="name" className="block mb-1 text-white">Name</label>
					<input
						className="bg-gray-100 px-1 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						value={name}
						name="name"
						onChange={(e) => setName(e.target.value)}
						placeholder="enter name"
					/>

					<br />
					<div className="mt-auto pt-2">
						<button type="submit" className="w-full px-2 py-1 bg-blue-600 text-blue-800 font-bold rounded-md hover:bg-blue-800 hover:text-white transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg">
							Delete Player
						</button>
					</div>
				</fieldset>
			</form>
		</div>
	);
};
