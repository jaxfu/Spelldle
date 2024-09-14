import type { IGuessDataCtx } from "../../../../../../../../contexts/CtxGuessData";
import { T_GUESS_CATEGORIES_IDS_MAP } from "../../../../../../../../types/guesses";

const Locals = {
	updateGuessCategoriesMapToggle: function (
		checked: boolean,
		categoryId: string,
		guessDataCtx: IGuessDataCtx,
		setTriggerGuessDataChange: React.Dispatch<React.SetStateAction<boolean>>,
	) {
		const currentData = guessDataCtx.guessData.get(categoryId) as number[];

		if (currentData !== undefined) {
			const newData = [currentData[0]];
			newData.push(checked ? 1 : 0);
			//guessDataCtx.current.set(categoryId, newData);
			guessDataCtx.setGuessData((current) => {
				if (current !== undefined) {
					const newMap = new Map(current);
					return newMap.set(categoryId, newData);
				}
			});

			setTriggerGuessDataChange((current) => !current);
		}
	},
};

export default Locals;
