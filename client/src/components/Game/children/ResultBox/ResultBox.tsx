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
import Header from "./children/ResultCol/children/Header/Header";

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
	setColWidthsMap: React.Dispatch<
		React.SetStateAction<Map<string, IColWidths>>
	>,
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
				console.log(
					`error in generateCols(), id ${category.id} not found in pastGuess`,
				);
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
				categoryID={category.id}
				title={category.display_name}
				cells={cells}
				colWidthsMap={colWidthsMap}
				setColWidthsMap={setColWidthsMap}
			/>
		);
	});

	const cells: ICell[] = pastGuesses.map((guess, i) => {
		return {
			content: [(i + 1).toString()],
			result: E_RESULT_OPTIONS.UNINITIALIZED,
			categoryID: CONSTS_RESULT.ROUNDS.ID,
			round: i + 1,
		};
	});

	results.unshift(
		<ResultCol
			key={CONSTS_RESULT.ROUNDS.ID}
			categoryID={CONSTS_RESULT.ROUNDS.ID}
			title={CONSTS_RESULT.ROUNDS.DISPLAY}
			cells={cells}
			colWidthsMap={colWidthsMap}
			setColWidthsMap={setColWidthsMap}
		/>,
	);

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
	const [colWidthsMap, setColWidthsMap] = useState<Map<string, IColWidths>>(
		initColRefsMap(mapKeys),
	);

	return (
		<div className={styles.root}>
			<div className={styles.headers}>
				{/* round header explicit because it is not in categoriesInfoArr */}
				<Header
					key={CONSTS_RESULT.ROUNDS.ID}
					categoryID={CONSTS_RESULT.ROUNDS.ID}
					title={CONSTS_RESULT.ROUNDS.DISPLAY}
					colWidthsMap={colWidthsMap}
					setColWidthsMap={setColWidthsMap}
				/>
				{props.categoriesInfoArr.map(({ id, display_name }, i) => (
					<Header
						key={id}
						categoryID={id}
						title={display_name}
						colWidthsMap={colWidthsMap}
						setColWidthsMap={setColWidthsMap}
					/>
				))}
			</div>
			<div className={styles.cols}>
				{generateCols(
					props.categoriesInfoArr,
					props.pastGuesses,
					colWidthsMap,
					setColWidthsMap,
				)}
			</div>
		</div>
	);
};

export default ResultBox;
