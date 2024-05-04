import { useState } from "react";
import styles from "./TurnCell.module.scss";
import { E_CATEGORIES, CATEGORY_NAMES } from "../../types";

interface IProps {
	type: E_CATEGORIES;
}

const TurnCell: React.FC<IProps> = (props) => {
	const [textInput, setTextInput] = useState<string>("");

	// INPUT HANDLER
	function handleInput(e: React.ChangeEvent<HTMLInputElement>): void {
		setTextInput(e.target.value);
	}

	return (
		<div className={styles.root}>
			<span>{CATEGORY_NAMES[props.type]}</span>
			<input
				type="text"
				name="inputText"
				value={textInput}
				onChange={handleInput}
			/>
			<button>Submit</button>
		</div>
	);
};

export default TurnCell;
