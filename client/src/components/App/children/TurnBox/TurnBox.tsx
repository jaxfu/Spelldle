import TurnCell from "./children/TurnCell/TurnCell";
import styles from "./TurnBox.module.scss";
import CATEGORY_INFO from "../../../../CATEGORY_INFO";

const TurnBox: React.FC = () => {
	return (
		<div className={styles.root}>
			<TurnCell category={CATEGORY_INFO.SCHOOL} />
			<TurnCell category={CATEGORY_INFO.LEVEL} />
			<TurnCell category={CATEGORY_INFO.CASTING_TIME} />
			<TurnCell category={CATEGORY_INFO.RANGE} />
			<TurnCell category={CATEGORY_INFO.TARGET} />
			<TurnCell category={CATEGORY_INFO.COMPONENTS} />
			<TurnCell category={CATEGORY_INFO.CLASS} />
			<TurnCell category={CATEGORY_INFO.EFFECTS} />
		</div>
	);
};

export default TurnBox;
