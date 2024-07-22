import GuessBox from "./children/GuessBox/GuessBox";
import {
	type T_ALL_POSSIBLE_CATEGORIES_INFO,
	type T_ALL_CURRENT_GUESS_INFO,
} from "../../types";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/consts";
import {
	getAllCategoriesInfo,
	createNewSpellInfoMap,
	getUserSessionDataFromStorage,
} from "../../utils/methods";
import { apiRequestGetPastGuesses } from "../../utils/requests";
import { useRef } from "react";
import GuessInfoButton from "../DEBUG/GuessInfoButton/GuessInfoButton";

const Game: React.FC = () => {
	const allCurrentGuessInfo = useRef<T_ALL_CURRENT_GUESS_INFO>(
		createNewSpellInfoMap(),
	);
	const allCategoriesInfo = useRef<T_ALL_POSSIBLE_CATEGORIES_INFO>(
		getAllCategoriesInfo(),
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
			<GuessInfoButton
				allCurrentGuessInfo={allCurrentGuessInfo.current}
				categoryInfo={allCategoriesInfo.current}
			/>
			<GuessBox
				allCategoriesInfo={allCategoriesInfo}
				allCurrentGuessInfo={allCurrentGuessInfo}
			/>
		</>
	);
};

export default Game;
