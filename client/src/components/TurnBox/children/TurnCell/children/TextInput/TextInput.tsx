import MultiTextInput from "./children/MultiTextInput/MultiTextInput";
import SingleTextInput from "./children/SingleTextInput/SingleTextInput";

interface IProps {
	single: boolean;
	inputValue: string;
	setInputValue: React.Dispatch<React.SetStateAction<string>>;
	recommendationValues: string[];
	setRecommendations: React.Dispatch<React.SetStateAction<string[]>>;
}

const TextInput: React.FC<IProps> = (props) => {
	return (
		<>
			{props.single ? (
				<SingleTextInput
					inputValue={props.inputValue}
					setInputValue={props.setInputValue}
					recommendationValues={props.recommendationValues}
					setRecommendations={props.setRecommendations}
				/>
			) : (
				<MultiTextInput
					inputValue={props.inputValue}
					setInputValue={props.setInputValue}
					recommendationValues={props.recommendationValues}
					setRecommendations={props.setRecommendations}
				/>
			)}
		</>
	);
};

export default TextInput;
