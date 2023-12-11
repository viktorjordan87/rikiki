import './Rules.scss';
import { Card } from 'primereact/card';

const Rules = () => {
	return (
		<Card title="Rikiki szabályok">
			<ol className="rules">
				<li>Színre színt kell rakni.</li>
				<li>Ha nincs adott színünk, akkor adut kell rakni.</li>
				<li>Nincs kötelező felülütés. A soron következő játékosnak nem kell felülütnie, ha nem akar. </li>
				<li>A kör végén a jó tippelés 10 + 2x pontot ér, ahol az x az ütések száma.</li>
				<li>A kör végén a rossz tippelés -2y pontot ér, ahol az y az eltérés a vállalt és szerzett ütések között.</li>
				<li>
					Ha egy kártya van a körben, akkor mindenki egyszerre a homlokára rakja a kártyát, hogy a többiek láthassák és mindenki egyszerre a kezét használja,
					hogy bemutassa hány ütést vállal (0 vagy 1 értelemszerűen).
				</li>
			</ol>
		</Card>
	);
};

export default Rules;
