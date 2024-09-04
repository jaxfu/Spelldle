import styles from "./Game.module.scss";
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
import GuessSpell from "./children/GuessSpell/GuessSpell";
import GuessCount from "./children/GuessBox/children/GuessCount/GuessCount";

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

	if (isFetching) {
		return <Loading />;
	} else if (isSuccess && data) {
		console.log(data);

		return (
			<>
				<CtxGuessData.Provider value={currentGuessInfo}>
					<GuessInfoButton />
					<GuessSpell spells={data.spells} numGuesses={data.guesses.spells.length} />
					<GuessBox
						categoriesInfoArr={categoriesInfo}
						mostRecentGuess={
							data.guesses.categories.length > 0
								? data.guesses.categories[data.guesses.categories.length - 1]
								: null
						}
						numGuesses={{
							category: data.guesses.categories.length,
							spell: data.guesses.spells.length,
						}}
					/>
					{data.guesses.categories.length > 0 && (
						<ResultBox
							pastGuesses={data.guesses.categories}
							categoriesInfoArr={categoriesInfo}
						/>
					)}
				</CtxGuessData.Provider>
			</>
		);
	} else {
		clearTokensFromLocalStorage();
		navigate("/login");
	}
};

export default Game;
