import GuessBox from "./children/GuessBox/GuessBox";
import { T_GUESS_CATEGORIES_MAP } from "../../methods/guesses";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/consts";
import { getUserSessionDataFromStorage } from "../../utils/methods";
import { apiRequestGetPastGuesses } from "../../methods/requests";
import { useRef } from "react";
import GuessInfoButton from "../DEBUG/GuessInfoButton/GuessInfoButton";
import {
	type T_CATEGORY_INFO,
	type T_CATEGORY_INFO_JSON,
	generateCategoryInfoFromJSON,
	generateGuessCategoriesMapFromJSON,
} from "../../methods/categories";
import CATEGORY_INFO_JSON from "../../data/CATEGORY_INFO.json";
import GuessDataContext from "../../Contexts/GuessDataContext";
import ResultBox from "./children/ResultBox/ResultBox";

const Game: React.FC = () => {
	const categoriesInfo: T_CATEGORY_INFO[] = generateCategoryInfoFromJSON(
		CATEGORY_INFO_JSON as T_CATEGORY_INFO_JSON,
	);
	const currentGuessInfo = useRef<T_GUESS_CATEGORIES_MAP>(
		generateGuessCategoriesMapFromJSON(
			CATEGORY_INFO_JSON as T_CATEGORY_INFO_JSON,
		),
	);

	const { data, isSuccess } = useQuery({
		queryKey: [QUERY_KEYS.pastGuesses],
		queryFn: () =>
			apiRequestGetPastGuesses(getUserSessionDataFromStorage().access_token),
	});

	if (isSuccess) {
		for (const guess of data.data.guesses) {
			console.log(`guess ${guess.round}: ${JSON.stringify(guess)}`);
		}
	}

	return (
		<>
			<GuessDataContext.Provider value={currentGuessInfo}>
				<GuessInfoButton />
				{data != undefined && data.data.guesses.length > 0 && (
					<ResultBox pastGuesses={data.data.guesses} />
				)}
				<GuessBox categoriesInfoArr={categoriesInfo} />
			</GuessDataContext.Provider>
		</>
	);
};

export default Game;
