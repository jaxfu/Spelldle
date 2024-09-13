import styles from "./Game.module.scss";
import GuessBox from "./children/GuessBox/GuessBox";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LIMITS, QUERY_KEYS } from "../../utils/consts";
import {
	clearTokensFromLocalStorage,
	getUserSessionDataFromStorage,
} from "../../utils/methods";
import {
	apiRequestGetGameSessionInfo,
	apiRequestGetSpellList,
} from "../../utils/requests";
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
import InfoPopup from "./children/InfoPopup/InfoPopup";

interface IProps {
	showingPostGame: boolean;
	setShowingPostGame: React.Dispatch<React.SetStateAction<boolean>>;
	showingInfoPopup: boolean;
	setShowingInfoPopup: React.Dispatch<React.SetStateAction<boolean>>;
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

	// fetch spell list on first load
	const spellListQuery = useQuery({
		queryKey: [QUERY_KEYS.SPELL_LIST],
		queryFn: () =>
			apiRequestGetSpellList(getUserSessionDataFromStorage().access_token),
		retry: false,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
	});

	// fetch gameSession data
	const queryClient = useQueryClient();
	const { data, error, isFetching, isSuccess, isFetched } = useQuery({
		queryKey: [QUERY_KEYS.GAME_SESSION_INFO],
		queryFn: () =>
			apiRequestGetGameSessionInfo(
				getUserSessionDataFromStorage().access_token,
			),
		retry: false,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
		enabled: spellListQuery.isSuccess,
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

	// render postgame if limit reached or if last spell guess was correct &&
	// hide GuessBox if at categoryGuessLimit
	const [showGuessBox, setShowGuessBox] = useState<boolean>(true);
	useEffect(() => {
		if (isSuccess && !isFetching && data !== undefined) {
			if (data.guesses.correct || data.guesses.spells.length >= LIMITS.SPELL) {
				props.setShowingPostGame(true);
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEYS.CORRECT_SPELL_INFO],
				});
			} else if (data.guesses.categories.length >= LIMITS.CATEGORY) {
				setShowGuessBox(false);
			}
		}
	}, [data, isFetching, isSuccess]);

	// component render
	if (guessData === undefined || categoriesInfo === undefined || isFetching) {
		return <Loading />;
	} else if (isSuccess && spellListQuery.isSuccess) {
		if (data !== undefined && spellListQuery.data !== undefined) {
			return (
				<div className={styles.root}>
					<CtxGuessData.Provider value={{ guessData, setGuessData }}>
						{props.showingPostGame && (
							<PostGame
								setShowing={props.setShowingPostGame}
								gameSessionInfo={data}
								categoryInfo={categoriesInfo}
							/>
						)}
						{props.showingInfoPopup && <InfoPopup />}
						<GuessInfoButton />
						<GuessSpell
							spells={spellListQuery.data.data}
							setShowingPostGame={props.setShowingPostGame}
							pastSpellGuesses={data.guesses.spells}
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
