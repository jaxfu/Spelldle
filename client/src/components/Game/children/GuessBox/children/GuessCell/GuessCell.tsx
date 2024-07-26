import { useState } from "react";
import styles from "./GuessCell.module.scss";
import {
	type T_GUESS_CATEGORIES,
	type T_CATEGORY_VALUE_MAP,
	type T_ALL_CURRENT_GUESS_INFO,
} from "../../../../../../types";
import RecommendationBox from "./children/RecommendationBox/RecommendationBox";
import * as methods from "../../../../../../utils/methods";

interface IProps {
	category_name: string;
	category_values: string[];
	allCurrentGuessInfo: React.MutableRefObject<T_GUESS_CATEGORIES>;
}

const GuessCell: React.FC<IProps> = (props) => {
	const [inputValue, setInputValue] = useState<string>("");
	const [recommendations, setRecommendations] = useState<string[]>([]);

	return (
		<div className={styles.root}>
			<h4>{props.category_name}</h4>
			{methods.getUniqueComponents(
				props.category_name,
				props.category_values,
				inputValue,
				setInputValue,
				setRecommendations,
				props.allCurrentGuessInfo,
			)}
			<RecommendationBox
				recommendations={recommendations}
				setRecommendations={setRecommendations}
				setInputValue={setInputValue}
			/>
		</div>
	);
};

export default GuessCell;
