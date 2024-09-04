import { T_CATEGORY_INFO } from "../../../../types/categories";
import {
	T_PAST_GUESS_CATEGORIES,
	E_GUESS_CATEGORY_RESULTS,
} from "../../../../types/guesses";
import { ICell } from "./children/ResultCol/children/Cell/Cell";
import { translateIdsToDisplay } from "../../../../types/guesses";
import ResultCol from "./children/ResultCol/ResultCol";
import { CONSTS_RESULT } from "./ResultBox";

const Locals = {
	generateMapKeys: function (
		roundsId: string,
		categoriesInfoArr: T_CATEGORY_INFO[],
	): string[] {
		const keys = categoriesInfoArr.map((category) => category.id);
		keys.unshift(roundsId);
		return keys;
	},
	generateCols: function (
		categoriesInfoArr: T_CATEGORY_INFO[],
		pastGuesses: T_PAST_GUESS_CATEGORIES[],
		colWidthsMap: Map<string, number>,
		setColWidthsMap: React.Dispatch<React.SetStateAction<Map<string, number>>>,
	): JSX.Element[] {
		const results = categoriesInfoArr.map((category) => {
			const cells: ICell[] = pastGuesses.map((guess, i) => {
				const categoryFromPastGuess = guess.get(category.id);
				const cell: ICell = {
					content: [],
					result: E_GUESS_CATEGORY_RESULTS.UNINITIALIZED,
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
				result: E_GUESS_CATEGORY_RESULTS.UNINITIALIZED,
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
	},
};

export default Locals;
