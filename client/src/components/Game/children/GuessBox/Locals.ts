import {
	type T_CATEGORY_INFO,
	E_CATEGORY_COMPONENT_TYPE,
} from "../../../../types/categories";
import type { T_GUESS_CATEGORIES_IDS_MAP } from "../../../../types/guesses";

const Locals = {
	checkForValidToSubmit: function (
		guessData: T_GUESS_CATEGORIES_IDS_MAP,
		categoriesInfoArr: T_CATEGORY_INFO[],
	): boolean {
		console.log(guessData);
		for (const { component_type, id } of categoriesInfoArr) {
			const currentValue = guessData.get(id);
			if (currentValue !== undefined) {
				switch (component_type) {
					case E_CATEGORY_COMPONENT_TYPE.SINGLE_TEXT:
						if (currentValue === -1) return false;
						break;
					case E_CATEGORY_COMPONENT_TYPE.MULTI_TEXT:
					case E_CATEGORY_COMPONENT_TYPE.COMPONENTS:
						if (Array.isArray(currentValue) && currentValue.length === 0)
							return false;
						break;
					case E_CATEGORY_COMPONENT_TYPE.SINGLE_TEXT_WITH_TOGGLE:
						if (Array.isArray(currentValue) && currentValue[0] === -1)
							return false;
						break;
				}
			}
		}

		return true;
	},
};

export default Locals;
