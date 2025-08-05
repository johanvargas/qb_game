import { useProps } from "../hooks/useProps.jsx";
import { ExitScreen } from "./game/ExitScreen.jsx";
import Home from "../Home";

export const LeaderBoard = () => {
	const { props } = useProps();

	return (
		<>
			<ExitScreen />
			<Home props={props} />
		</>
	);
};