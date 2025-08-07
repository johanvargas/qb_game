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
	
	// handleSetDeck is for child components to update the deck
    const handleSetDeck = (newValue) => { 
	    setDeck(newValue)
    }

    return (
	 <div className="m-auto p-2 max-w-7xl">
	   <div className="flex items-center">
	     <div className="w-1/2">
	       <Header />
	     </div>
	     <div className="w-1/2 flex items-center justify-end space-x-4">
	       <StatusIndicator playing={props.playing} />
	       <GameControls />
	     </div>
	   </div>
	   <div>
		<CreatePlayer onStateChange={handleSetDeck} />
	   </div>
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
		  <DeletePlayer setDeck={handleSetDeck} deck={deck} props={props}/>
		  <UpdateScore onStateChange={handleSetDeck} />
	   </div>
	   <div className="mb-8">
		<p className="text-gray-300 text-lg p-4 bg-gray-800 rounded-lg">
		  Number of players stored: {localStorage.length - 2}
		</p>
	   </div>
	   <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
		<PlayerCards deck={deck}/>
	   </div>
	 </div>
	);
};