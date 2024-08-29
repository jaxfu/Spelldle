import { type T_PAST_GUESS } from "../../../../types/guesses";
import { type T_CATEGORY_INFO } from "../../../../types/categories";
import Result from "./children/Result/Result";
import styles from "./ResultBox.module.scss";
import ResultCol from "./children/Result/children/ResultCol/ResultCol";
import type { ICell } from "./children/Result/children/ResultCol/children/Cell/Cell";

interface IProps {
	pastGuesses: T_PAST_GUESS[];
	categoriesInfoArr: T_CATEGORY_INFO[];
}

function generateCols(
	categoriesInfoArr: T_CATEGORY_INFO[],
	pastGuesses: T_PAST_GUESS[],
): JSX.Element[] {
	const cols: JSX.Element[] = [];

	categoriesInfoArr.forEach((category) => {
		const cells: ICell[] = [];

		pastGuesses.forEach((guess) => {
			const categoryFromPastGuess = guess.get(category.id);
			if (categoryFromPastGuess !== undefined) {
				const cell: ICell = {
					content: [categoryFromPastGuess.value.toString()],
					result: categoryFromPastGuess.result,
				};
				cells.push(cell)
			} else {
				console.log("Error in generateCols(), id not found in pastGuess");
			}
		});

		cols.push(
			<ResultCol
				key={category.id}
				title={category.display_name}
				cells={cells}
			/>,
		);
	});

	return cols;
}

const ResultBox: React.FC<IProps> = (props) => {
	return (
		<div className={styles.root}>
			{/* <ResultCol key={"rounds"} title={"Rounds"} /> */}

			{generateCols(props.categoriesInfoArr, props.pastGuesses)}

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
