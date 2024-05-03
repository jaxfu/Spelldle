import TurnCell from "../TurnCell/TurnCell";
import styles from "./TurnBox.module.scss";
import { E_TURNCELL_TYPE } from "../../types";

const TurnBox: React.FC = () => {
	return (
		<div className={styles.root}>
			<TurnCell type={E_TURNCELL_TYPE.School} />
			<TurnCell type={E_TURNCELL_TYPE.Level} />
			<TurnCell type={E_TURNCELL_TYPE.Casting} />
			<TurnCell type={E_TURNCELL_TYPE.Range} />
			<TurnCell type={E_TURNCELL_TYPE.Target} />
			<TurnCell type={E_TURNCELL_TYPE.Components} />
			<TurnCell type={E_TURNCELL_TYPE.Class} />
			<TurnCell type={E_TURNCELL_TYPE.Effects} />
		</div>
	);
};

export default TurnBox;
