import { useState } from "react";
import { useProps } from "../../hooks/useProps.jsx";
import { getDeck } from "../../utils/localStorage.js";

// deck of players stored in localStorage
export const UpdateScore = ({ setDeck }) => {
	const [name, setName] = useState("");
	const [score, setScore] = useState("");
	//const [curr_name, setCurrName] = useState("");
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
		console.log("deck from create player: ", deck);
		setDeck(getDeck());
	}

	// Handle Select Existing Player to Play
	function handleSubmitPick(e) {
		e.preventDefault();
		localStorage.setItem("current_player", e.target.curr_name.value);
		handleInputChange("player", e.target.curr_name.value);
	}

	return (
		<div className="my-2">
			<div className="bg-white my-2">
				<div className="p-4 text-3xl">
					Current Player Ready
					<span className="bg-green-400 ml-180 text-6xl p-2 m-2 rounded-sm">
						{localStorage.getItem("current_player")}
					</span>
				</div>
			</div>
			<div className="grid grid-cols-2">
				<div className="p-5 text-3xl bg-emerald-300">
					<form onSubmit={handleSubmitCreate}>
						<fieldset>
							<legend>Update Score Manually</legend>
							<label htmlFor="name">Name</label>
							<input
								type="text"
								className="bg-gray-200 px-1 m-2"
								value={name}
								name="name"
								onChange={(e) => setName(e.target.value)}
								placeholder="enter name"
							/>
							<br />
							<label htmlFor="score">New Score</label>
							<input
								type="text"
								className="bg-gray-200"
								value={store_location}
								name="store_location"
								onChange={(e) => setScore(e.target.value)}
								placeholder="enter location"
							/>
							<br />
							<button type="submit" className="hover:bg-gray-300">
								Update
							</button>
						</fieldset>
					</form>
				</div>
				<div className="bg-green-300 p-5 text-3xl">
					<form onSubmit={handleSubmitPick}>
						<fieldset>
							<legend className="text-gray-900">Select Existing Player</legend>
							<label htmlFor="curr_name">Name</label>
							<br />
							<input
								className="bg-gray-100"
								value={curr_name}
								name="curr_name"
								onChange={(e) => setCurrName(e.target.value)}
								placeholder="enter name"
							/>
							<br />
							<br />
							<button
								type="submit"
								className="content-center hover:bg-gray-300"
							>
								Select Player
							</button>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	);
};
