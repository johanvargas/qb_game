import { useEffect, useState } from "react";
import { useProps } from "../../hooks/useProps.jsx";
import { Header } from "../shared/Header.jsx"

export const LoadScreen = () => {
	const [isvisible, setIsVisible] = useState(true);
	const [isAnimating, setIsAnimating] = useState(false);
	const { props } = useProps();

	useEffect(() => {
		// Animate in on mount
		setIsAnimating(true);
		
		setTimeout(() => {
			// Start fade out animation
			setIsAnimating(false);
			setTimeout(() => {
				setIsVisible(false);
			}, 500); // Wait for fade out animation to complete
		}, 3000);
	}, []);

	return (
		<>
			{isvisible && (
				<LoadScreenPresentation 
					playing={props.player} 
					isAnimating={isAnimating}
				/>
			)}
		</>
	);
};

const LoadScreenPresentation = ({ playing, isAnimating }) => {
	return (
		<div 
			className={`text-3xl text-white bg-[url(./assets/gradient_blue_bg.png)] w-auto h-screen text-center transition-all duration-500 ease-in-out ${
				isAnimating 
					? 'opacity-100 translate-y-0' 
					: 'opacity-0 translate-y-4'
			}`}
		>
			<Header />
			<div 
				className={`text-5xl transition-all duration-700 ease-out ${
					isAnimating 
						? 'opacity-100 translate-y-0' 
						: 'opacity-0 translate-y-8'
				}`}
				style={{ transitionDelay: isAnimating ? '200ms' : '0ms' }}
			>
				Now Playing: {playing}
			</div>
		</div>
	);
};
