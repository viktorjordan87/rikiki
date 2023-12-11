import "./Rules.scss";
import { Card } from "primereact/card";
import { TabView, TabPanel } from "primereact/tabview";

const Rules = () => {
	return (
		<Card title="Rikiki card rules">
			<TabView>
				<TabPanel header="EN">
					<ol className="rules">
						<li>Put a color on a color.</li>
						<li>If you don't have the given color, you must put a trump card.</li>
						<li>There is no mandatory overtrumping. The next player in line doesn't have to overtrump if they don't want to.</li>
						<li>At the end of the round, correct guessing is worth 10 + 2x points, where x is the number of tricks.</li>
						<li>At the end of the round, incorrect guessing is worth -2y points, where y is the difference between the declared and taken tricks.</li>
						<li>
							If there is a card in the round, everyone simultaneously places the card on their forehead for others to see, and everyone simultaneously uses
							their hand to show how many tricks they commit to (0 or 1, obviously).
						</li>
					</ol>
				</TabPanel>
				<TabPanel header="HU">
					<ol className="rules">
						<li>Színre színt kell rakni.</li>
						<li>Ha nincs adott színünk, akkor adut kell rakni.</li>
						<li>Nincs kötelező felülütés. A soron következő játékosnak nem kell felülütnie, ha nem akar. </li>
						<li>A kör végén a jó tippelés 10 + 2x pontot ér, ahol az x az ütések száma.</li>
						<li>A kör végén a rossz tippelés -2y pontot ér, ahol az y az eltérés a vállalt és szerzett ütések között.</li>
						<li>
							Ha egy kártya van a körben, akkor mindenki egyszerre a homlokára rakja a kártyát, hogy a többiek láthassák és mindenki egyszerre a kezét
							használja, hogy bemutassa hány ütést vállal (0 vagy 1 értelemszerűen).
						</li>
					</ol>
				</TabPanel>
			</TabView>
		</Card>
	);
};

export default Rules;
