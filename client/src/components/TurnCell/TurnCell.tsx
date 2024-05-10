import { useState } from "react";
import styles from "./TurnCell.module.scss";
import { handleInput } from "../../utils/HandleInputs";
import { T_CATEGORY } from "../../types";

interface IProps {
	category: T_CATEGORY;
}

const TurnCell: React.FC<IProps> = (props) => {
	const [textInput, setTextInput] = useState<string>("");
	const [recommendations, setRecommendations] = useState<string[]>([]);

	function getRecommendations(
		e: React.ChangeEvent<HTMLInputElement>
	): string[] {
		if (e.target.value == "") {
			return [];
		}

		const output: string[] = [];

		for (const option of props.category.values) {
			if (option.toLowerCase().includes(e.target.value.toLowerCase())) {
				output.push(option);
			}
		}

		return output;
	}

	return (
		<div className={styles.root}>
			<span>{props.category.name}</span>
			<input
				type="text"
				name="inputText"
				value={textInput}
				onChange={(e) => {
					handleInput(e, setTextInput);
					setRecommendations(getRecommendations(e));
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
			<button>Submit</button>
		</div>
	);
};

export default TurnCell;
