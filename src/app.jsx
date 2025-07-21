import React, { useReducer, useEffect, useState, createContext, useContext } from 'react'
import { io } from "socket.io-client"
import Serial from './Serial'
import Home from './Home'

// Router
const Router = ({ children }) => {
  const [path, setPath] = useState(window.location.hash || '#/');
  
  useEffect(() => {
    const handleHashChange = () => setPath(window.location.hash || '#/');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  return <div>{children({ path })}</div>;
};

// Context for shared state
export const PropsContext = createContext();

// Reducer
const propsReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PROP':
      return { ...state, [action.key]: action.value };
    case 'SET_ALL_PROPS':
      return action.props;
    default:
      return state;
  }
};

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
  const [props, dispatch] = useReducer(propsReducer, gameInitialState);
  const [channel] = useState(() => new BroadcastChannel('props-sync'));

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'PROPS_UPDATE') {
        dispatch({ type: 'SET_ALL_PROPS', props: event.data.props });
      }
    };

    channel.addEventListener('message', handleMessage);
    return () => channel.removeEventListener('message', handleMessage);
  }, [channel]);

  const handleInputChange = (key, value) => {
    dispatch({ type: 'UPDATE_PROP', key, value });
    const newProps = { ...props, [key]: value };
    channel.postMessage({
      type: 'PROPS_UPDATE',
      props: newProps
    });
  };

  return (
    <PropsContext.Provider value={{ props, handleInputChange }}>
      {children}
    </PropsContext.Provider>
  );
};

// Hook to use props context
export const useProps = () => {
  const context = useContext(PropsContext);
  if (!context) {
    throw new Error('useProps is not in PropsProvider');
  }
  return context;
};

// ADMIN Page
const Admin = () => {
  const { props, handleInputChange } = useProps()

  useEffect(() => {
  },[])

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
    localStorage.setItem('current_player', name)

    handleInputChange('player', name)
    // props.setPlayer(prev => prev.concat({name, species, age, id: Date.now()}))
    //handleInputChange('player_set', props.player_set)
  }

  // Handle Start and Stop Game
  function handleSubmitStart(e) {
    e.preventDefault()
	 console.log('check current user: ', localStorage.getItem('current_player'))
    //handleInputChange('player_set', props.player_set)
    //handleInputChange('player', currentPlayer) 
  }

  const CreatePlayer = () => {
    const [name, setName] = useState('')
    const [store_location, setStoreLocation] = useState('')
    
    return (
      <div className="bg-blue-300 p-5 m-4 inline-block">        
        <div>        
          <form onSubmit={handleSubmitCreate}>
          <fieldset>
            <legend>Add New Player</legend>
            <label className="pr-4">Name</label>
            <input className="bg-gray-400 px-5 m-3" 
              value={name} 
              name="name" 
              onChange={e => setName(e.target.value)} 
              placeholder="enter name" />
            <label className="pr-4">Store Location</label>
            <input className="bg-gray-400 px-5 m-3 text-" 
              value={store_location} 
              name="store_location" 
              onChange={e => setStoreLocation(e.target.value)} 
              placeholder="enter location" />
            <button>Add Player</button>
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
			 const key = localStorage.key(i);
			 const value = localStorage.getItem(key);
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
	 <h1>Admin Page</h1>
	 <div className="inline-block bg-orange-400 rounded-lg">
	   <p>Game in session :</p>
        <p 
	   className={props.playing? 'text-green-400 font-bold text-lg': 'text-red-500 font-bold text-lg'}>
	   {`${props.playing}`}</p>
          <br/>
	   <Serial />
	 <br />
	 <form onSubmit={handleSubmitStart}>
	   <fieldset>
	   <input value={props.name} name="" />
        <button onClick={() => handleInputChange('playing', !props.playing)}>
	     {props.playing ? 'Stop Game' : 'Start Game'}
        </button>
	 </fieldset>
	 </form>
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
  const { props } = useProps()
  
  // localStorage helper, length
  const lsLength = () => {
    const lStore = localStorage.length
    return lStore
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
			 const key = localStorage.key(i);
			 const value = localStorage.getItem(key);
			 //array.push(JSON.parse(value))
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

    return (
      <>
        <div className="fixed top-100 right-100 left-100 text-4xl bg-indigo-200">{msg}</div>
	   <br />
	   <p>Is player set? {`${props.playing}`}</p>
	   <p>Which player is playing? {props.player}</p>
	   <div className="">
	   <Serial />
	   </div>
      </>
    )
  }

  return (
    <>
      <div>{props.playing ? (<Game/>): (<LeaderBoard />)}</div>
    </>
  )
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
  );
}
