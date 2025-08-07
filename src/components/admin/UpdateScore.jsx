import { useState } from "react";
import { useProps } from "../../hooks/useProps.jsx";
import { getDeck, getDeckPlayerScore, updateDeckPlayerScore } from "../../utils/localStorage.js";

// deck of players stored in localStorage
export const UpdateScore = ({ onStateChange }) => {
	const [name, setName] = useState("");
	const [score, setScore] = useState(0);
	const { handleInputChange } = useProps();

	// Handle Update Score //
	function handleSubmitScore(e) {
		e.preventDefault();
		const myscore = getDeckPlayerScore(name)
		console.log('score: ', myscore)
		updateDeckPlayerScore(name, score)
		
		// player cards will update automatically
		onStateChange(getDeck());

		// leaderboard will update automatically
		onStateChangeLeaderboard(getDeck());

		// Clear the form by resetting the input values
		e.target.reset();
		setName("");
		setScore(0);
	}

	return (
		<div className="p-1 text-lg bg-blue-700 text-white rounded-lg shadow-md flex flex-col">
			<form onSubmit={handleSubmitScore} className="flex flex-col h-full">
				<fieldset className="flex flex-col h-full">
					<legend className="font-bold mb-1 text-white">Update Score Manually</legend>
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
					<label htmlFor="score" className="block mb-1 text-white">New Score</label>
					<input
						type="number"
						className="bg-gray-200 px-1 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-800"
						value={score}
						name="score"
						onChange={(e) => setScore(e.target.value)}
						placeholder="enter score"
					/>
					<br />
					<div className="mt-auto pt-1">
														<button type="submit" className="w-full px-1 py-1 bg-blue-600 text-blue-800 font-bold rounded-md hover:bg-blue-800 hover:text-white transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg text-xs">
									Update
								</button>
					</div>
				</fieldset>
			</form>
		</div>
	);
};
