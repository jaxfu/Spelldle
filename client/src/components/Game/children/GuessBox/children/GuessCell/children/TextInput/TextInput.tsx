import styles from "./TextInput.module.scss";
import {
	type T_ALL_CURRENT_GUESS_INFO,
	type T_GUESS_CATEGORIES,
} from "../../../../../../../../types";
import * as methods from "../../../../../../../../utils/methods";
import { handleInput } from "../../../../../../../../utils/inputHandlers";
import { useState, useEffect } from "react";

interface IProps {
	category_name: string;
	multi: boolean;
	inputValue: string;
	setInputValue: React.Dispatch<React.SetStateAction<string>>;
	recommendationValues: string[];
	setRecommendations: React.Dispatch<React.SetStateAction<string[]>>;
	allCurrentGuessInfo: React.MutableRefObject<T_GUESS_CATEGORIES>;
}

const TextInput: React.FC<IProps> = (props) => {
	const [guessesForMulti, setGuessesForMulti] = useState<string[]>([]);

	useEffect(() => {
		const LEVEL_IDENTIFIER: string = "LEVEL";
		if (props.multi) {
			props.allCurrentGuessInfo.current.set(props.category_name, [
				...guessesForMulti,
			]);
		} else if (props.category_name == LEVEL_IDENTIFIER) {
			const levelState: any =
				props.allCurrentGuessInfo.current.get(LEVEL_IDENTIFIER);
			if (levelState) levelState[0] = props.inputValue;
			props.allCurrentGuessInfo.current.set(LEVEL_IDENTIFIER, levelState);
		} else {
			props.allCurrentGuessInfo.current.set(
				props.category_name,
				props.inputValue,
			);
		}
	}, [props.inputValue, guessesForMulti]);

	return (
		<div className={styles.root}>
			{props.multi && guessesForMulti.length == 0 && (
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
							methods.getRecommendations(e, props.recommendationValues),
						);
					}}
					onFocus={(e) =>
						props.setRecommendations(
							methods.getRecommendations(e, props.recommendationValues),
						)
					}
					onBlur={() => props.setRecommendations([])}
				/>
				{props.multi && (
					<button
						onClick={() =>
							methods.onAddGuessClick(
								setGuessesForMulti,
								props.inputValue,
								props.setInputValue,
							)
						}
					>
						+
					</button>
				)}
			</div>
		</div>
	);
};

export default TextInput;
