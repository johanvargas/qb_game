// something to do with holding the whole state
export const gameInitialState = {
	id: `g${Date.now()}`,
	score: 0,
	throws_: 3,
	dateTime: Date.now(),
	player: "No player set",
	player_set: false,
	playing: false,
	closing: false,
	intro: false,
	deck: [],
};
