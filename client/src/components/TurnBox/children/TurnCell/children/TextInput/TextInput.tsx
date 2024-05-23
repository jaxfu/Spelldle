import styles from "./TextInput.module.scss";
import { T_SINGLE_CATEGORY_POSSIBILITIES } from "../../../../../../types";
import * as methods from "../../../../../../utils/methods";
import { handleInput } from "../../../../../../utils/inputHandlers";
import { useState } from "react";

interface IProps {
	category: T_SINGLE_CATEGORY_POSSIBILITIES;
	multi: boolean;
	inputValue: string;
	setInputValue: React.Dispatch<React.SetStateAction<string>>;
	recommendationValues: string[];
	setRecommendations: React.Dispatch<React.SetStateAction<string[]>>;
}

const TextInput: React.FC<IProps> = (props) => {
	const [guessesForMulti, setGuessesForMulti] = useState<string[]>([]);

	return (
		<div className={styles.root}>
			{props.multi && guessesForMulti.length == 0 ? null : (
				<div className={styles.guessesForMulti_root}>
					{guessesForMulti.map((guess) => {
						return (
							<div key={guess}>
								<h5>{guess}</h5>
								<button
									onClick={() =>
										methods.onRemoveGuessClick(setGuessesForMulti, guess)
									}
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
					className={styles.root}
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
				{props.multi ? (
					<button
						onClick={() =>
							methods.onAddGuessClick(
								setGuessesForMulti,
								props.inputValue,
								props.setInputValue
							)
						}
					>
						+
					</button>
				) : null}
			</div>
		</div>
	);
};

export default TextInput;
