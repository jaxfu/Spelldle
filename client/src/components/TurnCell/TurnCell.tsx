import styles from "./TurnCell.module.scss";
import { E_TURNCELL_TYPE, TURNCELL_TYPE_NAMES } from "../../types";

interface IProps {
	type: E_TURNCELL_TYPE;
}

const TurnCell: React.FC<IProps> = (props) => {
	return (
		<div className={styles.root}>
			<span>{TURNCELL_TYPE_NAMES[props.type]}</span>
			<input type="text" name="" id="" />
		</div>
	);
};

export default TurnCell;
