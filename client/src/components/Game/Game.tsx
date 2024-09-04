import GuessBox from "./children/GuessBox/GuessBox";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/consts";
import { getUserSessionDataFromStorage } from "../../utils/methods";
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
import CtxGameSession from "../../contexts/CtxGuessData";
import ResultBox from "./children/ResultBox/ResultBox";
import { T_GUESS_CATEGORIES_IDS_MAP } from "../../types/guesses";
import Loading from "../Loading/Loading";

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

	const { data, isFetching, isSuccess } = useQuery({
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
	} else {
		return (
			<>
				<CtxGameSession.Provider value={currentGuessInfo}>
					<GuessInfoButton />
					{data !== undefined && (
						<ResultBox pastGuesses={data.guesses.categories} categoriesInfoArr={categoriesInfo} />
					)}
					<GuessBox
						categoriesInfoArr={categoriesInfo}
						mostRecentGuess={
							data && data.guesses.categories.length > 0
								? //TODO: create map on fetch
									data.guesses.categories[data.guesses.categories.length - 1]
								: null
						}
					/>
				</CtxGameSession.Provider>
			</>
		);
	}
};

export default Game;
