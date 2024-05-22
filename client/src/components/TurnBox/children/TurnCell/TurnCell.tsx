import { useState } from "react";
import styles from "./TurnCell.module.scss";
import { T_CATEGORY, T_SPELL_CATEGORY_INFO } from "../../../../types";
import RecommendationBox from "./children/RecommendationBox/RecommendationBox";
import * as methods from "../../../../utils/methods";

interface IProps {
	category: T_CATEGORY;
	setCurrentGuessInfo: React.Dispatch<
		React.SetStateAction<T_SPELL_CATEGORY_INFO>
	>;
}

const TurnCell: React.FC<IProps> = (props) => {
	const [inputValue, setInputValue] = useState<string>("");
	const [recommendations, setRecommendations] = useState<string[]>([]);

	return (
		<div className={styles.root}>
			<h4>{props.category.name}</h4>
			{methods.getUniqueItems(
				props.category,
				inputValue,
				setInputValue,
				setRecommendations,
				props.setCurrentGuessInfo
			)}
			<RecommendationBox
				recommendations={recommendations}
				setRecommendations={setRecommendations}
				setInputValue={setInputValue}
			/>
		</div>
	);
};

export default TurnCell;
