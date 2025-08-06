import { useState } from "react";
import { useProps } from "../../hooks/useProps.jsx";
import { store } from "../../stores/admin.store.js";

export const PlayerModal = ({ isOpen, onClose }) => {
	const [name, setName] = useState("");
	const [storeLocation, setStoreLocation] = useState("");
	const { handleInputChange } = useProps();

	const handleSubmit = (e) => {
		e.preventDefault();

		const constructPlayer = () => {
			const quarterback = {
				id: `p${Date.now()}`,
				name: name,
				store_location: storeLocation,
				games: [],
				high_score: 0,
				current_score: 0,
			};
			return quarterback;
		};

		const player = constructPlayer();
		localStorage.setItem(name, JSON.stringify(player));
		localStorage.setItem("current_player", name);

		handleInputChange("player", name);
		store.deck.push(player);
		store.current_player = name;

		setName("");
		setStoreLocation("");
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 animate-in fade-in duration-300">
			<div className="bg-slate-800 border border-slate-700 rounded-lg w-full max-w-md m-4 animate-in slide-in-from-bottom-4 duration-300">
				<div className="p-6">
					<div className="flex justify-between items-center mb-4">
						<h3 className="text-xl font-bold text-white">Add New Player</h3>
						<button
							type="button"
							onClick={onClose}
							className="p-1 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
							aria-label="Close modal"
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-slate-300 mb-1"
							>
								Name
							</label>
							<input
								type="text"
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="w-full p-2 rounded-md bg-slate-700 border border-slate-600 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
								required
							/>
						</div>
						<div>
							<label
								htmlFor="location"
								className="block text-sm font-medium text-slate-300 mb-1"
							>
								Store Location
							</label>
							<input
								type="text"
								id="location"
								value={storeLocation}
								onChange={(e) => setStoreLocation(e.target.value)}
								className="w-full p-2 rounded-md bg-slate-700 border border-slate-600 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
								required
							/>
						</div>
						<div className="flex justify-end gap-4 pt-4">
							<button
								type="button"
								onClick={onClose}
								className="px-4 py-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
							>
								Save Player
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
