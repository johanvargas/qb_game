import { useEffect, useState } from "react";

// Router
export const Router = ({ children }) => {
	const [path, setPath] = useState(window.location.hash || "#/");

	useEffect(() => {
		const handleHashChange = () => setPath(window.location.hash || "#/");
		window.addEventListener("hashchange", handleHashChange);
		return () => window.removeEventListener("hashchange", handleHashChange);
	}, []);

	return <div>{children({ path })}</div>;
};
