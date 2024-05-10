import { useState } from "react";
import styles from "./TurnCell.module.scss";
import { T_CATEGORY } from "../../types";
import * as methods from "./methods";

export interface IProps {
	category: T_CATEGORY;
}

const TurnCell: React.FC<IProps> = (props) => {
	const [recommendations, setRecommendations] = useState<string[]>([]);

	return (
		<div className={styles.root}>
			<span>{props.category.name}</span>
			<input
				type="text"
				name="inputText"
				onChange={(e) => {
					setRecommendations(methods.getRecommendations(e, props));
				}}
			/>
			{recommendations.length == 0 ? null : (
				<div className={styles.recommend_root}>
					{recommendations.map((option) => {
						return (
							<div className={styles.cell} key={option.toString()}>
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
