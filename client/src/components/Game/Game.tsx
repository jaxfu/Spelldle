import GuessBox from "./children/GuessBox/GuessBox";
import {
	INIT_GUESS_CATEGORIES,
	type T_ALL_POSSIBLE_CATEGORIES_INFO,
	type T_ALL_CURRENT_GUESS_INFO,
	type T_GUESS_CATEGORIES,
	type T_SPELL_CATEGORY_VALUE_MAP,
} from "../../types";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/consts";
import {
	getAllCategoriesInfo,
	createNewSpellInfoMap,
	getUserSessionDataFromStorage,
	deepCopyObject,
} from "../../utils/methods";
import { apiRequestGetPastGuesses } from "../../utils/requests";
import { useRef } from "react";
import GuessInfoButton from "../DEBUG/GuessInfoButton/GuessInfoButton";
import { SPELL_CATEGORY_MAP } from "../../CATEGORY_MAP";

const Game: React.FC = () => {
	// const allCurrentGuessInfo = useRef<T_ALL_CURRENT_GUESS_INFO>(
	//   createNewSpellInfoMap(),
	// );
	// const allCategoriesInfo = useRef<T_ALL_POSSIBLE_CATEGORIES_INFO>(
	//   getAllCategoriesInfo(),
	// );
	const allCurrentGuessInfo = useRef<T_GUESS_CATEGORIES>(
		deepCopyObject(INIT_GUESS_CATEGORIES),
	);

	const { data, isSuccess } = useQuery({
		queryKey: [QUERY_KEYS.pastGuesses],
		queryFn: () =>
			apiRequestGetPastGuesses(getUserSessionDataFromStorage().access_token),
	});

	if (isSuccess) {
		for (const guess of data.data) {
			console.log(`guess ${guess.round}: ${JSON.stringify(guess)}`);
		}
	}

	return (
		<>
			{/* <GuessInfoButton */}
			{/*   allCurrentGuessInfo={allCurrentGuessInfo.current} */}
			{/*   categoryInfo={allCategoriesInfo.current} */}
			{/* /> */}
			<GuessBox
				SPELL_CATEGORY_MAP={SPELL_CATEGORY_MAP}
				allCurrentGuessInfo={allCurrentGuessInfo}
			/>
		</>
	);
};

export default Game;
