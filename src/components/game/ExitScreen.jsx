import { useState, useEffect } from "react";
import { useProps } from "../../hooks/useProps.jsx";
import { Header } from "../shared/Header.jsx";
import { getDeck, getDeckPlayerScore } from "../../utils/localStorage.js";

export const ExitScreen = () => {
	const { props } = useProps();
	const [state, setState] = useState("");
	const [isvisible, setIsVisible] = useState(true);

	useEffect(() => {
		//console.log('exit screen props: ', props)
		//console.log('exit screen deck: ', getDeck())
		//console.log('exit screen props current player: ', props.player)
		
		const score = getDeckPlayerScore(props.player)
		//console.log('should be a number: ', score)
		setState(score)
		
		setTimeout(() => {
			setIsVisible(false);
		}, 3000);
	}, []);
    
    const WelcomeScreen = () => {
	 return (
	   isvisible ? (
		<div 
		  className="absolute x-0 y-0 text-7xl text-white bg-[url(./assets/gradient_blue_bg.png)] w-screen h-screen text-center">
		<Header />
		    Are You The Best Arm In The NFL?
		</div> ) : ( <div className="hidden"></div>)
	 )
    }

	const ScoreCard = () => {
	  return (
	    isvisible ? (
		<div 
		  className="absolute x-0 y-0 text-7xl text-white bg-[url(./assets/gradient_blue_bg.png)] w-screen h-screen text-center">
		<Header />
		    YOUR SCORE: {state}
		</div>
	   ) : (
		  <div className="hidden"></div>
	   )
	  );
	}

  return ( props.player ? <ScoreCard /> : <WelcomeScreen />)
};
