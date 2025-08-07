import header from "../../assets/header.png";

export const Header = () => {
	return (
		<header className="font-sans mb-2 pt-2">
			<img className="h-16 m-auto" src={header} alt="game header" />
		</header>
	);
};