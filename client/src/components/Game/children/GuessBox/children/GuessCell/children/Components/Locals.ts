import { T_GUESS_CATEGORIES_IDS_MAP } from "../../../../../../../../types/guesses";

const Locals = {
	setGuessCategoriesMap: function (
		newArray: number[],
		guessData: React.MutableRefObject<T_GUESS_CATEGORIES_IDS_MAP> | null,
		categoryId: string,
		setTriggerGuessDataChange: React.Dispatch<React.SetStateAction<boolean>>,
	) {
		if (guessData !== null) {
			const currentArr = guessData.current.get(categoryId);
			if (currentArr !== undefined) {
				guessData.current.set(categoryId, newArray.sort());
			}
			setTriggerGuessDataChange((current) => !current);
		}
	},
};

export default Locals;
