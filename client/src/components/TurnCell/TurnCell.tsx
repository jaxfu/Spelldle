import { useState } from "react";
import styles from "./TurnCell.module.scss";
import { E_CATEGORIES, CATEGORY_NAMES } from "../../types";
import { handleInput } from "../../utils/HandleInputs";

interface IProps {
	type: E_CATEGORIES;
}

const TurnCell: React.FC<IProps> = (props) => {
	const [textInput, setTextInput] = useState<string>("");

	return (
		<div className={styles.root}>
			<span>{CATEGORY_NAMES[props.type]}</span>
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
