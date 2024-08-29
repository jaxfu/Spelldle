import {
	E_RESULT_OPTIONS,
	translateIdsToDisplay,
	type T_PAST_GUESS,
} from "../../../../types/guesses";
import { type T_CATEGORY_INFO } from "../../../../types/categories";
import styles from "./ResultBox.module.scss";
import ResultCol from "./children/ResultCol/ResultCol";
import Cell, { ICell } from "./children/ResultCol/children/Cell/Cell";
import { useState } from "react";

interface IProps {
	pastGuesses: T_PAST_GUESS[];
	categoriesInfoArr: T_CATEGORY_INFO[];
}

function generateCols(
	categoriesInfoArr: T_CATEGORY_INFO[],
	pastGuesses: T_PAST_GUESS[],
): JSX.Element[] {
	const results = categoriesInfoArr.map((category) => {
		const cells: ICell[] = pastGuesses.map((guess) => {
			const categoryFromPastGuess = guess.get(category.id);
			const cell: ICell = {
				content: [],
				result: E_RESULT_OPTIONS.UNINITIALIZED,
			};
			if (categoryFromPastGuess === undefined) {
				console.log("Error in generateCols(), id not found in pastGuess");
			} else {
				cell.content = translateIdsToDisplay(
					categoryFromPastGuess.value,
					category,
				);
				cell.result = categoryFromPastGuess.result;
			}
			return cell;
		});

		return (
			<ResultCol
				key={category.id}
				title={category.display_name}
				cells={cells}
			/>
		);
	});

	const cells: ICell[] = pastGuesses.map((guess, i) => {
		return { content: [i.toString()], result: E_RESULT_OPTIONS.UNINITIALIZED };
	});

	results.unshift(<ResultCol key={"round"} title={"Round"} cells={cells} />);

	return results;
}

function initWidthMap(
	categoriesInfoArr: T_CATEGORY_INFO[],
): Map<string, number> {
	const map = new Map();

	//TODO: magic string
	map.set("round", 0);
	categoriesInfoArr.forEach(({ id }) => {
		map.set(id, 0);
	});

	return map;
}

function calcAndSetWidthCol(
	width1: number,
	width2: number,
	setWidthMap: React.Dispatch<React.SetStateAction<Map<string, number>>>,
	id: string,
): void {
	setWidthMap((curr) => curr.set(id, width1 >= width2 ? width1 : width2));
}

const ResultBox: React.FC<IProps> = (props) => {
	const [colWidths, setColWidths] = useState<Map<string, number>>(
		initWidthMap(props.categoriesInfoArr),
	);

	return (
		<div className={styles.root}>
			<div className={styles.headers}>
				<Cell
					data={{ content: ["Round"], result: E_RESULT_OPTIONS.UNINITIALIZED }}
				/>
				{props.categoriesInfoArr.map(({ id, display_name }) => (
					<Cell
						key={id}
						data={{
							content: [display_name],
							result: E_RESULT_OPTIONS.UNINITIALIZED,
						}}
					/>
				))}
			</div>
			<div className={styles.cols}>
				{generateCols(props.categoriesInfoArr, props.pastGuesses)}
			</div>
		</div>
	);
};

export default ResultBox;
