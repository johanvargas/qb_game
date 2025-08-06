import { useContext } from "react";
import { PropsContext } from "../context/PropsContext.jsx";

// Hook to use props context
export const useProps = () => {
	const context = useContext(PropsContext);
	if (!context) {
		throw new Error("error: useProps is not in PropsProvider");
	}
	return context;
};
