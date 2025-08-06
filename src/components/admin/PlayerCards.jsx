import { useSnapshot } from "valtio";
import star from "../../assets/Star.png";
import { store } from "../../stores/admin.store.js";

export const PlayerCards = () => {
	const { deck } = useSnapshot(store);

	const playerCard = (item) => {
		return (
			<div
				className="m-2 p-4 bg-violet-300 text-center grid grid-cols-4 rounded-sm"
				key={item.id}
			>
				<img className="h-5 w-5" src={star} alt="star" />
				<div className="text-3xl">{item.name}</div>
				<div>{item.store_location}</div>
				<div>{item.current_score}</div>
			</div>
		);
	};

	return <>{deck.map((item) => playerCard(item))}</>;
};
