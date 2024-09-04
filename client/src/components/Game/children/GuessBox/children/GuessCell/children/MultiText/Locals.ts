import { T_GUESS_CATEGORIES_IDS_MAP } from "../../../../../../../../types/guesses";

const Locals = {
	checkForValidInput: function (
		input: string,
		guesses: string[],
		value_id_map: Map<string, number>,
	): boolean {
		for (const guess of guesses) {
			if (guess.toLowerCase() === input.toLowerCase()) return false;
		}

		return value_id_map.has(input.toLowerCase());
	},
	removeGuessFromRemainingRecommendations: function (
		guess: string,
		remainingRecommendations: React.MutableRefObject<string[]>,
	): void {
		remainingRecommendations.current = remainingRecommendations.current.filter(
			(value) => value.toLowerCase() !== guess.toLowerCase(),
		);
	},
	updateGuessCategoriesMap: function (
		guessData: React.MutableRefObject<T_GUESS_CATEGORIES_IDS_MAP> | null,
		guesses: string[],
		value_id_map: Map<string, number>,
		categoryID: string,
	): void {
		if (guessData !== null) {
			const mapArr: number[] = [];

			for (const guess of guesses) {
				const valueId = value_id_map.get(guess.toLowerCase());
				if (valueId !== undefined) {
					mapArr.push(valueId);
				}
			}

			guessData.current.set(categoryID, mapArr.sort());
		}
	},
	removeGuessFromGuesses: function (
		guess: string,
		setGuesses: React.Dispatch<React.SetStateAction<string[]>>,
		remainingReccomendations: React.MutableRefObject<string[]>,
	): void {
		setGuesses((guesses) =>
			guesses.filter((g) => guess.toLowerCase() !== g.toLowerCase()),
		);
		remainingReccomendations.current.push(guess);
		remainingReccomendations.current = remainingReccomendations.current.sort();
	},
};

export default Locals;
