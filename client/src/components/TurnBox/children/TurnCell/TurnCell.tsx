import { useState } from "react";
import styles from "./TurnCell.module.scss";
import { T_CATEGORY } from "../../../../types";
import CATEGORY_INFO from "../../../../CATEGORY_INFO";
import LevelRitualToggle from "./children/LevelRitualToggle/LevelRitualToggle";
import SingleTextInput from "./children/SingleTextInput/SingleTextInput";
import RecommendationBox from "./children/RecommendationBox/RecommendationBox";

interface IProps {
	category: T_CATEGORY;
}

const TurnCell: React.FC<IProps> = (props) => {
	const [inputValue, setInputValue] = useState<string>("");
	const [recommendations, setRecommendations] = useState<string[]>([]);

	function getUniqueItems(props: IProps): JSX.Element {
		// Handle unique category items
		switch (props.category) {
			case CATEGORY_INFO.LEVEL:
				return <LevelRitualToggle />;
				break;
			case CATEGORY_INFO.COMPONENTS:
				return <div>Placeholder</div>;
				break;
			default:
				return <></>;
		}
	}

	return (
		<div className={styles.root}>
			<h4>{props.category.name}</h4>
			<SingleTextInput
				inputValue={inputValue}
				setInputValue={setInputValue}
				setRecommendations={setRecommendations}
				recommendationValues={props.category.values}
			/>
			{recommendations.length == 0 ? null : (
				<RecommendationBox
					recommendations={recommendations}
					setRecommendations={setRecommendations}
					setInputValue={setInputValue}
				/>
			)}
			{getUniqueItems(props)}
		</div>
	);
};

export default TurnCell;
