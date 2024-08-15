import GuessBox from "./children/GuessBox/GuessBox";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/consts";
import { getUserSessionDataFromStorage } from "../../utils/methods";
import { apiRequestGetPastGuesses } from "../../types/requests";
import { useMemo, useRef } from "react";
import GuessInfoButton from "../DEBUG/GuessInfoButton/GuessInfoButton";
import {
	type T_CATEGORY_INFO,
	type T_CATEGORY_INFO_SEED_JSON,
	generateCategoryInfoFromJSON,
	generateGuessesStateFromJSON,
} from "../../types/categories";
import CATEGORY_INFO_JSON from "../../data/CATEGORY_INFO.json";
import GuessDataContext from "../../contexts/GuessDataContext";
import ResultBox from "./children/ResultBox/ResultBox";
import type { T_GUESSES_AS_IDS } from "../../types/guesses";

const Game: React.FC = () => {
	const categoriesInfo: T_CATEGORY_INFO[] = useMemo(() => {
		return generateCategoryInfoFromJSON(
			CATEGORY_INFO_JSON as T_CATEGORY_INFO_SEED_JSON,
		);
	}, []);
	const currentGuessInfo = useRef<T_GUESSES_AS_IDS>(
		generateGuessesStateFromJSON(
			CATEGORY_INFO_JSON as T_CATEGORY_INFO_SEED_JSON,
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
				{/* {data != undefined && data.data.guesses.length > 0 && (
					<ResultBox
						pastGuesses={data.data.guesses}
						categoriesInfoArr={categoriesInfo}
					/>
				)} */}
				<GuessBox categoriesInfoArr={categoriesInfo} />
			</GuessDataContext.Provider>
		</>
	);
};

export default Game;
