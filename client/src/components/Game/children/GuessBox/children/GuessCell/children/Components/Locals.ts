import type { IGuessDataCtx } from "../../../../../../../../contexts/CtxGuessData";
import { T_GUESS_CATEGORIES_IDS_MAP } from "../../../../../../../../types/guesses";

const Locals = {
	setGuessCategoriesMap: function (
		newArray: number[],
		guessDataCtx: IGuessDataCtx,
		categoryId: string,
		setTriggerGuessDataChange: React.Dispatch<React.SetStateAction<boolean>>,
	) {
		const currentArr = guessDataCtx.guessData.get(categoryId);
		if (currentArr !== undefined) {
			//guessDataCtx.current.set(categoryId, newArray.sort());
			guessDataCtx.setGuessData((current) => {
				if (current !== undefined)
					return current.set(categoryId, newArray.sort());
			});
		}
		setTriggerGuessDataChange((current) => !current);
	},
};

export default Locals;
