export const getDeck = () => {
	const array = [];
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		const value = localStorage.getItem(key);

		if (value[0] !== "{") {
			continue;
		}
		array.push(value);
	}
	return array;
};

export const getDeckPlayerScore = (player) => {
  console.log(player)
	let score = 0;
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		const value = localStorage.getItem(key);

		if (value[0] !== "{") {
			continue;
		}

		if ( player === key) {
		  const parsePlayer = JSON.parse(value)
		  score = parsePlayer.current_score
		  //console.log('score from util: ', score.current_score)
		} 
	}
	return score;
};

export const updateDeckPlayerScore = (name, score) => {
	const player = localStorage.getItem(name)
	const parsePlayer = JSON.parse(player)
	parsePlayer.current_score = score ? score : 'No user set score'		
	localStorage.setItem(name, JSON.stringify(parsePlayer))
	console.log('updated score: ', parsePlayer.current_score)
}
