import GuessBox from "./children/GuessBox/GuessBox";
import {
	type T_ALL_POSSIBLE_CATEGORIES_INFO,
	type T_ALL_CURRENT_GUESS_INFO,
	type T_GAME_SESSION,
	INIT_GAME_SESSION_DATA,
} from "../../types";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/consts";
import { useRef } from "react";
import {
	deepCopyObject,
	getUserSessionDataFromStorage,
} from "../../utils/methods";
import {
	apiRequestGetPastGuesses,
	apiRequestMakeGuess,
} from "../../utils/requests";

interface IProps {
	allCategoriesInfo: React.MutableRefObject<T_ALL_POSSIBLE_CATEGORIES_INFO>;
	allCurrentGuessInfo: React.MutableRefObject<T_ALL_CURRENT_GUESS_INFO>;
}

const Game: React.FC<IProps> = (props) => {
	const { data, isSuccess } = useQuery({
		queryKey: [QUERY_KEYS.pastGuesses],
		queryFn: () =>
			apiRequestGetPastGuesses(getUserSessionDataFromStorage().access_token),
	});

	return (
		<>
			<GuessBox
				allCategoriesInfo={props.allCategoriesInfo}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
		</>
	);
};

export default Game;
