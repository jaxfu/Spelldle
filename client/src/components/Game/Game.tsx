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
import { useRef, useContext } from "react";
import GuessInfoButton from "../DEBUG/GuessInfoButton/GuessInfoButton";
import {
	type T_CATEGORY_INFO,
	type T_CATEGORY_INFO_JSON,
	generateCategoryInfoFromJSON,
} from "../../methods/categories";
import CATEGORY_INFO_JSON from "../../data/CATEGORY_INFO.json";
import GuessDataContext from "../../Contexts/GuessDataContext";

const Game: React.FC = () => {
	const categoriesInfo: T_CATEGORY_INFO[] = generateCategoryInfoFromJSON(
		CATEGORY_INFO_JSON as T_CATEGORY_INFO_JSON,
	);
	const allCurrentGuessInfo = useRef<T_GUESS_CATEGORIES>(
		deepCopyObject(INIT_GUESS_CATEGORIES),
	);

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
			{/* <GuessInfoButton
			  allCurrentGuessInfo={allCurrentGuessInfo.current}
			  categoryInfo={categoriesInfo}
			/> */}
			<GuessDataContext.Provider value={allCurrentGuessInfo}>
				<GuessBox
					categoriesInfoArr={categoriesInfo}
				/>
			</GuessDataContext.Provider>
		</>
	);
};

export default Game;
