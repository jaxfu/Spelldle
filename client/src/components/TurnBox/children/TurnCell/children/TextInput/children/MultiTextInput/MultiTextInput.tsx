import { useState } from "react";
import styles from "./MultiTextInput.module.scss";
import { handleInput } from "../../../../../../../../utils/inputHandlers";
import * as methods from "../../../../../../../../utils/methods";
import { T_SINGLE_CATEGORY_POSSIBILITIES } from "../../../../../../../../types";

interface IProps {
	category: T_SINGLE_CATEGORY_POSSIBILITIES;
	inputValue: string;
	setInputValue: React.Dispatch<React.SetStateAction<string>>;
	recommendationValues: string[];
	setRecommendations: React.Dispatch<React.SetStateAction<string[]>>;
}

const MultiTextInput: React.FC<IProps> = (props) => {
	const [guesses, setGuesses] = useState<string[]>([]);

	return (
		<div className={styles.root}>
			{guesses.length == 0 ? null : (
				<div className={styles.guesses_root}>
					{guesses.map((guess) => {
						return (
							<div key={guess}>
								<h5>{guess}</h5>
								<button
									onClick={() => methods.onRemoveGuessClick(setGuesses, guess)}
								>
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
						methods.onAddGuessClick(
							setGuesses,
							props.inputValue,
							props.setInputValue
						)
					}
				>
					+
				</button>
			</div>
		</div>
	);
};

export default MultiTextInput;
