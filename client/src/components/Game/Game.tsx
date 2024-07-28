import GuessBox from "./children/GuessBox/GuessBox";
import {
	INIT_GUESS_CATEGORIES,
	type T_GUESS_CATEGORIES,
} from "../../methods/guesses";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/consts";
import {
	getUserSessionDataFromStorage,
	deepCopyObject,
} from "../../utils/methods";
import { apiRequestGetPastGuesses } from "../../methods/requests";
import { useRef } from "react";
import GuessInfoButton from "../DEBUG/GuessInfoButton/GuessInfoButton";
import {
	type T_CATEGORY_INFO,
	type T_CATEGORY_INFO_JSON,
	generateCategoryInfoFromJSON,
} from "../../methods/categories";
import CATEGORY_INFO_JSON from "../../data/CATEGORY_INFO.json";

const Game: React.FC = () => {
	// const allCurrentGuessInfo = useRef<T_ALL_CURRENT_GUESS_INFO>(
	//   createNewSpellInfoMap(),
	// );
	// const allCategoriesInfo = useRef<T_ALL_POSSIBLE_CATEGORIES_INFO>(
	//   getAllCategoriesInfo(),
	// );
	// const spellsInfo: T_CATEGORIES_INFO = generateSpellsInfoFromJSON(
	// 	CATEGORY_INFO_JSON as T_CATEGORY_INFO[],
	// );
	const categoriesInfoArr: T_CATEGORY_INFO[] = generateCategoryInfoFromJSON(
		CATEGORY_INFO_JSON as T_CATEGORY_INFO_JSON,
	);
	const allCurrentGuessInfo = useRef<T_GUESS_CATEGORIES>(
		deepCopyObject(INIT_GUESS_CATEGORIES),
	);

	console.log(categoriesInfoArr);

	const { data, isSuccess } = useQuery({
		queryKey: [QUERY_KEYS.pastGuesses],
		queryFn: () =>
			apiRequestGetPastGuesses(getUserSessionDataFromStorage().access_token),
	});

	if (isSuccess) {
		// for (const guess of data.data) {
		// 	console.log(`guess ${guess.round}: ${JSON.stringify(guess)}`);
		// }
	}

	return (
		<>
			{/* <GuessInfoButton */}
			{/*   allCurrentGuessInfo={allCurrentGuessInfo.current} */}
			{/*   categoryInfo={allCategoriesInfo.current} */}
			{/* /> */}
			<GuessBox
				categoriesInfoArr={categoriesInfoArr}
				allCurrentGuessInfo={allCurrentGuessInfo}
			/>
		</>
	);
};

export default Game;
