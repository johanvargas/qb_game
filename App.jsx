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


//Links
//const Link = ({ to, children }) => (
//  <a href={to} className="text-blue-500 hover:underline">
//    {children}
//  </a>
//);

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

// Subjects

const Users = [
  {
    "name": "RmBrown",
    "store_location": "Eureka Springs",
    "games": [],
    "high_score": 0
  },
  {
    "name": "Frida Khalo",
    "store_location": "Mexico City",
    "games": [],
    "high_score": 0
  },
]

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
    throw new Error('useProps must be used within PropsProvider');
  }
  return context;
};

const Admin = () => {
  const { props, handleInputChange } = useProps()

  const CreatePlayer = () => {

  }

  console.log(props)
  return (
      <>    
        <h1>Admin</h1>
        <p>{`${props.playing}`}</p>
        <div className="p-4 m-4 bg-indigo-400">
          <button onClick={() => handleInputChange('playing', !props.playing)}>GameControl</button>
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
    const [msg, setMsg] = useState('Ready')
    const [addPoints, setAddPoints] = useState(0)
    useEffect(() => {
      const command_one = setInterval(() => {
        setMsg('Set')
      }, 1000)
      const command_two = setInterval(() => {
        setMsg('HiiiKe!')
      }, 2354)


      // Send command to LEDS to turn green and stay on
      
      return () => {
        console.log('intervals cleared')
        clearInterval(command_one)
        clearInterval(command_two)
      }
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
            <nav className="">
            </nav>
            <div className="">
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

//        <h1>Game On: <span>{`${props.playing}`}</span></h1>
//        <p>{props.id}</p>
//        <p>{props.state}</p>
//        <p>{props.score}</p>
//        <p>{props.thorws}</p>
//        <p>{props.dateTime}</p>
//        <p>{props.duration}</p>
//        <p>{props.player}</p>
