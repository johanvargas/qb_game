import { useSnapshot } from "valtio";

import { store } from "../../stores/admin.store.js";

export default function PlayerCards() {
	const { deck } = useSnapshot(store);

	return (
		<div className="card overflow-hidden w-full">
			<div className="overflow-x-auto w-full">
				<table className="w-full text-left">
					<thead className="border-b border-[var(--border)] bg-[var(--secondary)]">
						<tr>
							<th className="p-4 text-sm font-medium text-[var(--muted-foreground)]">
								Player Name
							</th>
							<th className="p-4 text-sm font-medium text-[var(--muted-foreground)]">
								Store
							</th>
							<th className="p-4 text-sm font-medium text-[var(--muted-foreground)]">
								Score
							</th>
							<th className="p-4 text-sm font-medium text-[var(--muted-foreground)] text-right">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{deck.map((item, idx) => (
							<tr
								className="table-row"
								style={{ animationDelay: `${(idx + 1) * 50}ms` }}
								key={item.id}
							>
								<td className="p-4 font-medium text-white">{item.name}</td>
								<td className="p-4 text-[var(--muted-foreground)]">
									{item.store_location}
								</td>
								<td className="p-4 text-[var(--muted-foreground)]">
									{item.current_score}
								</td>
								<td className="p-4 flex justify-end gap-2">
									<button
										type="button"
										className="p-2 rounded-md btn btn-primary cursor-pointer"
										title="Select"
										onClick={() => {
											localStorage.setItem("current_player", item.name);
											store.current_player = item.name;
										}}
									>
										Select
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

