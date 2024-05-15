import { useState } from "react";
import styles from "./TurnCell.module.scss";
import { T_CATEGORY } from "../../../../../../types";
import * as methods from "./methods";
import { handleInput } from "../../../../../../utils/HandleInputs";
import CATEGORY_INFO from "../../../../../../CATEGORY_INFO";
import LevelRitualToggle from "./children/LevelRitualToggle/LevelRitualToggle";

export interface IProps {
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
			default:
				return <></>;
		}
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
				onFocus={(e) =>
					setRecommendations(methods.getRecommendations(e, props))
				}
				onBlur={() => setRecommendations([])}
			/>
			{recommendations.length == 0 ? null : (
				<div className={styles.recommend_root}>
					{recommendations.map((option) => {
						return (
							<div
								className={styles.cell}
								key={option.toString()}
								onClick={() => {
									methods.onRecommendationClick(
										option.toString(),
										setInputValue,
										setRecommendations
									);
								}}
								// Keep focus on text input
								onMouseDown={(e) => e.preventDefault()}
							>
								{option.toString()}
							</div>
						);
					})}
				</div>
			)}
			{getUniqueItems(props)}
		</div>
	);
};

export default TurnCell;
