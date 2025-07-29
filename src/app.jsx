import React, { useReducer, useEffect, useState, createContext, useContext } from 'react'
import { io } from "socket.io-client"
import Home from './Home'

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
    handleInputChange('player', localStorage.getItem('current_player'))
    //handleInputChange('player_set', props.player_set)
    //handleInputChange('player', currentPlayer) 
  }

  // Handle Stop Game
  function handleSubmitStop(e) {
    e.preventDefault()
    const curr_player = localStorage.getItem('current_player')
    const player_set = localStorage.getItem(curr_player)
    const u = localStorage.getItem(e.target.test_name.value)
    const jfy = JSON.parse(u)
    jfy.current_score = parseInt(localStorage.getItem('score'))
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
      <div className="bg-blue-300 p-2">        
        <div>        
          <form onSubmit={handleSubmitCreate}>
          <fieldset>
            <legend className="p-2 font-bold rounded-lg">Add New Player</legend>
            <label className="pr-4">Name</label>
            <input className="bg-blue-200 px-2 m-2" 
              value={name} 
              name="name" 
              onChange={e => setName(e.target.value)} 
              placeholder="enter name" />
		  <br/>
            <label className="pr-2">Store Location</label>
            <input className="bg-blue-200 px-5 m-3" 
              value={store_location} 
              name="store_location" 
              onChange={e => setStoreLocation(e.target.value)} 
              placeholder="enter location" />
		  <br/>
            <button className="hover:bg-gray-200">Add Player</button>
          </fieldset>
        </form>
      </div>
      <div className="bg-blue-300 p-2">        
          <form onSubmit={handleSubmitPick}>
          <fieldset>
            <legend className="p-2 font-bold rounded-lg">Select Existing Player</legend>
            <label className="pr-2">Name</label>
            <input className="bg-blue-200 px-2 m-2" 
              value={curr_name} 
              name="curr_name" 
              onChange={e => setCurrName(e.target.value)} 
              placeholder="enter name" />
		  <br/>
            <button className="hover:bg-gray-200">Select Player</button>
          </fieldset>
        </form>
      </div>
        <div className="bg-white font-bold rounded-lg">
          <p>Current localStorage player <span className="bg-green-300 p-2 m-2 rounded-lg">{localStorage.getItem('current_player')}</span></p> 
        </div>
        <div>
          <p className="text-sm">Number of players stored in localStorage: {localStorage.length}</p> 
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
	 
	 if ( value[0] != '{') {
	   continue
	 }
	 array.push(value)
    }

    const { plist, setPlist } = useState(array)
    console.log('array values: ', plist)
    //{array.map((p, index) => (<li className="bg-white m-1"key={index}>{JSON.parse(p)}</li>))}
    //return <p>{JSON.parse(array[0]).store_location}</p>
    
    return (
    <div className="bg-blue-500 p-2 m-2 rounded-lg text-lg">
	 {array.map(item => <p>{JSON.parse(item).name} {JSON.parse(item).store_location} {JSON.parse(item).current_score}</p>)}
    </div>
    )
  }

  return (
	 <>
	 <div className="bg-blue-600 rounded-lg">
        <p 
	   className={props.playing? 'text-green-400 font-bold text-2xlg': 'text-red-500 font-bold text-2xlg'}>
	   {props.playing ? 'Game On' : 'Timout'}</p>
        <br/>
	   <div className="">
	    <form onSubmit={handleSubmitStart}>
		  <fieldset>
		    <button onClick={() => handleInputChange('playing', true)}>
			 Start Game
		    </button>
		  </fieldset>
	   </form>
	   </div>
	   <div className="">
		<form onSubmit={handleSubmitStop}>
		  <fieldset>
		  <input value={props.player} name="test_name" onChange=""/>
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

  const socket = io("http://localhost:8080")
  
  const Serial = () => {
    const [serialData, setSerialData] = useState('Waiting...')
    const [stat, setStat] = useState(false)
    const [score, setScore] = useState(0)

    console.log('Serial Component')
    
    useEffect(() => {
	 socket.on('serialdata', (data) => {
	   console.log('swipe received')
	   setSerialData(data.data)
	   incrementScore(data.data)
	   setStat(true)
	 })

	 //socket.on('disconnect', () => {
	 //  setStat(false)
	 //})
    
	 localStorage.setItem('score', score)

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
    },[])

    useEffect(() => {
      setTimeout(() => {
        setMsg('Hike!')
      }, 2354)
    },[])

    useEffect(() => {
      setTimeout(() => {
        setMsg('')
      }, 3054)
    },[])

    const Curtain = () => {
      if (msg === '') {
	   return <div className="bg">{msg}</div>
	 }
      
	 return <div className="block w-350 h-120 text-center fixed top-60 right-70 left-70 text-8xl bg-blue-600"><h1 className="text-white">{msg}</h1></div>
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
          </>
        )}
      </Router>
    </PropsProvider>
  )
}



/*
 *
          <p>Current localStorage player: { props.player ? props.player: 'Please add a player'}</p> 

            <footer className="text-center text-xs">
              create by antit3ch 
            </footer>


  // localStorage helper, length
  const lsLength = () => {
    const lStore = localStorage.length
    return lStore
  }

		*/
