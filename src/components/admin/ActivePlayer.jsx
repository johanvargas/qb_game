import { useSnapshot } from "valtio";
import { store } from "../../stores/admin.store.js";

export default function ActivePlayer() {
  const { current_player } = useSnapshot(store);

  return (
    <div>
    <h3 className="text-sm font-medium text-[var(--muted-foreground)] mb-1">
      Active Player
    </h3>
    <p className="text-3xl font-bold text-white">
      {current_player ? current_player : "No Player Selected"}
			</p>
		</div>
	);
}