import SelectExistingPlayer from "./CreatePlayer";
import DeletePlayer from "./DeletePlayer";
import PlayerCards from "./PlayerCards";
import AddNewPlayer from "./AddNewPlayer";

export default function PlayerManagement() {
	return (
		<section>
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-2xl font-bold text-white flex items-center gap-2">
					Player Management
				</h2>
        <AddNewPlayer />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="card p-6">
					<SelectExistingPlayer />
				</div>
				<div className="card p-6">
					<DeletePlayer />
				</div>
			</div>
			<div className="mt-4">
				<p className="text-[var(--muted-foreground)] text-lg p-2">
					Number of players stored:{" "}
					{
						Object.keys(localStorage).filter((k) => {
							try {
								const v = JSON.parse(localStorage.getItem(k));
								return v && typeof v === "object" && "id" in v && "name" in v;
							} catch {
								return false;
							}
						}).length
					}
				</p>
			</div>
			<div className="mt-4 w-full">
				<PlayerCards />
			</div>
		</section>
	);
}
