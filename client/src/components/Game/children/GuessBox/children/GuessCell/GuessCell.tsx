import { useState } from "react";
import styles from "./GuessCell.module.scss";
import { type T_GUESS_CATEGORIES } from "../../../../../../methods/guesses";
import RecommendationBox from "./children/RecommendationBox/RecommendationBox";
import * as methods from "../../../../../../utils/methods";
import TextInput from "./children/TextInput/TextInput";
import {
	type T_CATEGORY_INFO,
	E_CATEGORY_COMPONENT_TYPE,
} from "../../../../../../methods/categories";
import SingleText from "./children/SingleText/SingleText";

interface IProps {
	categoryInfo: T_CATEGORY_INFO;
	allCurrentGuessInfo: React.MutableRefObject<T_GUESS_CATEGORIES>;
}

const GuessCell: React.FC<IProps> = (props) => {
	const [input, setInput] = useState<string>("");
	const [show, setShow] = useState<boolean>(false);

	const component = (): JSX.Element => {
		switch (props.categoryInfo.component_type) {
			case E_CATEGORY_COMPONENT_TYPE.SINGLE_TEXT:
				return (
					<>
						{/* // <TextInput
					// 	category_name={category_name}
					// 	recommendationValues={category_values}
					// 	setRecommendations={setRecommendations}
					// 	multi={false}
					// 	inputValue={inputValue}
					// 	setInputValue={setInputValue}
					// 	allCurrentGuessInfo={allCurrentGuessInfo}
					// /> */}
						<SingleText
							input={input}
							setInput={setInput}
							show={show}
							setShow={setShow}
						/>
						{show && (
							<RecommendationBox
								values={Array.from(props.categoryInfo.values_map.keys())}
								input={input}
								setInput={setInput}
							/>
						)}
					</>
				);
			case E_CATEGORY_COMPONENT_TYPE.MULTI_TEXT:
				return <div></div>;
			case E_CATEGORY_COMPONENT_TYPE.COMPONENTS:
				return <div></div>;
			case E_CATEGORY_COMPONENT_TYPE.LEVEL:
				return <div></div>;
		}
	};

	return (
		<div className={styles.root}>
			<h4>{props.categoryInfo.name}</h4>
			{component()}
			{/* {methods.getUniqueComponents(
				props.category_name,
				props.category_values,
				inputValue,
				setInputValue,
				setRecommendations,
				props.allCurrentGuessInfo,
			)} */}
		</div>
	);
};

export default GuessCell;
