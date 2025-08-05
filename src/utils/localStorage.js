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