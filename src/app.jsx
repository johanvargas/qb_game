import React, { useReducer, useEffect, useState, createContext, useContext } from 'react'
import { io } from "socket.io-client"
import Home from './Home'

import header from './assets/header.png'
import gradient from './assets/gradient_blue_bg.png'
import star from './assets/Star.png'

/*************************************/
/*** ROUTER AND PROPS ***************/
/*************************************/
// Router
const Router = ({ children }) => {
  const [path, setPath] = useState(window.location.hash || '#/')
  
  useEffect(() => {
    const handleHashChange = () => setPath(window.location.hash || '#/')
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])
  
  return <div>{children({ path })}</div>
}

// Context for shared state
const PropsContext = createContext()

// Reducer
const propsReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PROP':
      return { ...state, [action.key]: action.value }
    case 'SET_ALL_PROPS':
      return action.props
    default:
      return state
  }
}

// something to do with holding the whole state
const gameInitialState  = {
  id: "g" + Date.now(), 
  score: 0, 
  throws_: 3, 
  dateTime: Date.now(), 
  player: 'No player set',
  player_set: false,
  playing: false,
  closing: false,
  intro: false,
}

// Props provider
const PropsProvider = ({ children }) => {
  const [props, dispatch] = useReducer(propsReducer, gameInitialState)
  const [channel] = useState(() => new BroadcastChannel('props-sync'))

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'PROPS_UPDATE') {
        dispatch({ type: 'SET_ALL_PROPS', props: event.data.props })
      }
    }

    channel.addEventListener('message', handleMessage)
    return () => channel.removeEventListener('message', handleMessage)
  }, [channel])

  const handleInputChange = (key, value) => {
    dispatch({ type: 'UPDATE_PROP', key, value })
    const newProps = { ...props, [key]: value }
    channel.postMessage({
      type: 'PROPS_UPDATE',
      props: newProps
    })
  }

  return (
    <PropsContext.Provider value={{ props, handleInputChange }}>
      {children}
    </PropsContext.Provider>
  )
}

// Hook to use props context
export const useProps = () => {
  const context = useContext(PropsContext)
  if (!context) {
    throw new Error('error: useProps is not in PropsProvider')
  }
  return context
}

/*************************************/
/*** ADMIN PAGE ***/
/*************************************/

