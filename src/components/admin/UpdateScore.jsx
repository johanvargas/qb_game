import { useState } from "react";
import { useProps } from "../../hooks/useProps.jsx";
import { getDeck } from "../../utils/localStorage.js";

// deck of players stored in localStorage
export const UpdateScore = ({ setDeck }) => {
	const [name, setName] = useState("");
	const [score, setScore] = useState("");
	const { handleInputChange } = useProps();

	// Handle Create Player //
	function handleSubmitScore(e) {
		e.preventDefault();
	}

	return (
		<div>
				<div className="p-5 text-3xl bg-emerald-300">
					<form onSubmit={handleSubmitScore}>
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
								value={score}
								name="score"
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
		</div>
	);
};
