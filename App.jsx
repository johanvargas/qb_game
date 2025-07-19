import React, { useReducer, useEffect, useState, createContext, useContext } from 'react';

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
const PropsContext = createContext();

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
  id: 0, 
  state: ['InitialSettings', 'PlayGame', 'WrapUp'], 
  score: 0, 
  throws: 3, 
  dateTime: '', 
  duration: 'interval function', 
  player: 'Player obj',
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
const useProps = () => {
  const context = useContext(PropsContext);
  if (!context) {
    throw new Error('useProps is not in PropsProvider');
  }
  return context;
};

const Admin = () => {
  const { props, handleInputChange } = useProps()
  function handleSubmit(e) {
    e.preventDefault()
   
    const name = e.target.name.value
    const st = e.target.store_location.value
    
    console.log(e.target.name.value)
    console.log(e.target.store_location.value)

    // Creates Player by adding to localStorage
    // JSON.parse
    const constructPlayer = () => {
      const player = {
        "id": Date.now(),
        "name": name,
        "store_location": st,
        "games": [],
        "high_score": 0,
        "current_score": 0
      }
      return player
    }
    localStorage.setItem(name, JSON.stringify(constructPlayer()))
     // props.setPlayer(prev => prev.concat({name, species, age, id: Date.now()}))
  }

  const CreatePlayer = () => {
    const [name, setName] = useState('')
    const [store_location, setStoreLocation] = useState('')
    
    const logValue = (value) => {
      console.log('value: ', value)
    }

    return (
      <div className="bg-blue-300 p-5 m-4 inline-block">        
        <div>        
          <form onSubmit={handleSubmit}>
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
          <p>Number of players stored in localStorage: {localStorage.length}</p> 
        </div>
    </div>
    )
  }

  console.log(props)
  return (
      <>    
        <h1>Admin Page</h1>
        <div className="p-4 m-4 bg-indigo-600">
          <p>Game in session :</p>
          <p className={props.playing? 'text-green-400 font-bold': 'text-red-500 font-bold'}> {`${props.playing}`}</p>
          <br/>
          <button onClick={() => handleInputChange('playing', !props.playing)}>
            {props.playing ? 'Stop Game' : 'Start Game'}
          </button>
        </div>
        <CreatePlayer />
    </>
  )
}

const Display = () => {
  const { props } = useProps()
  
  const LeaderBoard = () => {
    return <h1>Leader Board Here</h1>
  }

  const Game = () => {
    const [msg, setMsg] = useState('')
    const [addPoints, setAddPoints] = useState(0)

    useEffect(() => {
      const command_one = setTimeout(() => {
        setMsg('Set')
      }, 1000)
      
      // Send command to LEDS to turn green and stay on
      
      return
    },[])

    useEffect(() => {
      const command_two = setTimeout(() => {
        setMsg('HiiiKe!')
      }, 2354)

      // Send command to LEDS to turn green and stay on
      
      return
    },[])

    return (
      <>
        <h2>{msg}</h2>
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
          <div>
            <div className="p-4 m-4">
              {path === '#/display' && <Display />}
              {(path === '#/admin' || path === '#/') && <Admin />}
            </div>
            <footer className="text-center text-sm text-gray-600">
              create by antit3ch 
            </footer>
          </div>
        )}
      </Router>
    </PropsProvider>
  );
}
