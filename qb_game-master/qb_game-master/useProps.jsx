import React, {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";

// Hook to use props context
const useProps = () => {
	const context = useContext(PropsContext);
	if (!context) {
		throw new Error("useProps must be used within PropsProvider");
	}
	return context;
};

export default useProps;
