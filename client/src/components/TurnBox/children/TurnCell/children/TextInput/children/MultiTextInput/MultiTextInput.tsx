import { useState } from "react";
import styles from "./MultiTextInput.module.scss";
import { handleInput } from "../../../../../../../../utils/inputHandlers";
import * as methods from "../../../../../../../../utils/methods";

interface IProps {
	inputValue: string;
	setInputValue: React.Dispatch<React.SetStateAction<string>>;
	recommendationValues: string[];
	setRecommendations: React.Dispatch<React.SetStateAction<string[]>>;
}

const MultiTextInput: React.FC<IProps> = (props) => {
	const [guesses, setGuesses] = useState<string[]>([]);

	function onAddGuessClick(
		setGuesses: React.Dispatch<React.SetStateAction<string[]>>,
		inputValue: string,
		setInputValue: React.Dispatch<React.SetStateAction<string>>
	): void {
		setGuesses((guesses: string[]) => {
			const newArr = [...guesses];
			newArr.push(inputValue);
			return newArr;
		});
		setInputValue("");
	}

	function onRemoveGuessClick(
		setGuesses: React.Dispatch<React.SetStateAction<string[]>>,
		guess: string
	): void {
		setGuesses((guesses) => {
			return guesses.filter((g: string) => {
				return g.toLocaleLowerCase() !== guess.toLocaleLowerCase();
			});
		});
	}

	return (
		<div className={styles.root}>
			{guesses.length == 0 ? null : (
				<div className={styles.guesses_root}>
					{guesses.map((guess) => {
						return (
							<div key={guess}>
								<h5>{guess}</h5>
								<button onClick={() => onRemoveGuessClick(setGuesses, guess)}>
									-
								</button>
							</div>
						);
					})}
				</div>
			)}
			<div className={styles.input_root}>
				<input
					type="text"
					name="inputText"
					value={props.inputValue}
					onChange={(e) => {
						handleInput(e, props.setInputValue);
						props.setRecommendations(
							methods.getRecommendations(e, props.recommendationValues)
						);
					}}
					onFocus={(e) =>
						props.setRecommendations(
							methods.getRecommendations(e, props.recommendationValues)
						)
					}
					onBlur={() => props.setRecommendations([])}
				/>
				<button
					onClick={() =>
						onAddGuessClick(setGuesses, props.inputValue, props.setInputValue)
					}
				>
					+
				</button>
			</div>
		</div>
	);
};

export default MultiTextInput;
