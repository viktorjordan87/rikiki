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

const Table = () => {
	const [points, setPoints] = useRecoilState(pointsAtom);
	const players = useRecoilValue(playersAtom);

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
					header={element.name}
					field={`${el.id + "." + element.field}`}
					style={{ minWidth: "50px" }}
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

	const startTheGame = () => {
		const base = {
			assumption: undefined,
			taken: undefined,
			points_in_round: undefined,
			points_in_total: undefined,
		};

		const playerWithBase = players.map((el) => {
			return {
				[el.id]: {
					...base,
				},
			};
		});

		const init = [
			{
				round: 1,
				cards: 13,
				...playerWithBase,
			},
		];

		setPoints(init);
	};
	console.log("init", points);

	const AddNewRow = () => {
		return (
			<div className="add-new-row">
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
					/>
				</div>
			</div>
		);
	};

	const endTheGame = () => {
		setPoints([]);
	};

	return (
		<Card
			title="Points"
			className="rikiki-table"
		>
			<div className="buttons-container">
				<Button
					label="Start"
					size="small"
					severity="secondary"
					outlined
					onClick={() => startTheGame()}
				/>
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
