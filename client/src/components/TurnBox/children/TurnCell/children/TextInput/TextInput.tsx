import { T_CATEGORY, T_SPELL_CATEGORY_INFO } from "../../../../../../types";
import MultiTextInput from "./children/MultiTextInput/MultiTextInput";
import SingleTextInput from "./children/SingleTextInput/SingleTextInput";

interface IProps {
	category: T_CATEGORY;
	single: boolean;
	inputValue: string;
	setInputValue: React.Dispatch<React.SetStateAction<string>>;
	recommendationValues: string[];
	setRecommendations: React.Dispatch<React.SetStateAction<string[]>>;
	setCurrentGuessInfo: React.Dispatch<
		React.SetStateAction<T_SPELL_CATEGORY_INFO>
	>;
}

const TextInput: React.FC<IProps> = (props) => {
	return (
		<>
			{props.single ? (
				<SingleTextInput
					category={props.category}
					inputValue={props.inputValue}
					setInputValue={props.setInputValue}
					recommendationValues={props.recommendationValues}
					setRecommendations={props.setRecommendations}
					setCurrentGuessInfo={props.setCurrentGuessInfo}
				/>
			) : (
				<MultiTextInput
					category={props.category}
					inputValue={props.inputValue}
					setInputValue={props.setInputValue}
					recommendationValues={props.recommendationValues}
					setRecommendations={props.setRecommendations}
					setCurrentGuessInfo={props.setCurrentGuessInfo}
				/>
			)}
		</>
	);
};

export default TextInput;
