import AdminSidebar from "./AdminSidebar";

function AdminLayout({ children }) {
	return (
		<div className="flex min-h-screen bg-background text-foreground">
			<AdminSidebar />
			<main className="flex-1 p-8">{children}</main>
		</div>
	);
}

export default AdminLayout;
