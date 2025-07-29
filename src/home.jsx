import { useProps } from './app.jsx'
import { useState, useEffect } from 'react'

const mockPlayers = [
    {
	   "id": 34623452,
	   "rank": 1,
	   "store_location": "7656 W Lakeview Dr.",
	   "score": 175
    },
    {
	   "id": 12352654,
	   "rank": 2,
	   "store_location": "Cemetery Ridge, USA",
	   "score": 115
    },
    {
	   "id": 32759787,
	   "rank": 3,
	   "store_location": "221 B Baker St",
	   "score": 75
    },
    {
	   "id": 46537654,
	   "rank": 4,
	   "store_location": "742 Evergreen Terrace",
	   "score": 50
    },
    {
	   "id": 9878653,
	   "rank": 5,
	   "store_location": "124 Conch Street",
	   "score": 25
    }
]

const realPlayers = () => {
  let sendArray = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    const value = localStorage.getItem(key)
    if (value[0] != '{') {
      continue
   }
   const j = JSON.parse(value)
     sendArray.push(j) 
  }

  const sortedArray = sendArray.sort((a, b) => b.current_score - a.current_score) 
  const filterArray = sortedArray.filter(a => a.current_score > 0)
  console.log('hello there!', filterArray)

  return filterArray
}

export default function Home() {
    const [ranked, setRanked] = useState(mockPlayers)
    const [hold, setHold] = useState('Hold Item')

    useEffect(() => {
      const realPlayerList = realPlayers()
      let playerSort = realPlayerList.toSorted(realPlayerList.current_score)
      setRanked(playerSort)
    },[])

    const Rank = (plops) => {
      const plug = Object.values(plops)
      const plugParsed = plug[0]
      
      return (
		<tr>
		  <td className="font-bold text-xl bg-blue-300 border border-gray-300 text-center"><strong>{plops.rank + 1}</strong></td>
		  <td className="font-bold text-white text-xl bg-blue-800 border border-gray-300 text-center">{plugParsed.name}</td>
		  <td className="font-bold text-white text-xl bg-blue-800 border border-gray-300 text-center">{plugParsed.store_location}</td>
		  <td className="font-bold p-2 m-2 bg-blue-300 border border-gray-300 text-center">{plugParsed.current_score}</td>
	     </tr>
	   )
    }
    
    return ( 
	   <table className="w-full h-140 border-seperate border border-gray-300">
		  <thead>
		    <tr>
		      <th className="bg-blue-700"></th>
			 <th className=""><h1 className="bg-blue-700 text-5xl p-3 text-white">Leaderboard</h1></th>
		      <th className="bg-blue-700"></th>
		      <th className="bg-blue-700"></th>
		    </tr>
		    <tr className="bg-yellow-400 text-bold">
		      <th className="text-bold border border-gray-300" >Rank</th>
		      <th className="text-bold border border-gray-300" >Player</th>
			 <th className="text-bold border border-gray-300">Store Location</th>
			 <th className="text-bold border border-gray-300">Score</th>
		    </tr>
		  </thead>
	     <tbody>{ranked.map((player, index) => <Rank key={player.id} plops={ranked[index]} rank={index} name={player.name} store_location={player.store_location} current_score={player.current_score} />)}</tbody>
	   </table>
	 )
}
