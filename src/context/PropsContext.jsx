import { createContext, useContext, useReducer, useState, useEffect } from "react";
import { gameInitialState } from "../constants/gameInitialState.js";

// Context for shared state
export const PropsContext = createContext();

// Reducer
const propsReducer = (state, action) => {
	switch (action.type) {
		case "UPDATE_PROP":
			return { ...state, [action.key]: action.value };
		case "SET_ALL_PROPS":
			return action.props;
		default:
			return state;
	}
};

// Props provider
export const PropsProvider = ({ children }) => {
	const [props, dispatch] = useReducer(propsReducer, gameInitialState);
	const [channel] = useState(() => new BroadcastChannel("props-sync"));

	useEffect(() => {
		const handleMessage = (event) => {
			if (event.data.type === "PROPS_UPDATE") {
				dispatch({ type: "SET_ALL_PROPS", props: event.data.props });
			}
		};

		channel.addEventListener("message", handleMessage);
		return () => channel.removeEventListener("message", handleMessage);
	}, [channel]);

	const handleInputChange = (key, value) => {
		dispatch({ type: "UPDATE_PROP", key, value });
		const newProps = { ...props, [key]: value };
		channel.postMessage({
			type: "PROPS_UPDATE",
			props: newProps,
		});
	};

	return (
		<PropsContext.Provider value={{ props, handleInputChange }}>
			{children}
		</PropsContext.Provider>
	);
};