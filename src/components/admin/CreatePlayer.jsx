import { useState } from "react";
import { useProps } from "../../hooks/useProps.jsx";
import { getDeck } from "../../utils/localStorage.js";

export const CreatePlayer = ({ onStateChange }) => {
	const [name, setName] = useState("");
	const [store_location, setStoreLocation] = useState("");
	const { handleInputChange } = useProps();

	// Handle Create Player //
	function handleSubmitCreate(e) {
		e.preventDefault();

		// this should probably be a class
		const constructPlayer = () => {
			const quarterback = {
				id: "p" + Date.now(),
				name: name,
				store_location: st,
				games: [],
				high_score: 0,
				current_score: 0,
			};
			return quarterback;
		};

		const name = e.target.name.value;
		const st = e.target.store_location.value;

		localStorage.setItem(name, JSON.stringify(constructPlayer()));
		localStorage.setItem("current_player", name);

		// props.setPlayer(prev => prev.concat({name, species, age, id: Date.now()}))
		handleInputChange("player", name);
		onStateChange(getDeck());

		// cleanup input fields
		setName("")
		setStoreLocation("")
	}

	return (
		<div className="p-1 text-lg bg-blue-700 text-white rounded-lg shadow-md flex flex-col">
			<form onSubmit={handleSubmitCreate} className="flex flex-col h-full">
				<fieldset className="flex flex-col h-full">
					<legend className="font-bold mb-1 text-white">Add New Player</legend>
					<label htmlFor="name" className="block mb-1 text-white">Name</label>
					<input
						type="text"
						className="bg-gray-200 px-1 py-1 m-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-800"
						value={name}
						name="name"
						onChange={(e) => setName(e.target.value)}
						placeholder="enter name"
					/>
					<br />
					<label htmlFor="store_location" className="block mb-1 text-white">Store Location</label>
					<input
						type="text"
						className="bg-gray-200 px-1 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-800"
						value={store_location}
						name="store_location"
						onChange={(e) => setStoreLocation(e.target.value)}
						placeholder="enter location"
					/>
					<br />
					<div className="mt-auto pt-1">
						<button type="submit" className="w-full px-1 py-1 bg-blue-600 text-blue-800 font-bold rounded-md hover:bg-blue-800 hover:text-white transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg text-xs">
							Add Player
						</button>
					</div>
				</fieldset>
			</form>
		</div>
	);
};
