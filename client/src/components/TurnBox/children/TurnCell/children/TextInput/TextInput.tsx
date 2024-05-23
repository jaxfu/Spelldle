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
	const [guessesForMulti, setGuessesForMulti] = props.multi
		? useState<string[]>([])
		: [null, () => {}];

	return (
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
	);
};

export default TextInput;