const Admin = () => {
  const { props, handleInputChange } = useProps()
  const { keepscore, setKeepScore } = useState(localStorage.getItem('score'))

  useEffect(() => {
    setTimeout(() => handleInputChange('closing', false), 4000)
  },[props.closing])


  // Handle Start Game //
  function handleSubmitStart(e) {
    e.preventDefault()
    handleInputChange('player', localStorage.getItem('current_player'))
  }

  // Handle Stop Game //
  function handleSubmitStop(e) {
    e.preventDefault()
    // setting game state to player obj in localStorage
    const curr_player = localStorage.getItem('current_player')
    const player_set = localStorage.getItem(curr_player)
    const u = localStorage.getItem(e.target.test_name.value)
    const jfy = JSON.parse(u)
    jfy.current_score = parseInt(localStorage.getItem('score'))
    localStorage.setItem(e.target.test_name.value, JSON.stringify(jfy))
    
  }

  // Handle Create Player //
  function handleSubmitCreate(e) {
    e.preventDefault()
   
    // this should probably be a class
    const constructPlayer = () => {
	 const quarterback = {
	   "id": "p" + Date.now(),
	   "name": name,
	   "store_location": st,
	   "games": [],
	   "high_score": 0,
	   "current_score": 0
	 }
	 return quarterback
    }

    const name = e.target.name.value
    const st = e.target.store_location.value

    localStorage.setItem(name, JSON.stringify(constructPlayer()))
    localStorage.setItem('current_player', name)

    // props.setPlayer(prev => prev.concat({name, species, age, id: Date.now()}))
    handleInputChange('player', name)
  }

  // Handle Select Existing Player to Play
  function handleSubmitPick(e) {
    e.preventDefault()
    localStorage.setItem('current_player', e.target.curr_name.value)
    handleInputChange('player', e.target.curr_name.value)
  }

  const CreatePlayer = () => {
    const [name, setName] = useState('')
    const [store_location, setStoreLocation] = useState('')
    const [curr_name, setCurrName] = useState('')
    
    return (
      <div> 
        <div className="bg-white font-bold">
          <div className="p-4 text-3xl">Current Player Ready 
		  <span className="bg-green-400 ml-69 text-6xl">
		    {localStorage.getItem('current_player')}
		  </span>
		</div> 
        </div>
	 <div className="grid grid-cols-2">
        <div className="p-5">        
          <form className="" onSubmit={handleSubmitCreate}>
		  <fieldset>
		    <legend>Add New Player</legend>
		    <label className="">Name</label>
		    <input type="text" className="bg-gray-200 px-1 m-2" 
			 value={name} 
			 name="name" 
			 onChange={e => setName(e.target.value)} 
			 placeholder="enter name" />
		    <br/>
		    <label className="">Store Location</label>
		    <input type="text" className="bg-gray-200" 
			 value={store_location} 
			 name="store_location" 
			 onChange={e => setStoreLocation(e.target.value)} 
			 placeholder="enter location" />
		    <br/>
		    <button className="hover:bg-gray-300">Add Player</button>
		  </fieldset>
          </form>
        </div>
	   <div className="bg-green-300 p-5">        
		<form onSubmit={handleSubmitPick}>
		  <fieldset>
		    <legend className="rounded-sm">Select Existing Player</legend>
		    <label className="">Name</label>
		    <input className="bg-gray-100" 
			 value={curr_name} 
			 name="curr_name" 
			 onChange={e => setCurrName(e.target.value)} 
			 placeholder="enter name" />
		    <br/>
		    <button className="content-center hover:bg-gray-300">Select Player</button>
		  </fieldset>
		</form>
	   </div>
	 </div>
    </div>
    )
  }

  const PlayerList = () => {
    const array = []
    for (let i = 0; i < localStorage.length; i++) {
	 const key = localStorage.key(i)
	 const value = localStorage.getItem(key)
	 
	 if ( value[0] != '{') {
	   continue
	 }
	 array.push(value)
    }
//TODO: beautify cards +1/4
    const playerCard = (item) => {
	 return (
	   <div className="m-2 bg-violet-300 text-center" key={JSON.parse(item).id}>
		<img className="h-5 w-5" src={star} alt="star" />
		<div className="">{JSON.parse(item).name}</div> 
		<div>{JSON.parse(item).store_location}</div>
		<div>{JSON.parse(item).current_score}</div>
	   </div>
	 )
    }
    
    return (
	 <>
	   {array.map(item => playerCard(item))}
	 </>
    )
  }

  const DeletePlayer = () => {
    const [name, setName] = useState('')
    function handleDeletePlayer (formData) {
	 console.log('Delete Player: ', formData.get("name"))
	 const player = formData.get("name")
	 if (localStorage.getItem(player)) {
	   console.log('We got a match', localStorage.getItem(player))
	 }
    }

    return (
	 <div className="bg-fuchsia-300 p-5">        
	   <form action={handleDeletePlayer}>
		<fieldset>
		  <legend className="rounded-sm">Delete Player</legend>
		  <label className="">Name</label>
		  <input className="bg-gray-100" 
		    value={name} 
		    name="name" 
		    onChange={e => setName(e.target.value)} 
		    placeholder="enter name" />
		  <br/>
		  <button className="content-center hover:bg-gray-300">Delete Player</button>
		</fieldset>
	   </form>
	 </div>
    )
  }

//TODO: beautify forms +1/2
  return (
    <div className="font-sans">
	 <header className="font-sans mb-17 pt-5">
	   <img className="h-30 m-auto" src={header} alt="game header" />
	 </header>
	 <div className="h-100 font-sans rounded-sm">
	   <div className={props.playing? 'w-80 m-auto p-2 pt-3 bg-green-300 text-green-700 font-bold text-7xl text-center rounded-full': 'w-80 m-auto p-2 pt-3 text-center bg-red-400 text-red-700 font-bold font-sans text-7xl rounded-full'}>
		{props.playing ? 'Hike' : 'Timeout'}
	 </div>
	 <br/>
	 <div>
	   <form onSubmit={handleSubmitStart}>
		<fieldset>
		  <button className="w-full" onClick={() => handleInputChange('playing', true)}>
		    Start Game
		  </button>
		</fieldset>
	   </form>
	 </div>
	 <div>
	   <form onSubmit={handleSubmitStop}>
	 	<fieldset>
	 	  <input className="hidden" value={props.player} name="test_name"/>
	 	    <button  className="w-full" onClick={() => handleInputChange('playing', false)}>
	 		 Stop Game
	 	    </button>
	 	</fieldset>
	   </form>
	  </div>
    </div >
	   <div><CreatePlayer /></div>
	   <div><DeletePlayer /></div>
	   <div>
	     <p className="text-gray-300 text-lg p-2">
		  Number of players stored: {localStorage.length}
		</p> 
        </div>
	   <div className="grid grid-cols-3"><PlayerList /></div>
    </div>
  )
}

