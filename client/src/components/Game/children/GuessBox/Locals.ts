import { type T_CATEGORY_INFO, E_CATEGORY_COMPONENT_TYPE } from "../../../../types/categories";
import type { T_GUESS_CATEGORIES_IDS_MAP } from "../../../../types/guesses";

const Locals = {
	checkForValidToSubmit: function(
		guessData: T_GUESS_CATEGORIES_IDS_MAP,
		categoriesInfoArr: T_CATEGORY_INFO[],
	) {
		let isValid = true;
	
		categoriesInfoArr.forEach(({ component_type, id }) => {
			const currentValue = guessData.get(id);
			if (currentValue !== undefined) {
				switch (component_type) {
					case E_CATEGORY_COMPONENT_TYPE.SINGLE_TEXT:
						isValid = !(currentValue === -1);
						return;
					case E_CATEGORY_COMPONENT_TYPE.MULTI_TEXT:
					case E_CATEGORY_COMPONENT_TYPE.COMPONENTS:
						if (Array.isArray(currentValue)) isValid = !(currentValue.length === 0);
						return;
					case E_CATEGORY_COMPONENT_TYPE.LEVEL:
						if (Array.isArray(currentValue)) isValid = !(currentValue[0] === -1);
						return
				}
			}
		});
	
		return isValid;
	}
};

export default Locals;
