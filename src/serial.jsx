import React, { useState, useEffect, useRef } from 'react'
import { io } from "socket.io-client"

const Serial = () => {
    const [serialData, setSerialData] = useState('Waiting...')
    const [stat, setStat] = useState(false)
    const [score, setScore] = useState(0)

    const socket = io("http://localhost:8080")
    
    useEffect(() => {
	   let command
	   socket.on('serialdata', (data) => {
		  setSerialData(data.data)
		  incrementScore(data.data)
		  setStat(true)
	   })

	   socket.on('disconnect', () => {
		  setStat(false)
	   })

	   }, [score, stat])

    const incrementScore = (points) => {
	   setScore(score + points)
    }

    const resetScore = () => {
	   setScore(0)
    }
	 
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
    </div>
  )
}
export default Serial
