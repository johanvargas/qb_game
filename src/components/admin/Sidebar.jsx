export const Sidebar = () => {
	return (
		<aside className="w-64 flex-shrink-0 flex flex-col p-4 bg-slate-900 border-r border-slate-700">
			<div className="flex items-center gap-2 px-2 pb-6">
				<div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
					<span className="text-white font-bold text-xl">QB</span>
				</div>
				<h1 className="text-xl font-bold text-white">Super QB</h1>
			</div>
			<nav className="flex flex-col gap-2">
				<a
					href="#"
					className="nav-link active flex items-center gap-3 px-3 py-2 rounded-md bg-slate-800 text-white"
				>
					<svg
						className="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
						/>
					</svg>
					<span>Players</span>
				</a>
				<a
					href="#"
					className="nav-link flex items-center gap-3 px-3 py-2 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
				>
					<svg
						className="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
					<span>Settings</span>
				</a>
			</nav>
		</aside>
	);
};
