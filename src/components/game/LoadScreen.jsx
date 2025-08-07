import { useEffect, useState } from "react";
import { useProps } from "../../hooks/useProps.jsx";
import { Header } from "../shared/Header.jsx"

export const LoadScreen = () => {
	const [isvisible, setIsVisible] = useState(true);
	const { props } = useProps();

	useEffect(() => {
		console.log('LoadScreen mounted, will hide in 3 seconds');
		const timer = setTimeout(() => {
			console.log('LoadScreen hiding now');
			setIsVisible(false);
		}, 3000);
		
		return () => clearTimeout(timer);
	}, []);

	return (
		<div>
			{isvisible ? (
				<LoadScreenPresentation 
					playing={props.player} 
				/>
			) : null}
		</div>
	);
};

const LoadScreenPresentation = ({ playing }) => {
	console.log('LoadScreenPresentation rendering with player:', playing);
	return (
		<div 
			className="fixed inset-0 text-7xl text-white bg-[url(./assets/gradient_blue_bg.png)] w-full h-full flex flex-col items-center justify-center z-50"
		>
			<div className="flex flex-col items-center justify-center h-full w-full">
				<Header />
				<div className="mt-8 text-center">
					Now Playing: {playing || 'No Player'}
				</div>
			</div>
		</div>
	);
};
