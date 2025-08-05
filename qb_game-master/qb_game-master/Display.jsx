// import { useEffect } from "react";
import useProps from "./useProps";

const Display = () => {
	const { props } = useProps();

	// const LeaderBoard = () => {
	// 	return <h1>Leader Board Here</h1>;
	// };

	// const Game = () => {
	// 	useEffect(() => {
	// 		console.log("Display: ", props);
	// 	}, []);
	// 	console.log("type of props: ", typeof props);
	// 	return (
	// 		<>
	// 			<h1>
	// 				Game On: <span>{`${props.playing}`}</span>
	// 			</h1>
	// 			<p>{props.id}</p>
	// 			<p>{props.state}</p>
	// 			<p>{props.score}</p>
	// 			<p>{props.thorws}</p>
	// 			<p>{props.dateTime}</p>
	// 			<p>{props.duration}</p>
	// 			<p>{props.player}</p>
	// 		</>
	// 	);
	// };

	return (
		<>
			<div>{props.playing ? <Game /> : <LeaderBoard />}</div>
		</>
	);
};

export default Display;
