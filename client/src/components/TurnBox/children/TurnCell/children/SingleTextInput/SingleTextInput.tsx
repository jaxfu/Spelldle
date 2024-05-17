import styles from "./SingleTextInput.module.scss";
import { handleInput } from "../../../../../../utils/inputHandlers";
import * as methods from "../../../../../../utils/methods";

interface IProps {
	inputValue: string;
	setInputValue: React.Dispatch<React.SetStateAction<string>>;
	recommendationValues: string[];
	setRecommendations: React.Dispatch<React.SetStateAction<string[]>>;
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
