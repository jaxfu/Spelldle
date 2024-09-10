import type { IGuessDataCtx } from "../../../../../../../../contexts/CtxGuessData";
import { T_CATEGORY_INFO } from "../../../../../../../../types/categories";
import { T_GUESS_CATEGORIES_IDS_MAP } from "../../../../../../../../types/guesses";

const Locals = {
	updateGuessCategoriesMapSingleText: function (
		input: string,
		hasValidInput: boolean,
		categoryInfo: T_CATEGORY_INFO,
		guessDataCtx: IGuessDataCtx,
		setTriggerGuessDataChange: React.Dispatch<React.SetStateAction<boolean>>,
	): void {
		if (hasValidInput) {
			const valueId = categoryInfo.value_id_map.get(input.toLowerCase());

			if (valueId !== undefined) {
				//guessData.current.set(categoryInfo.id, valueId);
				guessDataCtx.setGuessData((current) => {
					if (current !== undefined)
						return current.set(categoryInfo.id, valueId);
				});
			}
		} else {
			//guessData.current.set(categoryInfo.id, -1);
			guessDataCtx.setGuessData((current) => {
				if (current !== undefined) return current.set(categoryInfo.id, -1);
			});
		}

		setTriggerGuessDataChange((current) => !current);
	},

	updateGuessCategoriesMapSingleTextWithToggle: function (
		input: string,
		hasValidInput: boolean,
		categoryInfo: T_CATEGORY_INFO,
		guessDataCtx: IGuessDataCtx,
		setTriggerGuessDataChange: React.Dispatch<React.SetStateAction<boolean>>,
	): void {
		const currentData = guessDataCtx.guessData.get(categoryInfo.id) as
			| number[]
			| undefined;

		if (currentData !== undefined) {
			if (hasValidInput) {
				const valueId = categoryInfo.value_id_map.get(input.toLowerCase());

				if (valueId !== undefined) {
					//guessData.current.set(categoryInfo.id, [valueId, currentData[1]]);
					guessDataCtx.setGuessData((current) => {
						if (current !== undefined) {
							return current.set(categoryInfo.id, [valueId, currentData[1]]);
						}
					});
				}
			} else {
				//guessData.current.set(categoryInfo.id, [-1, currentData[1]]);
				guessDataCtx.setGuessData((current) => {
					if (current !== undefined) {
						return current.set(categoryInfo.id, [-1, currentData[1]]);
					}
				});
			}

			setTriggerGuessDataChange((current) => !current);
		}
	},
};

export default Locals;
