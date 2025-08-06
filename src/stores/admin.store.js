import { proxy } from "valtio";
import { getDeck } from "../utils/localStorage";

export const store = proxy({
	current_player: "",
	playing: false,
	deck: [],
	score: 0,
});

export const initStore = () => {
	const deck = getDeck();
	if (deck) {
		store.deck = deck;
	}
	const current_player = localStorage.getItem("current_player");
	if (current_player) {
		store.current_player = current_player;
	}
};
