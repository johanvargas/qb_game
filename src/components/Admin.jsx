import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { useProps } from "../hooks/useProps.jsx";
import { store } from "../stores/admin.store.js";
import { getDeck } from "../utils/localStorage.js";
import { DeletePlayer } from "./admin/DeletePlayer.jsx";
import { GameControls } from "./admin/GameControls.jsx";
import { PlayerModal } from "./admin/PlayerModal.jsx";
import { PlayerSelector } from "./admin/PlayerSelector.jsx";
import { Sidebar } from "./admin/Sidebar.jsx";

export const Admin = () => {
	const { props } = useProps();
	const { deck } = useSnapshot(store);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const deckData = getDeck();
		store.deck = deckData;
	}, []);

	const currentPlayer =
		store.current_player ||
		localStorage.getItem("current_player") ||
		"No player selected";

	return (
		<div className="flex min-h-screen bg-slate-950">
			<Sidebar />

			<main className="flex-1 p-8">
				{/* Game Controls */}
				<section>
					<h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							aria-label="Game Controls"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m4-10V8a3 3 0 01-3 3H9a3 3 0 01-3-3V6a3 3 0 013-3h8a3 3 0 013 3z"
							/>
						</svg>
						Game Controls
					</h2>
					<GameControls />
				</section>

				<hr className="border-t border-slate-700 my-8" />

				{/* Current Status */}
				<section>
					<h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							aria-label="Current Status"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
							/>
						</svg>
						Current Status
					</h2>
					<div className="bg-slate-800 border border-slate-700 rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h3 className="text-sm font-medium text-slate-400 mb-1">
								Active Player
							</h3>
							<p className="text-3xl font-bold text-white">{currentPlayer}</p>
						</div>
						<div>
							<h3 className="text-sm font-medium text-slate-400 mb-1">
								Game State
							</h3>
							<div className="flex items-center gap-2">
								<span className="relative flex h-3 w-3">
									{props.playing && (
										<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
									)}
									<span
										className={`relative inline-flex rounded-full h-3 w-3 ${props.playing ? "bg-green-500" : "bg-red-500"}`}
									></span>
								</span>
								<p
									className={`text-3xl font-bold ${props.playing ? "text-green-400" : "text-red-400"}`}
								>
									{props.playing ? "Active" : "Inactive"}
								</p>
							</div>
						</div>
					</div>
				</section>

				<hr className="border-t border-slate-700 my-8" />

				{/* Player Selection */}
				<section>
					<h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							aria-label="Player Selection"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
						Player Selection
					</h2>
					<PlayerSelector />
				</section>

				<hr className="border-t border-slate-700 my-8" />

				{/* Player Management */}
				<section>
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-2xl font-bold text-white flex items-center gap-2">
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								aria-label="Player Management"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
								/>
							</svg>
							Player Management
						</h2>
						<button
							type="button"
							onClick={() => setIsModalOpen(true)}
							className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
						>
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								aria-label="Add New Player"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 6v6m0 0v6m0-6h6m-6 0H6"
								/>
							</svg>
							Add New Player
						</button>
					</div>
					<div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full text-left">
								<thead className="border-b border-slate-700 bg-slate-900">
									<tr>
										<th className="p-4 text-sm font-medium text-slate-400">
											Player Name
										</th>
										<th className="p-4 text-sm font-medium text-slate-400">
											Store
										</th>
										<th className="p-4 text-sm font-medium text-slate-400">
											Score
										</th>
										<th className="p-4 text-sm font-medium text-slate-400 text-right">
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{deck.map((player, index) => (
										<tr
											key={player.id}
											className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors"
										>
											<td className="p-4 font-medium text-white">
												{player.name}
											</td>
											<td className="p-4 text-slate-400">
												{player.store_location}
											</td>
											<td className="p-4 text-slate-400">
												{player.current_score}
											</td>
											<td className="p-4 flex justify-end gap-2">
												<button
													type="button"
													className="p-2 hover:bg-slate-600 rounded-md transition-colors"
													aria-label="Edit player"
												>
													<svg
														className="w-5 h-5 text-slate-400"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
														aria-hidden="true"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
														/>
													</svg>
												</button>
												<button
													type="button"
													className="p-2 hover:bg-slate-600 rounded-md transition-colors"
													aria-label="Delete player"
												>
													<svg
														className="w-5 h-5 text-red-400"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
														aria-hidden="true"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
														/>
													</svg>
												</button>
											</td>
										</tr>
									))}
									{deck.length === 0 && (
										<tr>
											<td
												colSpan="4"
												className="p-8 text-center text-slate-500"
											>
												No players added yet. Click "Add New Player" to get
												started.
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>

					<div className="mt-4 text-slate-400 text-sm">
						Total players: {deck.length}
					</div>
				</section>

				<div className="mt-8">
					<DeletePlayer />
				</div>
			</main>

			<PlayerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</div>
	);
};
