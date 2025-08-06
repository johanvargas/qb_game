import { useState } from "react";
import { useProps } from "../../hooks/useProps.jsx";
import { store } from "../../stores/admin.store.js";

export default function AddNewPlayer() {
	const [isOpen, setIsOpen] = useState(false);
	const [name, setName] = useState("");
	const [store_location, setStoreLocation] = useState("");
	const { handleInputChange } = useProps();

	// Handle Create Player //
	function handleSubmitCreate(e) {
		e.preventDefault();

		// this should probably be a class
		const constructPlayer = () => {
			const quarterback = {
				id: `p${Date.now()}`,
				name: name,
				store_location: store_location,
				games: [],
				high_score: 0,
				current_score: 0,
			};
			return quarterback;
		};

		const player = constructPlayer();
		localStorage.setItem(name, JSON.stringify(player));
		localStorage.setItem("current_player", name);

		// props.setPlayer(prev => prev.concat({name, species, age, id: Date.now()}))
		handleInputChange("player", name);
		store.deck.push(player);
		store.current_player = name;

		// Reset form
		setName("");
		setStoreLocation("");
	}

	return (
		<div>
			<div className="flex justify-between items-center mb-4">
				<button
					type="button"
					className="btn btn-primary px-4 py-2 rounded-lg font-semibold"
					onClick={() => setIsOpen(true)}
				>
					Add New Player
				</button>
			</div>
			{isOpen && (
				<div>
					<div className="modal-overlay fixed inset-0 flex items-center justify-center">
						<div className="modal-content card w-full max-w-md m-4">
							<div className="p-6">
								<div className="flex justify-between items-center mb-4">
									<h3 className="text-xl font-bold text-white">
										Add New Player
									</h3>
									<button
										type="button"
										className="p-1 rounded-full hover:bg-[var(--accent)]"
										onClick={() => setIsOpen(false)}
									>
										✕
									</button>
								</div>
								<form
									className="space-y-4"
									onSubmit={(e) => {
										handleSubmitCreate(e);
										setIsOpen(false);
									}}
								>
									<div>
										<label
											htmlFor="name"
											className="block text-sm font-medium text-[var(--muted-foreground)] mb-1"
										>
											Name
										</label>
										<input
											type="text"
											id="name"
											name="name"
											value={name}
											onChange={(e) => setName(e.target.value)}
											className="w-full p-2 rounded-md bg-[var(--input)] border border-[var(--border)] focus:ring-2 focus:ring-[var(--ring)] outline-none"
										/>
									</div>
									<div>
										<label
											htmlFor="store_location"
											className="block text-sm font-medium text-[var(--muted-foreground)] mb-1"
										>
											Store Location
										</label>
										<input
											type="text"
											id="store_location"
											name="store_location"
											value={store_location}
											onChange={(e) => setStoreLocation(e.target.value)}
											className="w-full p-2 rounded-md bg-[var(--input)] border border-[var(--border)] focus:ring-2 focus:ring-[var(--ring)] outline-none"
										/>
									</div>
									<div className="flex justify-end gap-4 pt-4">
										<button
											type="button"
											className="btn px-4 py-2 rounded-lg bg-[var(--secondary)]"
											onClick={() => setIsOpen(false)}
										>
											Cancel
										</button>
										<button
											type="submit"
											className="btn btn-primary px-4 py-2 rounded-lg"
										>
											Save Player
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
