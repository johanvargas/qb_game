import { useEffect, useState } from "react";
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
		<div className="absolute top-0 left-0 z-50 text-3xl text-white bg-[url(./assets/gradient_blue_bg.png)] w-screen h-screen text-center">
			YOUR SCORE: {props.score}
		</div>
	) : (
		<div className="hidden"></div>
	);
};
