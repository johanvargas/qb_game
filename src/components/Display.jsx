import { useProps } from "../hooks/useProps.jsx";
import { Game } from "./Game.jsx";
import { LeaderBoard } from "./LeaderBoard.jsx";

//TODO: game flow check
//TODO: in/out displays
export const Display = () => {
	const { props } = useProps();
	return <div>{props.playing ? <Game /> : <LeaderBoard />}</div>;
};