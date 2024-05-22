import styles from "./SingleTextInput.module.scss";
import { handleInput } from "../../../../../../../../utils/inputHandlers";
import * as methods from "../../../../../../../../utils/methods";
import {
	T_CATEGORY,
	T_SPELL_CATEGORY_INFO,
} from "../../../../../../../../types";

interface IProps {
	category: T_CATEGORY;
	inputValue: string;
	setInputValue: React.Dispatch<React.SetStateAction<string>>;
	recommendationValues: string[];
	setRecommendations: React.Dispatch<React.SetStateAction<string[]>>;
	setCurrentGuessInfo: React.Dispatch<
		React.SetStateAction<T_SPELL_CATEGORY_INFO>
	>;
}

const SingleTextInput: React.FC<IProps> = (props) => {
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
				props.setCurrentGuessInfo((current) =>
					methods.createNewGuessInfoObject(
						props.category.name,
						e.target.value,
						current
					)
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

export default SingleTextInput;
