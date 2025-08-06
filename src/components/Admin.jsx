import { BarChart3, Gamepad2 } from "lucide-react";
import { useProps } from "../hooks/useProps.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";
import GameControls from "./admin/GameControls.jsx";
import PlayerManagement from "./admin/PlayerManagement.jsx";
import { StatusIndicator } from "./shared/StatusIndicator.jsx";
import ActivePlayer from "./admin/ActivePlayer.jsx";
import { initStore } from "../stores/admin.store.js";

export const Admin = () => {
	const { props } = useProps();
	initStore();

	return (
		<AdminLayout>
			<section>
				<h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
					<Gamepad2 /> Game Controls
				</h2>
				<GameControls />
			</section>
			<hr className="border-t border-[var(--border)] my-8" />
			<section>
				<h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
					<BarChart3 /> Current Status
				</h2>
				<div className="card p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
					<ActivePlayer />
					<div>
						<h3 className="text-sm font-medium text-[var(--muted-foreground)] mb-1">
							Game State
						</h3>
						<StatusIndicator isActive={props.playing} />
					</div>
				</div>
			</section>
			<hr className="border-t border-[var(--border)] my-8" />
			<PlayerManagement />
		</AdminLayout>
	);
};
