import styles from "./MultiTextInput.module.scss";

interface IProps {
	input: string;
	setInput: React.Dispatch<React.SetStateAction<string>>;
	showRecommendationBox: boolean;
	setShowRecommendationBox: React.Dispatch<React.SetStateAction<boolean>>;
	setGuesses: React.Dispatch<React.SetStateAction<string[]>>;
	hasValidInput: boolean;
	removeGuessFromRemainingValues: (guess: string) => void;
}

const MultiTextInput: React.FC<IProps> = (props) => {
	function addGuessToGuessesBox(guess: string) {
		props.setGuesses((guesses) => [...guesses, guess].sort());
		props.setInput("");
	}

	return (
		<span className={styles.root}>
			<input
				type="text"
				name="guess"
				value={props.input}
				onChange={(e) => props.setInput(e.target.value)}
				onClick={() =>
					!props.showRecommendationBox && props.setShowRecommendationBox(true)
				}
				onBlur={() =>
					props.showRecommendationBox && props.setShowRecommendationBox(false)
				}
				autoComplete="false"
			/>
			{props.hasValidInput && (
				<button
					onClick={() => {
						addGuessToGuessesBox(props.input);
						props.removeGuessFromRemainingValues(props.input);
					}}
				>
					+
				</button>
			)}
		</span>
	);
};

export default MultiTextInput;
