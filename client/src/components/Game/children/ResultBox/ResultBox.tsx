import {
	E_RESULT_OPTIONS,
	translateIdsToDisplay,
	type T_PAST_GUESS,
} from "../../../../types/guesses";
import { type T_CATEGORY_INFO } from "../../../../types/categories";
import styles from "./ResultBox.module.scss";
import ResultCol from "./children/ResultCol/ResultCol";
import Cell, { ICell } from "./children/ResultCol/children/Cell/Cell";
import { useRef, useState, type MutableRefObject } from "react";

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
	colWidthsMap: Map<string, IColWidths>,
	setColWidthsMap: React.Dispatch<React.SetStateAction<Map<string, IColWidths>>>
): JSX.Element[] {
	const results = categoriesInfoArr.map((category) => {
		const cells: ICell[] = pastGuesses.map((guess, i) => {
			const categoryFromPastGuess = guess.get(category.id);
			const cell: ICell = {
				content: [],
				result: E_RESULT_OPTIONS.UNINITIALIZED,
				categoryID: category.id,
				round: i,
			};
			if (categoryFromPastGuess === undefined) {
				console.log(`error in generateCols(), id ${category.id} not found in pastGuess`);
			} else {
				cell.content = translateIdsToDisplay(
					categoryFromPastGuess.value,
					category,
				);
				cell.result = categoryFromPastGuess.result;
			}
			return cell;
		});

		const colWidths = colWidthsMap.get(category.id)
		if (colWidths !== undefined) {
			return (
				<ResultCol
					key={category.id}
					categoryID={category.id}
					title={category.display_name}
					cells={cells}
					colWidths={colWidths}
					setColWidthsMap={setColWidthsMap}
				/>
			);
		} else console.log(`error in generateCols(), id ${category.id} not found in colWidthsMap`)
	});

	const cells: ICell[] = pastGuesses.map((guess, i) => {
		return {
			content: [(i + 1).toString()],
			result: E_RESULT_OPTIONS.UNINITIALIZED,
			categoryID: CONSTS_RESULT.ROUNDS.ID,
			round: i+1,
		};
	});

	const colWidths = colWidthsMap.get(CONSTS_RESULT.ROUNDS.ID)
	if (colWidths !== undefined) {
		results.unshift(
			<ResultCol
				key={CONSTS_RESULT.ROUNDS.ID}
				categoryID={CONSTS_RESULT.ROUNDS.ID}
				title={CONSTS_RESULT.ROUNDS.DISPLAY}
				cells={cells}
				colWidths={colWidths}
				setColWidthsMap={setColWidthsMap}
			/>,
		);
	} else console.log(`error in generateCols(), id ${CONSTS_RESULT.ROUNDS.ID} not found in colWidthsMap`)

	return results;
}

export interface IColWidths {
	header: number;
	col: number;
}

function initColRefsMap(mapKeys: string[]): Map<string, IColWidths> {
	const map: Map<string, IColWidths> = new Map();

	mapKeys.forEach((key) => {
		map.set(key, { header: 0, col: 0 });
	});

	return map;
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
	const [colWidths, setColWidths] = useState<Map<string, IColWidths>>(
		initColRefsMap(mapKeys),
	);

	return (
		<div className={styles.root}>
			<div className={styles.headers}>
				{/* round header explicit because it is not in categoriesInfoArr */}
				<Cell
					content={[CONSTS_RESULT.ROUNDS.DISPLAY]}
					result={E_RESULT_OPTIONS.UNINITIALIZED}
					categoryID={CONSTS_RESULT.ROUNDS.ID}
					round={0}
				/>
				{props.categoriesInfoArr.map(({ id, display_name }, i) => (
					<Cell
						key={id}
						content={[display_name]}
						result={E_RESULT_OPTIONS.UNINITIALIZED}
						categoryID={id}
						round={i}
					/>
				))}
			</div>
			<div className={styles.cols}>
				{generateCols(props.categoriesInfoArr, props.pastGuesses, colWidths, setColWidths)}
			</div>
		</div>
	);
};

export default ResultBox;
