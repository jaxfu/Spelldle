import { T_GUESS_MAP_IDS } from "../../../../../../../../types/guesses";

const Locals =  {
	updateGuessCategoriesMapRitualToggle: function(
		checked: boolean,
		categoryId: string,
		guessData: React.MutableRefObject<T_GUESS_MAP_IDS> | null,
	) {
		if (guessData !== null) {
			const currentData = guessData.current.get(categoryId) as number[];
	
			if (currentData !== undefined) {
				const newData = [currentData[0]];
				newData.push(checked ? 1 : 0);
				guessData.current.set(categoryId, newData);
			}
		}
	}
}

export default Locals