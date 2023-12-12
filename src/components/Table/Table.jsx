import "./Table.scss";
import { Card } from "primereact/card";
import { pointsAtom } from "@/recoil/points";
import { playersAtom } from "@/recoil/players";
import { Button } from "primereact/button";
import { useRecoilState, useRecoilValue } from "recoil";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { DataTable } from "primereact/datatable";
import { InputNumber } from "primereact/inputnumber";
import { Steps } from "primereact/steps";
import { useState } from "react";

const Table = () => {
	const [points, setPoints] = useRecoilState(pointsAtom);
	const players = useRecoilValue(playersAtom);
	const [activeIndex, setActiveIndex] = useState(0);
	const [cards, setCards] = useState(undefined);
	const [index, setIndex] = useState(1);
	const [assumption, setAssumption] = useState({});
	const [taken, setTaken] = useState({});
	const [isStartButtonVisible, setIsStartButtonVisible] = useState(true);

	const columns = players.flatMap((el) => {
		const insideArray = [
			{
				name: "Assumption",
				field: "assumption",
			},
			{
				name: "Taken",
				field: "taken",
			},
			{
				name: "Points in round",
				field: "points_in_round",
			},
			{
				name: "Points in total",
				field: "points_in_total",
			},
		];
		return insideArray.map((element) => {
			return (
				<Column
					key={element.field}
					className={element.field}
					header={element.name}
					field={`${el.id + "." + element.field}`}
					style={{ minWidth: "70px" }}
				/>
			);
		});
	});

	const headerGroup = (
		<ColumnGroup>
			<Row>
				<Column
					header="Round"
					rowSpan={2}
				/>
				<Column
					header="Cards in round"
					rowSpan={2}
				/>
				{players.map((el) => {
					return (
						<Column
							key={el.id}
							header={el.name}
							colSpan={4}
						/>
					);
				})}
			</Row>
			<Row>
				{columns.map((el) => {
					return el;
				})}
			</Row>
		</ColumnGroup>
	);

	const roundBodyTemplate = (rowData) => {
		return `${rowData.round}.`;
	};

	function sumObjectValues(object) {
		return Object.values(object).reduce((accumulator, value) => {
			return accumulator + value;
		}, 0);
	}

	const startTheGame = () => {
		const base = {
			assumption: undefined,
			taken: undefined,
			points_in_round: undefined,
			points_in_total: undefined,
		};

		const playerWithBase = players.map((el) => ({
			[el.id]: {
				...base,
			},
		}));

		const init = [
			{
				round: index,
				cards: cards,
				...playerWithBase.reduce((acc, player) => ({ ...acc, ...player }), {}),
			},
		];

		setPoints(init);
		setIsStartButtonVisible(false);
	};

	const startOfTheRound = () => {
		setActiveIndex(1);

		const assumptionArray = Object.entries(assumption).map(([key, value]) => ({ key, value }));

		const newPoints = points
			.map((point) => {
				if (point.round === index) {
					const updatedPoint = { ...point, cards: cards };

					assumptionArray.forEach((el) => {
						// Check if the property exists before updating
						if (updatedPoint[el.key]) {
							// Create a new object to avoid modifying the original object directly
							updatedPoint[el.key] = { ...updatedPoint[el.key], assumption: el.value };
						}
					});

					return updatedPoint;
				}
				return point;
			})
			.sort((a, b) => a.round - b.round);

		setPoints(newPoints);
	};

	const endOfTheRound = () => {
		const takenArray = Object.entries(taken).map(([key, value]) => ({ key, value }));

		const newPoints = points
			.map((point) => {
				if (point.round === index) {
					const updatedPoint = { ...point };

					takenArray.forEach((el) => {
						// Check if the property exists before updating
						if (updatedPoint[el.key]) {
							//Calculate the points for the player in this round
							const val_assumption = updatedPoint[el.key].assumption;
							const val_taken = el.value;
							let new_point = undefined;
							if (val_assumption === val_taken) {
								new_point = 10 + 2 * val_taken;
							}
							if (val_assumption !== val_taken) {
								new_point = -Math.abs(val_assumption - val_taken) * 2;
							}

							//calculate the total points
							let new_total = undefined;
							const old_total = updatedPoint[el.key].points_in_total;
							if (index === 1) {
								new_total = new_point;
							}
							if (index !== 1) {
								new_total = old_total + new_point;
							}

							// Create a new object to avoid modifying the original object directly
							updatedPoint[el.key] = { ...updatedPoint[el.key], taken: el.value, points_in_round: new_point, points_in_total: new_total };
						}
					});

					return updatedPoint;
				}
				return point;
			})
			.sort((a, b) => a.round - b.round);

		//remove assumption, taken, points_in_round values
		const modifiedLastElement = Object.assign({}, newPoints.at(index - 1));

		//use takenArray for looping only
		takenArray.forEach((el) => {
			// Check if the property exists before updating
			if (modifiedLastElement[el.key]) {
				modifiedLastElement[el.key] = { ...modifiedLastElement[el.key], assumption: undefined, taken: undefined, points_in_round: undefined };
			}
		});

		setPoints([...newPoints, { ...modifiedLastElement, round: index + 1, cards: undefined }]);
		setIndex((old) => old + 1);
		setCards(undefined);
		setAssumption({});
		setTaken({});
		setActiveIndex(0);
	};

	console.log(points);

	const AddNewRow = () => {
		const steps = [
			{
				label: "Start of the round",
			},
			{
				label: "End of the round",
			},
		];

		return (
			<div className="add-new-row">
				<h3 className="round-title">Round: {index}.</h3>
				{activeIndex === 0 && (
					<span className="inline-mini-button">
						<Button
							icon="pi pi-plus-circle"
							rounded
							text
							aria-label="Plus"
							size="small"
							severity="secondary"
							style={{ width: 40, height: 40 }}
							onClick={() => setIndex(index + 1)}
						/>
						<Button
							icon="pi pi-minus-circle"
							rounded
							text
							aria-label="Minus"
							size="small"
							severity="secondary"
							style={{ width: 40, height: 40 }}
							onClick={() => setIndex(index - 1)}
						/>
					</span>
				)}
				<Steps
					activeIndex={activeIndex}
					model={steps}
				/>
				<br />
				{activeIndex === 0 && (
					<Card>
						<div className="mezo">
							<label
								htmlFor="cards_in_round"
								className="font-bold block mb-2"
							>
								Cards in Round
							</label>

							<InputNumber
								inputId="cards_in_round"
								placeholder="Cards in round"
								value={cards}
								onValueChange={(e) => setCards(e.value)}
							/>
						</div>
						<br />
						<div className="card flex flex-wrap gap-3 p-fluid">
							{players.map((el) => {
								return (
									<div
										className="flex-auto"
										key={el.id}
									>
										<label
											htmlFor={el.id}
											className="font-bold block mb-2"
										>
											{el.name}
										</label>
										<InputNumber
											inputId={el.id}
											name={el.id}
											placeholder="Assume the number of hits in this round"
											value={assumption[el.id]}
											onChange={(e) => setAssumption({ ...assumption, [e.originalEvent.target.name]: e.value })}
										/>
									</div>
								);
							})}
						</div>
						{sumObjectValues(assumption) === cards && <p className="text-center text-red-500">The sum of the fields cannot be equal to the card number!</p>}
						<br />
						<div className="flex justify-content-end flex-wrap">
							<Button
								label="Let's play"
								outlined
								onClick={() => startOfTheRound()}
							/>
						</div>
					</Card>
				)}
				{activeIndex === 1 && (
					<Card>
						<div className="mezo">
							<label
								htmlFor="cards_in_round"
								className="font-bold block mb-2"
							>
								Cards in Round
							</label>
							{cards}
						</div>
						<br />
						<div className="card flex flex-wrap gap-3 p-fluid">
							{players.map((el) => {
								return (
									<div
										className="flex-auto"
										key={el.id}
									>
										<label
											htmlFor={el.id}
											className="font-bold block mb-2"
										>
											{el.name}
										</label>
										<InputNumber
											inputId={el.id}
											name={el.id}
											placeholder="The number of hits in this round"
											value={taken[el.id]}
											onChange={(e) => setTaken({ ...taken, [e.originalEvent.target.name]: e.value })}
										/>
									</div>
								);
							})}
						</div>
						{sumObjectValues(taken) !== cards && Object.keys(taken).length !== 0 && (
							<p className="text-center text-red-500">
								The sum of the fields <u>should</u> be equal to the card number!
							</p>
						)}
						<br />
						<div className="flex justify-content-end flex-wrap">
							<Button
								label="Finish this round"
								outlined
								onClick={() => endOfTheRound()}
							/>
						</div>
					</Card>
				)}
			</div>
		);
	};

	const endTheGame = () => {
		setPoints([]);
		setActiveIndex(0);
		setCards(undefined);
		setIndex(1);
		setIsStartButtonVisible(true);
		setAssumption({});
		setTaken({});
	};

	return (
		<Card
			title="Points"
			className="rikiki-table"
		>
			<div className="buttons-container">
				{isStartButtonVisible && (
					<Button
						label="Start"
						size="small"
						severity="secondary"
						outlined
						onClick={() => startTheGame()}
					/>
				)}
				<Button
					label="End"
					size="small"
					severity="danger"
					outlined
					onClick={() => endTheGame()}
				/>
			</div>

			<AddNewRow />
			<DataTable
				value={points}
				headerColumnGroup={headerGroup}
				showGridlines
				stripedRows
			>
				<Column
					header="Round"
					field="round"
					body={roundBodyTemplate}
				/>
				<Column
					header="Cards in round"
					field="cards"
				/>
				{columns.map((el) => {
					return el;
				})}
			</DataTable>
		</Card>
	);
};

export default Table;
