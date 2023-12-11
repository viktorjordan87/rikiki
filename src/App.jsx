import rikiki_logo from "@/assets/77-778239_ace-card-png.webp";
import "./App.scss";
import Rules from "@components/Rules/Rules";
import Players from "@/components/Players/Players";

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
		</section>
	);
}

export default App;
