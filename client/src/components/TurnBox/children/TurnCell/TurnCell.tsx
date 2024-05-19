import { useState } from "react";
import styles from "./TurnCell.module.scss";
import { T_CATEGORY } from "../../../../types";
import RecommendationBox from "./children/RecommendationBox/RecommendationBox";
import * as methods from "../../../../utils/methods";

interface IProps {
	category: T_CATEGORY;
}

const TurnCell: React.FC<IProps> = (props) => {
	const [inputValue, setInputValue] = useState<string>("");
	const [recommendations, setRecommendations] = useState<string[]>([]);

	const uniqueItems: JSX.Element = methods.getUniqueItems(
		props.category,
		inputValue,
		setInputValue,
		setRecommendations
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
