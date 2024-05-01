import TurnBox from "../TurnBox/TurnBox";
import styles from "./GameBox.module.scss";

const GameBox = () => {
	return (
		<div className={styles.root}>
			<TurnBox />
		</div>
	);
};

export default GameBox;
