import { useEffect, useState } from "react";
import { useProps } from "../../hooks/useProps.jsx";

export const LoadScreen = () => {
	const [isvisible, setIsVisible] = useState(true);
	const { props } = useProps();

	useEffect(() => {
		setTimeout(() => {
			setIsVisible(false);
		}, 3000);
	}, []);

	return (
		<>
			{isvisible && <LoadScreenPresentation playing={props.playing} />}
		</>
	);
};

const LoadScreenPresentation = ({ playing }) => {
	return (
		<div className="absolute top-0 left-0 z-50 text-3xl text-white bg-[url(./assets/gradient_blue_bg.png)] w-screen h-screen text-center">
			Load Screen {playing}
		</div>
	);
};
