import { Settings, Users } from "lucide-react";

export default function AdminSidebar() {
	return (
		<aside className="sidebar w-64 flex-shrink-0 flex flex-col p-4">
			<div className="flex items-center gap-2 px-2 pb-6">
				<img
					src="https://placehold.co/40x40/A855F7/FFFFFF/png"
					alt="Super QB Logo"
					className="rounded-lg"
				/>
				<h1 className="text-xl font-bold text-white">Super QB</h1>
			</div>
			<nav className="flex flex-col gap-2">
				<a
					href="#/"
					className="nav-link active flex items-center gap-3 px-3 py-2 rounded-md"
				>
					<Users />
					<span>Players</span>
				</a>
				<a
					href="#/"
					className="nav-link flex items-center gap-3 px-3 py-2 rounded-md"
				>
					<Settings />
					<span>Settings</span>
				</a>
			</nav>
		</aside>
	);
}
