import styles from "./MultiText.module.scss";
import { useState, useContext, useRef, useEffect } from "react";
import MultiTextInput from "./children/MultiTextInput/MultiTextInput";
import RecommendationBox from "../RecommendationBox/RecommendationBox";
import { type T_CATEGORY_INFO } from "../../../../../../../../types/categories";
import CtxGuessData from "../../../../../../../../contexts/CtxGuessData";
import {
	type T_PAST_GUESS_CATEGORY,
	translateIdsToDisplay,
} from "../../../../../../../../types/guesses";
import MultiTextGuess from "./children/MultiTextGuess/MultiTextGuess";
import Locals from "./Locals";

interface IProps {
	categoryInfo: T_CATEGORY_INFO;
	mostRecentGuess: T_PAST_GUESS_CATEGORY;
	showingRecentGuess: boolean;
	setShowingRecentGuess: React.Dispatch<React.SetStateAction<boolean>>;
}

const MultiText: React.FC<IProps> = (props) => {
	const [input, setInput] = useState<string>("");
	const [showRecommendationBox, setShowRecommendationBox] =
		useState<boolean>(false);
	const [guesses, setGuesses] = useState<string[]>([]);
	const [hasValidInput, setHasValidInput] = useState<boolean>(false);
	const displayValuesFromMostRecentGuess = useRef<string[]>([]);

	const remainingRecommendations = useRef<string[]>([
		...props.categoryInfo.values,
	]);

	const guessData = useContext(CtxGuessData);

	// update guess map when guesses change &
	// check if changed from most recent guess
	useEffect(() => {
		Locals.updateGuessCategoriesMap(
			guessData,
			guesses,
			props.categoryInfo.value_id_map,
			props.categoryInfo.id,
		);

		if (
			props.showingRecentGuess &&
			guesses.join() !== displayValuesFromMostRecentGuess.current.join()
		) {
			props.setShowingRecentGuess(false);
		}
	}, [guesses]);

	// set to most recent guess
	useEffect(() => {
		if (
			props.mostRecentGuess.result !== -1 &&
			Array.isArray(props.mostRecentGuess.value)
		) {
			const guesses: string[] = translateIdsToDisplay(
				props.mostRecentGuess.value,
				props.categoryInfo,
			) as string[];
			guesses.sort();
			displayValuesFromMostRecentGuess.current = guesses;
			setGuesses(guesses);
			guesses.forEach((guess) =>
				Locals.removeGuessFromRemainingRecommendations(
					guess,
					remainingRecommendations,
				),
			);
		}
	}, [props.mostRecentGuess.value]);

	// check for valid input on input change
	useEffect(() => {
		setHasValidInput(
			Locals.checkForValidInput(
				input,
				guesses,
				props.categoryInfo.value_id_map,
			),
		);
	}, [input]);

	return (
		<div className={styles.root}>
			<div className={styles.guesses}>
				{guesses.length > 0 && guesses.map((guess) => {
					return (
						<MultiTextGuess
							key={guess}
							guess={guess}
							IRemoveFromGuesses={{
								removeFromGuesses: Locals.removeGuessFromGuesses,
								setGuesses: setGuesses,
								remainingReccomendations: remainingRecommendations,
							}}
						/>
					);
				})
			}
			</div>
			<MultiTextInput
				IInput={{
					input: input,
					setInput: setInput,
					hasValidInput: hasValidInput,
				}}
				IRecommendations={{
					showRecommendationBox: showRecommendationBox,
					setShowRecommendationBox: setShowRecommendationBox,
					remainingReccomendations: remainingRecommendations,
				}}
				IGuesses={{
					guess: input,
					setGuesses: setGuesses,
				}}
				IMethods={{
					removeGuessFromRemainingRecommendations:
						Locals.removeGuessFromRemainingRecommendations,
				}}
			/>
			{showRecommendationBox && (
				<RecommendationBox
					values={remainingRecommendations.current}
					input={input}
					setInput={setInput}
				/>
			)}
		</div>
	);
};

export default MultiText;
