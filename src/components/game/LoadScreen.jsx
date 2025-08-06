import { useEffect, useState } from "react";
import { useProps } from "../../hooks/useProps.jsx";
import { Header } from "../shared/Header.jsx"

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
			{isvisible ? (
				<LoadScreenPresentation playing={props.player} />
			) : (
				<div className="hidden"></div>
			)}
		</>
	);
};

const LoadScreenPresentation = ({ playing }) => {
	return (
		<div className="text-3xl text-white bg-[url(./assets/gradient_blue_bg.png)] w-auto h-screen text-center">
	  <Header />
			<div className="text-5xl">Now Playing: {playing}</div>
		</div>
	);
};
