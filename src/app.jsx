import { Admin } from "./components/Admin.jsx";
import { Display } from "./components/Display.jsx";
import { Router } from "./components/Router.jsx";
import { PropsProvider } from "./context/PropsContext.jsx";

// Main App component
export default function App() {
	return (
		<PropsProvider>
			<Router>
				{({ path }) => (
					<>
						{path === "#/display" && <Display />}
						{(path === "#/admin" || path === "#/") && <Admin />}
					</>
				)}
			</Router>
		</PropsProvider>
	);
}
