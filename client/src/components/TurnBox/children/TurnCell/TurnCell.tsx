import { useState } from "react";
import styles from "./TurnCell.module.scss";
import { T_CATEGORY } from "../../../../types";
import LevelRitualToggle from "./children/LevelRitualToggle/LevelRitualToggle";
import SingleTextInput from "./children/SingleTextInput/SingleTextInput";
import RecommendationBox from "./children/RecommendationBox/RecommendationBox";
import ComponentsSelection from "./children/ComponentsSelection/ComponentsSelection";
import MultiTextInput from "./children/MultiTextInput/MultiTextInput";
import * as methods from "../../../../utils/methods";

interface IProps {
	category: T_CATEGORY;
}

const TurnCell: React.FC<IProps> = (props) => {
	const [inputValue, setInputValue] = useState<string>("");
	const [recommendations, setRecommendations] = useState<string[]>([]);

	const uniqueItems: JSX.Element = methods.getUniqueItems(
		props.category,
		<SingleTextInput
			inputValue={inputValue}
			setInputValue={setInputValue}
			recommendationValues={props.category.values}
			setRecommendations={setRecommendations}
		/>,
		<MultiTextInput
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
