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
				categoryID={category.id}
				title={category.display_name}
				cells={cells}
			/>
		);
	});

	const cells: ICell[] = pastGuesses.map((guess, i) => {
		return {
			content: [(i + 1).toString()],
			result: E_RESULT_OPTIONS.UNINITIALIZED,
			categoryID: CONSTS_RESULT.ROUNDS.ID,
			round: i,
		};
	});

	results.unshift(
		<ResultCol
			key={CONSTS_RESULT.ROUNDS.ID}
			categoryID={CONSTS_RESULT.ROUNDS.ID}
			title={CONSTS_RESULT.ROUNDS.DISPLAY}
			cells={cells}
		/>,
	);

	return results;
}

function initColRefsMap(mapKeys: string[]): Map<string, IColRefs> {
	const map = new Map();

	mapKeys.forEach((key) => {
		map.set(key, 0);
	});

	return map;
}

function calcAndSetColWidth(refs: IColRefs): void {
	const max = Math.max(
		refs.header.current.clientWidth,
		refs.first.current.clientWidth,
	);
	refs.header.current.style.width = `${max}px`;
	refs.first.current.style.width = `${max}px`;
}

interface IColRefs {
	header: MutableRefObject<HTMLDivElement>;
	first: MutableRefObject<HTMLDivElement>;
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
	const [colRefs, setColRefs] = useState<Map<string, IColRefs>>(
		initColRefsMap(mapKeys),
	);

	return (
		<div className={styles.root}>
			<div className={styles.headers}>
				{/* round header explicit because it is not in categoriesInfoArr */}
				<Cell
					data={{
						content: [CONSTS_RESULT.ROUNDS.DISPLAY],
						result: E_RESULT_OPTIONS.UNINITIALIZED,
						categoryID: CONSTS_RESULT.ROUNDS.ID,
						round: 0,
					}}
				/>
				{props.categoriesInfoArr.map(({ id, display_name }, i) => (
					<Cell
						key={id}
						data={{
							content: [display_name],
							result: E_RESULT_OPTIONS.UNINITIALIZED,
							categoryID: id,
							round: i,
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
