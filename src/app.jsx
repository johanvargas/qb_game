import React, { useReducer, useEffect, useState, createContext, useContext } from 'react'
import { io } from "socket.io-client"
import Home from './Home'
//import Serial from './Serial'

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
export const PropsContext = createContext()

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

const gameInitialState  = {
  id: "g" + Date.now(), 
  score: 0, 
  throws: 3, 
  dateTime: Date.now(), 
  player: 'None',
  player_set: false,
  playing: false
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

// ADMIN Page
const Admin = () => {
  const { props, handleInputChange } = useProps()
  const { keepscore, setKeepScore } = useState(localStorage.getItem('score'))

  
  // Handle Create Player
  function handleSubmitCreate(e) {
    e.preventDefault()
   
    const name = e.target.name.value
    const st = e.target.store_location.value

    const constructPlayer = () => {
      const player = {
        "id": "p" + Date.now(),
        "name": name,
        "store_location": st,
        "games": [],
        "high_score": 0,
        "current_score": 0
      }
      return player
    }

    localStorage.setItem(name, JSON.stringify(constructPlayer()))

    handleInputChange('player', name)
    // props.setPlayer(prev => prev.concat({name, species, age, id: Date.now()}))
    //handleInputChange('player_set', props.player_set)
  }

  // Handle Start Game
  function handleSubmitStart(e) {
    e.preventDefault()
    // console.log('check current user: ', localStorage.getItem('current_player'))
    handleInputChange('player', localStorage.getItem('current_player'))
    console.log(props.player)
    //handleInputChange('player_set', props.player_set)
    //handleInputChange('player', currentPlayer) 
  }

  // Handle Stop Game
  function handleSubmitStop(e) {
    e.preventDefault()
    console.log('GAME STOPPED')

    const curr_player = localStorage.getItem('current_player')
    console.log('Current QB is: ', curr_player)

    const player_set = localStorage.getItem(curr_player)
    console.log('QB info pack: ', player_set)

    console.log ('user found: ', e.target.test_name.value)

    const u = localStorage.getItem(e.target.test_name.value)
    console.log('in ls: ', u)
    const jfy = JSON.parse(u)
    console.log(jfy.current_score)
    jfy.current_score = parseInt(localStorage.getItem('score'))
    console.log(jfy.current_score)
    const setnewplayer = localStorage.setItem(e.target.test_name.value, JSON.stringify(jfy))
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
      <div className="bg-blue-300 p-5 inline-block">        
        <div>        
          <form onSubmit={handleSubmitCreate}>
          <fieldset>
            <legend className="p-2 font-bold rounded-lg">Add New Player</legend>
            <label className="pr-4">Name</label>
            <input className="bg-gray-200 px-5 m-3" 
              value={name} 
              name="name" 
              onChange={e => setName(e.target.value)} 
              placeholder="enter name" />
		  <br/>
            <label className="pr-4">Store Location</label>
            <input className="bg-gray-200 px-5 m-3" 
              value={store_location} 
              name="store_location" 
              onChange={e => setStoreLocation(e.target.value)} 
              placeholder="enter location" />
		  <br/>
            <button className="hover:bg-gray-200">Add Player</button>
          </fieldset>
        </form>
      </div>
      <div className="bg-indigo-300 p-5 inline-block">        
          <form onSubmit={handleSubmitPick}>
          <fieldset>
            <legend className="p-2 font-bold rounded-lg">Select Existing Player</legend>
            <label className="pr-4">Name</label>
            <input className="bg-gray-200 px-5 m-3" 
              value={curr_name} 
              name="curr_name" 
              onChange={e => setCurrName(e.target.value)} 
              placeholder="enter name" />
		  <br/>
            <button className="hover:bg-gray-200">Select Player</button>
          </fieldset>
        </form>
      </div>
        <div>
          <p>Current localStorage player: {localStorage.getItem('current_player')}</p> 
        </div>
        <div>
          <p>Number of players stored in localStorage: {localStorage.length}</p> 
        </div>
    </div>
    )
  }

  const PlayerList = () => {
	 const array = []
	   for (let i = 0; i < localStorage.length; i++) {
			 const key = localStorage.key(i)
			 const value = localStorage.getItem(key)
			 //array.push(JSON.parse(value))
			 array.push(value)
	   }
        return (
		  <ul>
		  {array.map((p, index) => (<li className="bg-white m-1"key={index}>{p}</li>))}
		  </ul>
	   )
  }

  return (
	 <>
	 <h1 className="text-center">Admin Page</h1>
	 <h1 className="text-center">{props.player}</h1>
	 <div className="bg-orange-300 rounded-lg">
        <div>
          <p>Current localStorage player: { props.player ? props.player: 'Please add a player'}</p> 
        </div>
        <p 
	   className={props.playing? 'text-green-400 font-bold text-xlg': 'text-red-500 font-bold text-xlg'}>
	   {props.playing ? 'Game On' : 'Timout'}</p>
          <br/>
	   <p>{keepscore}</p>
	 <br />
	 <div className="inline-block">
	 <form onSubmit={handleSubmitStart}>
	   <fieldset>
        <button onClick={() => handleInputChange('playing', true)}>
		  Start Game
        </button>
	 </fieldset>
	 </form>
	 </div>
	 <div className="inline-block">
	 <form onSubmit={handleSubmitStop}>
	   <fieldset>
	   <input value={props.player} name="test_name" />
        <button onClick={() => handleInputChange('playing', false)}>
	     Stop Game
        </button>
	 </fieldset>
	 </form>
	 </div>
      </div>
	 <div>
	   <CreatePlayer />
      </div>
	 <div>
	   <PlayerList />
	 </div>
    </>
  )
}

// GAME PLAY/ LEADERBOARD SCREEN
const Display = () => {
  const { props, handleInputChange } = useProps()
  
  // localStorage helper, length
  const lsLength = () => {
    const lStore = localStorage.length
    return lStore
  }

  const Serial= () => {
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
		localStorage.setItem('score', score)
		//handleInputChange('score', score)

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
		  <h1>Last Serial Command Received:<span className="">{serialData}</span></h1>
		  <p className="font-bold">{stat ? 'Connected' : 'Disconnected'}</p>
		</div>
		<div className="bg-green-500 text-center shadow-md rounded-lg m-5 p-5">
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
    
    const playerlist = () => {
      const array = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
	   const value = localStorage.getItem(key)
	   array.push(value)
      }
        return array
    }

    useEffect(() => {
      const pl = playerlist()
      setTimeout(() => {
        setMsg('Set')
      }, 1000)

      return 

    },[])

    useEffect(() => {
      setTimeout(() => {
        setMsg('HiiiKe!')
      }, 2354)

    },[])

    useEffect(() => {
      setTimeout(() => {
        setMsg('')
      }, 3354)
      // Send command to LEDS to turn green and stay on
      
      return 
    },[])

    const Curtain = () => {
        if (msg === '') {
		  return <div className="">{msg}</div>
	   }
	   return <div className="block w-200 h-100 text-center fixed top-70 right-70 left-70 text-6xl bg-indigo-400">{msg}</div>
    }

    return (
      <>
	   <Curtain />
	   <br />
	   <p>Is player set? {`${props.playing}`}</p>
	   <p>Which player is playing? {props.player}</p>
	   <div className="">
		  <Serial />
	   </div>
      </>
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
            <footer className="text-center">
              create by antit3ch 
            </footer>
          </>
        )}
      </Router>
    </PropsProvider>
  )
}
