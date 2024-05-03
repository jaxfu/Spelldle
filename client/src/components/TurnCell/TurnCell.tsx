import styles from "./TurnCell.module.scss";
import { E_CATEGORIES, CATEGORY_NAMES } from "../../types";

interface IProps {
	type: E_CATEGORIES;
}

const TurnCell: React.FC<IProps> = (props) => {
	return (
		<div className={styles.root}>
			<span>{CATEGORY_NAMES[props.type]}</span>
			<input type="text" name="" id="" />
			<button>Submit</button>
		</div>
	);
};

export default TurnCell;
