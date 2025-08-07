import { useState } from "react";
import { useProps } from "../../hooks/useProps.jsx";

export const SelectPlayer = () => {
	const [curr_name, setCurrName] = useState("");
	const { handleInputChange } = useProps();

	// Handle Select Existing Player to Play
	function handleSubmitSelectPlayer(e) {
		e.preventDefault();
		localStorage.setItem("current_player", e.target.curr_name.value);
		handleInputChange("player", e.target.curr_name.value);

		// cleanup input fields
		setCurrName("")
	}

	return (
		<div className="p-1 text-lg bg-blue-700 text-white rounded-lg shadow-md flex flex-col">
			<form onSubmit={handleSubmitSelectPlayer} className="flex flex-col h-full">
				<fieldset className="flex flex-col h-full">
					<legend className="text-white font-bold mb-1">
						Select Existing Player
					</legend>
					<label htmlFor="curr_name" className="block mb-1 text-white">Name</label>
					<br />
					<input
						className="bg-gray-100 px-1 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-800"
						value={curr_name}
						name="curr_name"
						onChange={(e) => setCurrName(e.target.value)}
						placeholder="enter name"
					/>
					<br />
					<br />
					<div className="mt-auto pt-1">
						<button type="submit" className="w-full px-1 py-1 bg-blue-600 text-blue-800 font-bold rounded-md hover:bg-blue-800 hover:text-white transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg text-xs">
							Select Player
						</button>
					</div>
				</fieldset>
			</form>
		</div>
	);
};
