import { useState, useContext, useMemo, useRef, useEffect } from "react";
import styles from "./MultiText.module.scss";
import MultiTextInput from "./children/MultiTextInput/MultiTextInput";
import RecommendationBox from "../RecommendationBox/RecommendationBox";
import { type T_CATEGORY_INFO } from "../../../../../../../../types/categories";
import GuessDataContext from "../../../../../../../../contexts/GuessDataContext";

interface IProps {
	categoryInfo: T_CATEGORY_INFO;
}

const MultiText: React.FC<IProps> = (props) => {
	const [input, setInput] = useState<string>("");
	const [showRecommendationBox, setShowRecommendationBox] =
		useState<boolean>(false);
	const [guesses, setGuesses] = useState<string[]>([]);

	const remainingValues = useRef<string[]>([...props.categoryInfo.values]);

	const guessData = useContext(GuessDataContext);

	const hasValidInput: boolean = useMemo(() => {
		for (const guess of guesses) {
			if (guess.toLowerCase() === input.toLowerCase()) return false;
		}

		return props.categoryInfo.value_id_map.has(input.toLowerCase());
	}, [input]);

	function removeGuessFromRemainingValues(guess: string): void {
		remainingValues.current = remainingValues.current.filter(
			(value) => value.toLowerCase() !== guess.toLowerCase(),
		);
	}

	function addGuessToRemainingValues(guess: string): void {
		remainingValues.current.push(guess);
	}

	function updateGuessCategoriesMap(): void {
		if (guessData !== null) {
			const mapArr: number[] = [];

			for (const guess of guesses) {
				const valueId = props.categoryInfo.value_id_map.get(guess.toLowerCase());
				if (valueId !== undefined) {
					mapArr.push(valueId);
				}
			}

			guessData.current.set(props.categoryInfo.name, mapArr.sort());
		}
	}

	useEffect(() => {
		updateGuessCategoriesMap();
	}, [guesses]);

	return (
		<div className={styles.root}>
			<div>
				{guesses.map((guess) => {
					{
						/*TODO: remove to own component and style*/
					}
					return (
						<div key={guess}>
							{guess}
							<button
								onClick={() => {
									setGuesses(guesses.filter((g) => g !== guess));
									addGuessToRemainingValues(guess);
								}}
							>
								-
							</button>
						</div>
					);
				})}
			</div>
			<MultiTextInput
				input={input}
				setInput={setInput}
				hasValidInput={hasValidInput}
				showRecommendationBox={showRecommendationBox}
				setShowRecommendationBox={setShowRecommendationBox}
				setGuesses={setGuesses}
				removeGuessFromRemainingValues={removeGuessFromRemainingValues}
			/>
			{showRecommendationBox && (
				<RecommendationBox
					values={remainingValues.current}
					input={input}
					setInput={setInput}
				/>
			)}
		</div>
	);
};

export default MultiText;
