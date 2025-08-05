import header from "../../assets/header.png";

export const Header = () => {
	return (
		<header className="font-sans mb-15 pt-5">
			<img className="h-30 m-auto" src={header} alt="game header" />
		</header>
	);
};