import { useState, useEffect } from "react";
import { useProps } from "../hooks/useProps.jsx";
import { getDeck } from "../utils/localStorage.js";
import { Header } from "./shared/Header.jsx";
import { StatusIndicator } from "./shared/StatusIndicator.jsx";
import { GameControls } from "./admin/GameControls.jsx";
import { CreatePlayer } from "./admin/CreatePlayer.jsx";
import { DeletePlayer } from "./admin/DeletePlayer.jsx";
import { PlayerCards } from "./admin/PlayerCards.jsx";
import { UpdateScore } from "./admin/UpdateScore.jsx";

export const Admin = () => {
	const { props } = useProps();
	const { keepscore, setKeepScore } = useState(localStorage.getItem("score"));
	const [deck, setDeck] = useState(getDeck());
	
	console.log(props);
	// handleSetDeck is for child components to update the deck
    const handleSetDeck = (newValue) => { 
	    setDeck(newValue)
    }

    return (
	 <div className="m-auto">
	   <Header />
	   <StatusIndicator playing={props.playing} />
	   <GameControls />
			
	   <div>
		<CreatePlayer onStateChange={handleSetDeck} />
	   </div>
		<div className="grid grid-cols-2">
		  <DeletePlayer setDeck={handleSetDeck} deck={deck} props={props}/>
		  <UpdateScore />
	   </div>
	   <div>
		<p className="text-gray-300 text-lg p-2">
		  Number of players stored: {localStorage.length - 2}
		</p>
	   </div>
	   <div className="grid grid-cols-3">
		<PlayerCards deck={deck}/>
	   </div>
	 </div>
	);
};