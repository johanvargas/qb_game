import Home from "../Home";
import { useProps } from "../hooks/useProps.jsx";
import { ExitScreen } from "./game/ExitScreen.jsx";

export const LeaderBoard = () => {
	const { props } = useProps();

	return (
		<>
			<ExitScreen />
			<Home props={props} />
		</>
	);
};
