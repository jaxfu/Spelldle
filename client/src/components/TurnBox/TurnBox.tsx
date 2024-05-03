import TurnCell from "../TurnCell/TurnCell";
import styles from "./TurnBox.module.scss";
import { E_CATEGORIES } from "../../types";

const TurnBox: React.FC = () => {
	return (
		<div className={styles.root}>
			<TurnCell type={E_CATEGORIES.School} />
			<TurnCell type={E_CATEGORIES.Level} />
			<TurnCell type={E_CATEGORIES.Casting} />
			<TurnCell type={E_CATEGORIES.Range} />
			<TurnCell type={E_CATEGORIES.Target} />
			<TurnCell type={E_CATEGORIES.Components} />
			<TurnCell type={E_CATEGORIES.Class} />
			<TurnCell type={E_CATEGORIES.Effects} />
		</div>
	);
};

export default TurnBox;
