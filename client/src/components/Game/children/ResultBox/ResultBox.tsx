import {
	E_RESULT_OPTIONS,
	translateIdsToDisplay,
	type T_PAST_GUESS,
} from "../../../../types/guesses";
import { type T_CATEGORY_INFO } from "../../../../types/categories";
import styles from "./ResultBox.module.scss";
import ResultCol from "./children/ResultCol/ResultCol";
import Cell, { ICell } from "./children/ResultCol/children/Cell/Cell";
import { useRef, useState } from "react";

export const CONSTS_RESULT = {
	ROUNDS: {
		ID: "round",
		DISPLAY: "Round",
	},
};

function generateMapKeys(
	roundsId: string,
	categoriesInfoArr: T_CATEGORY_INFO[],
): string[] {
	const keys = categoriesInfoArr.map((category) => category.id);
	keys.unshift(roundsId);
	return keys;
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
				id: ""
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
		return { content: [(i+1).toString()], result: E_RESULT_OPTIONS.UNINITIALIZED, id: "" };
	});

	results.unshift(
		<ResultCol
			key={CONSTS_RESULT.ROUNDS.ID}
			title={CONSTS_RESULT.ROUNDS.DISPLAY}
			cells={cells}
		/>,
	);

	return results;
}

function initWidthMap(mapKeys: string[]): Map<string, number> {
	const map = new Map();

	mapKeys.forEach((key) => {
		map.set(key, 0);
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

interface IProps {
	pastGuesses: T_PAST_GUESS[];
	categoriesInfoArr: T_CATEGORY_INFO[];
}

const ResultBox: React.FC<IProps> = (props) => {
	const mapKeys = generateMapKeys(
		CONSTS_RESULT.ROUNDS.ID,
		props.categoriesInfoArr,
	);
	const [colWidths, setColWidths] = useState<Map<string, number>>(
		initWidthMap(mapKeys),
	);

	return (
		<div className={styles.root}>
			<div className={styles.headers}>
				{/* round header explicit because it is not in categoriesInfoArr */}
				<Cell
					data={{
						content: [CONSTS_RESULT.ROUNDS.DISPLAY],
						result: E_RESULT_OPTIONS.UNINITIALIZED,
						id: CONSTS_RESULT.ROUNDS.ID
					}}
				/>
				{props.categoriesInfoArr.map(({ id, display_name }) => (
					<Cell
						key={id}
						data={{
							content: [display_name],
							result: E_RESULT_OPTIONS.UNINITIALIZED,
							id
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
