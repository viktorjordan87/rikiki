import "./Players.scss";
import { Button } from "primereact/button";
import { playersAtom } from "@/recoil/players";
import { useRecoilState, useSetRecoilState } from "recoil";
import { nanoid } from "nanoid";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Card } from "primereact/card";
import { ListBox } from "primereact/listbox";
import { pointsAtom } from "@/recoil/points";

const Players = () => {
	const [addNewPlayerFieldVisible, setAddNewPlayerFieldVisible] = useState(false);
	const [players, setPlayers] = useRecoilState(playersAtom);
	const [name, setName] = useState("");
	const resetPoints = useSetRecoilState(pointsAtom);

	const addPlayer = () => {
		setPlayers((old) => [...old, { id: nanoid(10), name: name }]);
		setName("");
		setAddNewPlayerFieldVisible(false);
	};

	return (
		<Card
			title="Players"
			className="players-container"
		>
			<div className="card flex ">
				<ListBox
					emptyMessage="No players defined"
					className="players"
					options={players}
					optionLabel="name"
				></ListBox>
			</div>
			<div className={`add-new-player ${!addNewPlayerFieldVisible && "hidden"}`}>
				<InputText
					type="text"
					className="p-inputtext-sm"
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Button
					icon="pi pi-check"
					rounded
					text
					aria-label="Finish"
					size="small"
					severity="success"
					style={{ width: 40, height: 40 }}
					onClick={() => addPlayer()}
				/>
				<Button
					icon="pi pi-times"
					rounded
					text
					aria-label="Cancel"
					size="small"
					severity="danger"
					style={{ width: 40, height: 40 }}
					onClick={() => setAddNewPlayerFieldVisible(false)}
				/>
			</div>
			<div className="buttons-container">
				<Button
					label="Add player"
					icon="pi pi-plus"
					size="small"
					severity="secondary"
					outlined
					onClick={() => setAddNewPlayerFieldVisible(!addNewPlayerFieldVisible)}
				/>
				<Button
					label="Delete players"
					icon="pi pi-trash"
					size="small"
					severity="danger"
					outlined
					onClick={() => {
						setPlayers([]);
						resetPoints([]);
					}}
				/>
			</div>
		</Card>
	);
};

export default Players;
