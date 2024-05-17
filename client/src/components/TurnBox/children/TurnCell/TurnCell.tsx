import { useState } from "react";
import styles from "./TurnCell.module.scss";
import { T_CATEGORY } from "../../../../types";
import LevelRitualToggle from "./children/LevelRitualToggle/LevelRitualToggle";
import RecommendationBox from "./children/RecommendationBox/RecommendationBox";
import ComponentsSelection from "./children/ComponentsSelection/ComponentsSelection";
import * as methods from "../../../../utils/methods";
import TextInput from "./children/TextInput/TextInput";

interface IProps {
	category: T_CATEGORY;
}

const TurnCell: React.FC<IProps> = (props) => {
	const [inputValue, setInputValue] = useState<string>("");
	const [recommendations, setRecommendations] = useState<string[]>([]);

	const uniqueItems: JSX.Element = methods.getUniqueItems(
		props.category,
		<TextInput
			single={true}
			inputValue={inputValue}
			setInputValue={setInputValue}
			recommendationValues={props.category.values}
			setRecommendations={setRecommendations}
		/>,
		<TextInput
			single={false}
			inputValue={inputValue}
			setInputValue={setInputValue}
			recommendationValues={props.category.values}
			setRecommendations={setRecommendations}
		/>,
		<LevelRitualToggle />,
		<ComponentsSelection />
	);

	return (
		<div className={styles.root}>
			<h4>{props.category.name}</h4>
			{uniqueItems}
			{recommendations.length == 0 ? null : (
				<RecommendationBox
					recommendations={recommendations}
					setRecommendations={setRecommendations}
					setInputValue={setInputValue}
				/>
			)}
		</div>
	);
};

export default TurnCell;
