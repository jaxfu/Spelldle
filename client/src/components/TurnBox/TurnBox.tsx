import TurnCell from "../TurnCell/TurnCell";
import styles from "./TurnBox.module.scss";

const TurnBox: React.FC = () => {
	return (
		<div className={styles.root}>
			<TurnCell />
			<TurnCell />
			<TurnCell />
			<TurnCell />
			<TurnCell />
			<TurnCell />
			<TurnCell />
		</div>
	);
};

export default TurnBox;
