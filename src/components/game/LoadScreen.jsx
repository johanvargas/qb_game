import { useEffect, useState } from "react";
import { useProps } from "../../hooks/useProps.jsx";
import { Header } from "../shared/Header.jsx"

export const LoadScreen = () => {
	const [isvisible, setIsVisible] = useState(true);
	const [isAnimating, setIsAnimating] = useState(false);
	const { props } = useProps();

	useEffect(() => {
		console.log('LoadScreen mounted, will hide in 3 seconds');
		
		// Start animation in
		setIsAnimating(true);
		
		const timer = setTimeout(() => {
			console.log('LoadScreen hiding now');
			// Start animation out
			setIsAnimating(false);
			
			// Hide component after animation completes
			setTimeout(() => {
				setIsVisible(false);
			}, 300); // Match the transition duration
		}, 3000);
		
		return () => clearTimeout(timer);
	}, []);

	return (
		<div>
			{isvisible ? (
				<LoadScreenPresentation 
					playing={props.player}
					isAnimating={isAnimating}
				/>
			) : null}
		</div>
	);
};

const LoadScreenPresentation = ({ playing, isAnimating }) => {
	console.log('LoadScreenPresentation rendering with player:', playing);
	return (
		<div 
			className={`fixed inset-0 text-7xl text-white bg-[url(./assets/gradient_blue_bg.png)] w-full h-full flex flex-col items-center justify-center z-50 transition-all duration-300 ease-in-out ${
				isAnimating 
					? 'opacity-100 scale-100' 
					: 'opacity-0 scale-95'
			}`}
		>
			<div className="flex flex-col items-center justify-center h-full w-full">
				<Header />
				<div className={`mt-8 text-center transition-all duration-400 ease-out ${
					isAnimating 
						? 'opacity-100 translate-y-0' 
						: 'opacity-0 translate-y-4'
				}`}
				style={{ transitionDelay: isAnimating ? '100ms' : '0ms' }}>
					Now Playing: {playing || 'No Player'}
				</div>
			</div>
		</div>
	);
};
