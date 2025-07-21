import { useProps } from './app.jsx'
import { useState } from 'react'


// TODO:	  Pull games from localStorage order by score filter top 5
//		  show rank, name, store

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
    const sendArray = []

    for (let i; i <= localStorage.length; i++) {
	   const key = localStorage.key(i)
	   const value = localStorage.getItem(key)
	   console.log('Shake it, Break it, hang it on the wall, ', JSON.parse(value))
	   sendArray.concat(value)
    }

    return sendArray
}

export default function Home(props) {
    const [ranked, setRanked] = useState(mockPlayers)
    const Rank = (props) => {
	   return (
			 <tr className="">
			 <td className="font-bold text-lg bg-blue-300">{props.rank}</td>
			 <td className="font-bold text-white text-xl bg-blue-800">{props.store_location}</td>
			 <td className="font-bold p-2 bg-blue-300">{props.score}</td>
			 </tr>
	   );
    };
	 return ( 
	    <>
		<table className="w-full h-130">
		  <thead>
		    <tr>
		<th className="bg-blue-700"></th>
			 <th>
		      <h1 className="bg-blue-700 text-5xl p-3 text-white">Leaderboard</h1>
			 </th>
		<th className="bg-blue-700"></th>
		    </tr>
		    <tr className="bg-yellow-400 text-bold">
			   <th className="text-bold" >Rank</th>
			   <th className="text-bold">Store Location</th>
			   <th className="text-bold">Score</th>
		    </tr>
		  </thead>
		  <tbody>
		    {
			  ranked.map(player => <Rank rank={player.rank} 
			  store_location={player.store_location} 
			  score={player.score} key={player.id} />)
		    }
		  </tbody>
	     </table>
	    </>
	 );
};
