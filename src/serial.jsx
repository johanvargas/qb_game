import React, { useState, useEffect, useRef } from 'react';
import { io } from "socket.io-client";
//import serialConverter from '../middleware/serialConverter.js';

const Serial = () => {
    const [serialData, setSerialData] = useState('Waiting...');
    const [stat, setStat] = useState(false);
    const [score, setScore] = useState(0);

    const socket = io("http://localhost:8080");
    
    useEffect(() => {
	   let command;
	   socket.on('serialdata', (data) => {
		  setSerialData(data.data);
		  incrementScore(data.data);
		  setStat(true);
	   });

	   socket.on('disconnect', () => {
		  setStat(false);
	   });

	   }, [score, stat]);

    const incrementScore = (points) => {
	   setScore(score + points);
    };

    const resetScore = () => {
	   setScore(0);
    };
	 
  return (
    <div className="flex flex-col bg-blue-400 p-2">
	 <div className="">
	   <h1>Last Serial Command Received: <span className="">{serialData}</span> </h1>
	   <p className="font-bold">{stat ? 'Connected' : 'Disconnected'}</p>
      </div>
	 <div className="bg-green-500 text-center shadow-md rounded-lg m-5 p-5">
	   <p className="text-3xl justify-center">Score</p>
	   <p className="text-6xl justify-center font-bold test-gray-800 mb-2">{score}</p> 
    </div>

	 <div className="justify-center">

	 </div>
    </div>
  );
};

export default Serial

/*
	   <button 
		  className="font-bold p-2 m-4 bg-indigo-300 rounded-2xl w-40 border-2 border-black-300 hover:bg-green-200" 
		  onClick={resetScore}>Reset
	   </button>
	   */
