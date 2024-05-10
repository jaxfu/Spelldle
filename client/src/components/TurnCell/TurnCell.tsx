import { useState } from "react";
import styles from "./TurnCell.module.scss";
import { handleInput } from "../../utils/HandleInputs";
import { T_CATEGORY } from "../../types";

interface IProps {
	category: T_CATEGORY;
}

const TurnCell: React.FC<IProps> = (props) => {
	const [textInput, setTextInput] = useState<string>("");

	return (
		<div className={styles.root}>
			<span>{props.category.name}</span>
			<input
				type="text"
				name="inputText"
				value={textInput}
				onChange={(e) => handleInput(e, setTextInput)}
			/>
			<button>Submit</button>
		</div>
	);
};

export default TurnCell;
