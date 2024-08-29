import GuessBox from "./children/GuessBox/GuessBox";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/consts";
import { getUserSessionDataFromStorage } from "../../utils/methods";
import { apiRequestGetPastGuesses } from "../../utils/requests";
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
import { T_GUESS_MAP_IDS } from "../../types/guesses";
import Loading from "../Loading/Loading";

const Game: React.FC = () => {
	const categoriesInfo: T_CATEGORY_INFO[] = useMemo(() => {
		return generateCategoryInfoFromSeedJSON(
			CATEGORY_INFO_JSON as T_CATEGORY_INFO_SEED_JSON,
		);
	}, []);
	const currentGuessInfo = useRef<T_GUESS_MAP_IDS>(
		generateGuessesStateFromJSON(
			CATEGORY_INFO_JSON as T_CATEGORY_INFO_SEED_JSON,
		),
	);

	const { data, isFetching, isSuccess } = useQuery({
		queryKey: [QUERY_KEYS.pastGuesses],
		queryFn: () =>
			apiRequestGetPastGuesses(getUserSessionDataFromStorage().access_token),
	});

	if (isSuccess) {
		console.log(data);
	}

	if (isFetching) {
		return <Loading />;
	} else {
		return (
			<>
				<CtxGuessData.Provider value={currentGuessInfo}>
					<GuessInfoButton />
					{data !== undefined && (
						<ResultBox pastGuesses={data} categoriesInfoArr={categoriesInfo} />
					)}
					<GuessBox
						categoriesInfoArr={categoriesInfo}
						mostRecentGuess={
							data !== undefined
								? //TODO: create map on fetch
									data[data.length - 1]
								: null
						}
					/>
				</CtxGuessData.Provider>
			</>
		);
	}
};

export default Game;
