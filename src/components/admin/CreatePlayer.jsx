import { useState } from "react";
import { useProps } from "../../hooks/useProps.jsx";
import { getDeck } from "../../utils/localStorage.js";

export const CreatePlayer = ({ onStateChange }) => {
	const [name, setName] = useState("");
	const [store_location, setStoreLocation] = useState("");
	const [curr_name, setCurrName] = useState("");
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

	// Handle Select Existing Player to Play
	function handleSubmitSelectPlayer(e) {
		e.preventDefault();
		localStorage.setItem("current_player", e.target.curr_name.value);
		handleInputChange("player", e.target.curr_name.value);

		// cleanup input fields
		setName("")
	}

	return (
		<div className="my-2">
			<div className="bg-white my-2 rounded-lg shadow-md">
				<div className="p-4 text-3xl">
					Current Player Ready
					<span className="bg-green-400 ml-180 text-6xl p-2 m-2 rounded-lg shadow-sm">
						{localStorage.getItem("current_player")}
					</span>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div className="p-3 text-xl bg-blue-700 text-white rounded-lg shadow-md flex flex-col">
					<form onSubmit={handleSubmitCreate} className="flex flex-col h-full">
						<fieldset className="flex flex-col h-full">
							<legend className="font-bold mb-2 text-white">Add New Player</legend>
							<label htmlFor="name" className="block mb-1 text-white">Name</label>
							<input
								type="text"
								className="bg-gray-200 px-1 py-1 m-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								value={name}
								name="name"
								onChange={(e) => setName(e.target.value)}
								placeholder="enter name"
							/>
							<br />
							<label htmlFor="store_location" className="block mb-1 text-white">Store Location</label>
							<input
								type="text"
								className="bg-gray-200 px-1 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								value={store_location}
								name="store_location"
								onChange={(e) => setStoreLocation(e.target.value)}
								placeholder="enter location"
							/>
							<br />
							<div className="mt-auto pt-2">
								<button type="submit" className="w-full px-2 py-1 bg-blue-600 text-blue-800 font-bold rounded-md hover:bg-blue-800 hover:text-white transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg">
									Add Player
								</button>
							</div>
						</fieldset>
					</form>
				</div>
				<div className="bg-blue-700 p-3 text-xl text-white rounded-lg shadow-md flex flex-col">
					<form onSubmit={handleSubmitSelectPlayer} className="flex flex-col h-full">
						<fieldset className="flex flex-col h-full">
							<legend className="text-white font-bold mb-2">
								Select Existing Player
							</legend>
							<label htmlFor="curr_name" className="block mb-1 text-white">Name</label>
							<br />
							<input
								className="bg-gray-100 px-1 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								value={curr_name}
								name="curr_name"
								onChange={(e) => setCurrName(e.target.value)}
								placeholder="enter name"
							/>
							<br />
							<br />
							<div className="mt-auto pt-2">
								<button type="submit" className="w-full px-2 py-1 bg-blue-600 text-blue-800 font-bold rounded-md hover:bg-blue-800 hover:text-white transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg">
									Select Player
								</button>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	);
};
