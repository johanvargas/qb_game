import { useState } from "react";
import { useProps } from "../../hooks/useProps.jsx";
import { store } from "../../stores/admin.store.js";
import { useSnapshot } from "valtio";
import { CurrentPlayer } from "./CurrentPlayer.jsx";

export const CreatePlayer = () => {
	const [name, setName] = useState("");
	const [store_location, setStoreLocation] = useState("");
	const [curr_name, setCurrName] = useState("");
	const { handleInputChange } = useProps();
  const { deck } = useSnapshot(store);

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

    const player = constructPlayer();
		localStorage.setItem(name, JSON.stringify(player));
		localStorage.setItem("current_player", name);

		// props.setPlayer(prev => prev.concat({name, species, age, id: Date.now()}))
		handleInputChange("player", name);
		store.deck.push(player);
		store.current_player = name;
	}

	// Handle Select Existing Player to Play
	function handleSubmitPick(e) {
		e.preventDefault();
		localStorage.setItem("current_player", e.target.curr_name.value);
		handleInputChange("player", e.target.curr_name.value);
	}

	return (
		<div className="my-2">
      <CurrentPlayer />
			<div className="grid grid-cols-2">
				<div className="p-5 text-3xl bg-emerald-300">
					<form onSubmit={handleSubmitCreate}>
						<fieldset>
							<legend>Add New Player</legend>
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
							<label htmlFor="store_location">Store Location</label>
							<input
								type="text"
								className="bg-gray-200"
								value={store_location}
								name="store_location"
								onChange={(e) => setStoreLocation(e.target.value)}
								placeholder="enter location"
							/>
							<br />
							<button type="submit" className="hover:bg-gray-300">
								Add Player
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
              <select name="curr_name" className="bg-gray-100 w-full">
                {/* TODO: fix this */}
                {deck.map((item) => {
                  console.log("Existing playeritem: ", item.name);
                  return (
                    <option className="text-gray-900" key={item.id} value={item.name}>{item.name}</option>
                  )
                })}
              </select>
							{/* <input
								className="bg-gray-100"
								value={curr_name}
								name="curr_name"
								onChange={(e) => setCurrName(e.target.value)}
								placeholder="enter name"
							/> */}
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