/*************************************/
/*** GAME PLAY/ LEADERBOARD SCREEN ***/
/*************************************/

//TODO: game flow check
//TODO: in/out displays
const Display = () => {
  const { props, handleInputChange } = useProps()
  const socket = io("http://localhost:8080")
  
//TODO: calibrate sensors  
  const Serial = () => {
    const [serialData, setSerialData] = useState('Waiting...')
    const [score, setScore] = useState(0)
    const [point, setPoint] = useState(0)
    const [time, setTime] = useState(0)
    const [prev, setPrev] = useState('')

    useEffect(() => {
	 socket.on('serialdata', (data) => {
	   console.log('serial data: ', data)
	   incrementScore(data.point)
	 })
    
	 localStorage.setItem('score', score)

    }, [score])

    const incrementScore = (points) => {
      setScore(score + points)
    } 

    const resetScore = () => {
      setScore(0)
    }
		
    return (
	 <div className="flex flex-col bg-blue-400">
	   <div>
		<div className="text-2xl">Last Serial Command Received:<span className="">{serialData}</span></div>
	   </div>
	   <div className="bg-green-500 text-center rounded-sm">
		<p className="text-3xl justify-center">Score</p>
		<p className="text-6xl justify-center font-bold test-gray-800 mb-2">{score}</p> 
	   </div>
	 </div>
    )
  }

  // Screen Leaderboard
  const LeaderBoard = () => {
    return (
      <Home props={props}/>
    )
  }

  // Screen Game
  const Game = () => {
    const [msg, setMsg] = useState('Ready')
    const [addPoints, setAddPoints] = useState(0)
    const [player, setPlayer] = useState('')
    const [closingState, setClosingState] = useState(props.closing)
    const [introState, setIntroState] = useState(props.intro)

    //if (props.closing === true && props.playing === false) {
	 //return <div className="absolute text-center text-9xl font-sans bg-blue-800"><div className="text-white">Your Score Here</div></div>
    //} 

    //if (props.intro === true && props.playing === true) {
	 // return <div className="absolute bg-[url('./assets/gradient_blue_bg.png')] bottom-0 left-0 text-center fixed top-60 right-70 left-70 text-8xl bg-blue-600"><div className="text-white">Intro Panel</div></div>
    //}

    const playerlist = () => {
      const array = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
	   const value = localStorage.getItem(key)
	   array.push(value)
      }
	 return array
    }

    return (
	 <div className="m-auto">
	  <Serial />
	 </div>
    )
  }

  return <div>{props.playing ? (<Game />): (<LeaderBoard />)}</div>
}

// Main App component
export default function App() {
  return (
    <PropsProvider>
      <Router>
        {({ path }) => (
          <>
            {path === '#/display' && <Display />}
            {(path === '#/admin' || path === '#/') && <Admin />}
          </>
        )}
      </Router>
    </PropsProvider>
  )
}
