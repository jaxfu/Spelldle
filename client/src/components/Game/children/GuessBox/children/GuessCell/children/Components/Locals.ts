import { T_GUESS_CATEGORIES_IDS_MAP } from "../../../../../../../../types/guesses";

const Locals = {
	updateGuessCategoriesMap: function (
		checked: boolean,
		valueId: number,
		guessData: React.MutableRefObject<T_GUESS_CATEGORIES_IDS_MAP> | null,
		categoryId: string,
	) {
		if (guessData !== null) {
			const currentArr = guessData.current.get(categoryId);
			if (currentArr !== undefined) {
				let newArr = [...(currentArr as number[])];

				if (checked) {
					newArr.push(valueId);
				} else newArr = newArr.filter((comp) => comp !== valueId);

				guessData.current.set(categoryId, newArr.sort());
			}
		}
	},
	setGuessCategoriesMap: function (
		newArray: number[],
		guessData: React.MutableRefObject<T_GUESS_CATEGORIES_IDS_MAP> | null,
		categoryId: string,
	) {
		if (guessData !== null) {
			const currentArr = guessData.current.get(categoryId);
			if (currentArr !== undefined) {
				guessData.current.set(categoryId, newArray.sort());
			}
		}
	},
	isCurrentEqualToRecentGuess: function (
		current: number[],
		recent: number[],
	): boolean {
		return current.sort().join() === recent.sort().join();
	},
};

export default Locals;
