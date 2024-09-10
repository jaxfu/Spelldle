import styles from "./Game.module.scss";
import GuessBox from "./children/GuessBox/GuessBox";
import { useQuery } from "@tanstack/react-query";
import { LIMITS, QUERY_KEYS } from "../../utils/consts";
import {
	clearTokensFromLocalStorage,
	getUserSessionDataFromStorage,
} from "../../utils/methods";
import { apiRequestGetGameSessionInfo } from "../../utils/requests";
import { useEffect, useMemo, useRef, useState } from "react";
import GuessInfoButton from "../DEBUG/GuessInfoButton/GuessInfoButton";
import {
	type T_CATEGORY_INFO,
	type T_CATEGORY_INFO_SEED_JSON,
	generateCategoryInfoFromSeedJSON,
	generateGuessesStateFromJSON,
} from "../../types/categories";
import CtxGuessData from "../../contexts/CtxGuessData";
import ResultBox from "./children/ResultBox/ResultBox";
import { T_GUESS_CATEGORIES_IDS_MAP } from "../../types/guesses";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import GuessSpell from "./children/GuessSpell/GuessSpell";
import PostGame from "./children/PostGame/PostGame";

interface IProps {
	showingPostGame: boolean;
	setShowingPostGame: React.Dispatch<React.SetStateAction<boolean>>;
}

const Game: React.FC<IProps> = (props) => {
	// fetch CATEGORY_INFO.json
	const [categoryInfoJson, setCategoryInfoJson] = useState<
		T_CATEGORY_INFO_SEED_JSON | undefined
	>();
	useEffect(() => {
		async function fetchCategoryInfoJson() {
			try {
				const response = await fetch("/CATEGORY_INFO.json");
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const data = await response.json();
				setCategoryInfoJson(data);
			} catch (error) {
				console.error("Error fetching spells:", error);
			}
		}

		fetchCategoryInfoJson();
	}, []);

	// generate categoriesInfo
	const categoriesInfo: T_CATEGORY_INFO[] | undefined = useMemo(() => {
		if (categoryInfoJson !== undefined)
			return generateCategoryInfoFromSeedJSON(categoryInfoJson);
		else return undefined;
	}, [categoryInfoJson]);

	// setup guessData to pass to guessDataCtx
	const [guessData, setGuessData] = useState<
		T_GUESS_CATEGORIES_IDS_MAP | undefined
	>();
	useEffect(() => {
		if (categoryInfoJson !== undefined)
			setGuessData(generateGuessesStateFromJSON(categoryInfoJson));
	}, [categoryInfoJson]);

	// fetch gameSession data
	const { data, error, isFetching, isSuccess, isFetched } = useQuery({
		queryKey: [QUERY_KEYS.GAME_SESSION_INFO],
		queryFn: () =>
			apiRequestGetGameSessionInfo(
				getUserSessionDataFromStorage().access_token,
			),
		retry: false,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
	});

	// logout and return to login if fetch error
	const navigate = useNavigate();
	useEffect(() => {
		if (!isFetching && isFetched && (!isSuccess || error)) {
			console.log(`Error fetching gameSessionData: ${error}`);
			clearTokensFromLocalStorage();
			navigate("/login");
		}
	}, [isFetched, isFetching, isSuccess, error]);

	// hide GuessBox if at categoryGuessLimit
	const [showGuessBox, setShowGuessBox] = useState<boolean>(true);
	useEffect(() => {
		if (data !== undefined) {
			if (data.guesses.categories.length >= LIMITS.CATEGORY) {
				setShowGuessBox(false);
			}
		}
	}, [data]);

	if (guessData === undefined || categoriesInfo === undefined || isFetching) {
		return <Loading />;
	} else if (isSuccess) {
		if (data !== undefined) {
			return (
				<div className={styles.root}>
					<CtxGuessData.Provider value={{ guessData, setGuessData }}>
						{props.showingPostGame && (
							<PostGame setShowingPostGame={props.setShowingPostGame} />
						)}
						<GuessInfoButton />
						<GuessSpell
							spells={data.spells}
							setShowingPostGame={props.setShowingPostGame}
							pastGuesses={data.guesses.spells}
						/>
						<GuessBox
							categoriesInfoArr={categoriesInfo}
							showGuessBox={showGuessBox}
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
					<div className={styles.spacer}></div>
				</div>
			);
		} else {
			clearTokensFromLocalStorage();
			navigate("/login");
		}
	}
};

export default Game;
