import GuessBox from "./children/GuessBox/GuessBox";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/consts";
import {
	clearTokensFromLocalStorage,
	getUserSessionDataFromStorage,
} from "../../utils/methods";
import { apiRequestGetGameSessionInfo } from "../../utils/requests";
import { useMemo, useRef } from "react";
import GuessInfoButton from "../DEBUG/GuessInfoButton/GuessInfoButton";
import {
	type T_CATEGORY_INFO,
	type T_CATEGORY_INFO_SEED_JSON,
	generateCategoryInfoFromSeedJSON,
	generateGuessesStateFromJSON,
} from "../../types/categories";
import CATEGORY_INFO_JSON from "../../data/CATEGORY_INFO.json";
import CtxGuessData from "../../contexts/CtxGuessData";
import ResultBox from "./children/ResultBox/ResultBox";
import { T_GUESS_CATEGORIES_IDS_MAP } from "../../types/guesses";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";

const Game: React.FC = () => {
	const categoriesInfo: T_CATEGORY_INFO[] = useMemo(() => {
		return generateCategoryInfoFromSeedJSON(
			CATEGORY_INFO_JSON as T_CATEGORY_INFO_SEED_JSON,
		);
	}, []);
	const currentGuessInfo = useRef<T_GUESS_CATEGORIES_IDS_MAP>(
		generateGuessesStateFromJSON(
			CATEGORY_INFO_JSON as T_CATEGORY_INFO_SEED_JSON,
		),
	);
	const navigate = useNavigate();

	const { data, isFetching, isSuccess, isError } = useQuery({
		queryKey: [QUERY_KEYS.gameSessionInfo],
		queryFn: () =>
			apiRequestGetGameSessionInfo(
				getUserSessionDataFromStorage().access_token,
			),
		retry: false,
	});

	if (isSuccess) {
		console.log(data);
	}

	if (isFetching) {
		return <Loading />;
	} else if (isError) {
		clearTokensFromLocalStorage();
		navigate("/login");
	} else {
		return (
			<>
				<CtxGuessData.Provider value={currentGuessInfo}>
					<GuessInfoButton />
					<GuessBox
						categoriesInfoArr={categoriesInfo}
						mostRecentGuess={
							data && data.guesses.categories.length > 0
								? //TODO: create map on fetch
									data.guesses.categories[data.guesses.categories.length - 1]
								: null
						}
					/>
					{data && data.guesses.categories.length > 0 && (
						<ResultBox
							pastGuesses={data.guesses.categories}
							categoriesInfoArr={categoriesInfo}
						/>
					)}
				</CtxGuessData.Provider>
			</>
		);
	}
};

export default Game;
