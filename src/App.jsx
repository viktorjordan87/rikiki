import rikiki_logo from "@/assets/playing-card-card-game-poker.webp";
import "./App.scss";
import Rules from "@components/Rules/Rules";
import Players from "@/components/Players/Players";
import Table from "./components/Table/Table";

function App() {
	return (
		<section className="rikiki-body">
			<img
				src={rikiki_logo}
				className="rikiki-logo img-fluid"
				alt="Rikiko logo"
			/>
			<Rules />
			<Players />
			<Table />
		</section>
	);
}

export default App;
