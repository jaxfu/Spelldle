import {
	E_RESULT_OPTIONS,
	translateIdsToDisplay,
	type T_PAST_GUESS,
} from "../../../../types/guesses";
import { type T_CATEGORY_INFO } from "../../../../types/categories";
import Result from "./children/Result/Result";
import styles from "./ResultBox.module.scss";
import ResultCol from "./children/Result/children/ResultCol/ResultCol";
import type { ICell } from "./children/Result/children/ResultCol/children/Cell/Cell";

interface IProps {
	pastGuesses: T_PAST_GUESS[];
	categoriesInfoArr: T_CATEGORY_INFO[];
}

function generateCols (
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

	const cells: ICell[] = pastGuesses.map((guess, i) =>  {return {content: [i], result: E_RESULT_OPTIONS.UNINITIALIZED }})

	results.unshift(<ResultCol key={"round"} title={"Round"} cells={cells} />)

	return results
}

const ResultBox: React.FC<IProps> = (props) => {
	return (
		<div className={styles.root}>
			{/* <ResultCol key={"rounds"} title={"Rounds"} /> */}

			<div className={styles.cols}>
				{generateCols(props.categoriesInfoArr, props.pastGuesses)}
			</div>

			{/* <div className={styles.row}>
				<span className={styles.round}>
					<b>Round</b>
				</span>

				{props.categoriesInfoArr.map((category) => {
					return (
						<span className={styles.cell} key={category.id}>
							<b>{category.display_name}</b>
						</span>
					);
				})}
			</div>
			{props.pastGuesses.map((guess, i) => {
				return (
					<Result
						guess={guess}
						key={i}
						round={i + 1}
						categoriesInfoArr={props.categoriesInfoArr}
					/>
				);
			})} */}
		</div>
	);
};

export default ResultBox;
