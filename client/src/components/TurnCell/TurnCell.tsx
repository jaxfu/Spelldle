import { useState } from "react";
import styles from "./TurnCell.module.scss";
import { T_CATEGORY } from "../../types";
import * as methods from "./methods";
import { handleInput } from "../../utils/HandleInputs";

export interface IProps {
	category: T_CATEGORY;
}

const TurnCell: React.FC<IProps> = (props) => {
	const [inputValue, setInputValue] = useState<string>("");
	const [recommendations, setRecommendations] = useState<string[]>([]);

	function onRecommendationClick(key: string) {
		console.log(key);
		setInputValue(key);
		setRecommendations([]);
	}

	return (
		<div className={styles.root}>
			<span>{props.category.name}</span>
			<input
				type="text"
				name="inputText"
				value={inputValue}
				onChange={(e) => {
					handleInput(e, setInputValue);
					setRecommendations(methods.getRecommendations(e, props));
				}}
			/>
			{recommendations.length == 0 ? null : (
				<div className={styles.recommend_root}>
					{recommendations.map((option) => {
						return (
							<div
								className={styles.cell}
								key={option.toString()}
								onClick={() => onRecommendationClick(option.toString())}
							>
								{option.toString()}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default TurnCell;
