import { useState, useEffect } from "react";
import { useProps } from "../../hooks/useProps.jsx";

export const ExitScreen = () => {
	const { props } = useProps();
	const [state, setState] = useState({ ...props });
	const [isvisible, setIsVisible] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsVisible(false);
		}, 3000);
	}, []);

	return isvisible ? (
		<div className="text-3xl text-white bg-[url(./assets/gradient_blue_bg.png)] w-auto h-screen text-center">
			YOUR SCORE: {props.score}
		</div>
	) : (
		<div className="hidden"></div>
	);
};