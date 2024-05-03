import TurnCell from "../TurnCell/TurnCell";
import styles from "./TurnBox.module.scss";
import { E_CATEGORIES } from "../../types";
import CATEGORY_INFO from "../../CATEGORY_INFO";

const TurnBox: React.FC = () => {
	return (
		<div className={styles.root}>
			<TurnCell type={E_CATEGORIES.SCHOOL} />
			<TurnCell type={E_CATEGORIES.LEVEL} />
			<TurnCell type={E_CATEGORIES.CASTING} />
			<TurnCell type={E_CATEGORIES.RANGE} />
			<TurnCell type={E_CATEGORIES.TARGET} />
			<TurnCell type={E_CATEGORIES.COMPONENTS} />
			<TurnCell type={E_CATEGORIES.CLASS} />
			<TurnCell type={E_CATEGORIES.EFFECTS} />
		</div>
	);
};

export default TurnBox;
