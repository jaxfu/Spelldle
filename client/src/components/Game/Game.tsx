import GuessBox from "./children/GuessBox/GuessBox";
import {
	INIT_GUESS_CATEGORIES,
	type T_ALL_CURRENT_GUESS_INFO,
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
	generateSpellsInfoFromJSON,
	type T_CATEGORY_INFO,
	type T_SPELLS_INFO,
} from "../../methods/spells";
import CATEGORY_INFO_JSON from "../../data/CATEGORY_INFO.json";

const Game: React.FC = () => {
	// const allCurrentGuessInfo = useRef<T_ALL_CURRENT_GUESS_INFO>(
	//   createNewSpellInfoMap(),
	// );
	// const allCategoriesInfo = useRef<T_ALL_POSSIBLE_CATEGORIES_INFO>(
	//   getAllCategoriesInfo(),
	// );
	const spellInfo: T_SPELLS_INFO = generateSpellsInfoFromJSON(
		CATEGORY_INFO_JSON as T_CATEGORY_INFO[],
	);
	const allCurrentGuessInfo = useRef<T_GUESS_CATEGORIES>(
		deepCopyObject(INIT_GUESS_CATEGORIES),
	);

	console.log(spellInfo);

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
			{/* <GuessBox
				SPELL_CATEGORY_MAP={SPELL_CATEGORY_MAP}
				allCurrentGuessInfo={allCurrentGuessInfo}
			/> */}
		</>
	);
};

export default Game;
