import TurnCell from "./children/TurnCell/TurnCell";
import styles from "./TurnBox.module.scss";
import CATEGORY_INFO from "../../CATEGORY_INFO";
import { useState } from "react";
import { T_SPELL_CATEGORY_INFO, NEW_SPELL_CATEGORY_INFO } from "../../types";
import * as methods from "../../utils/methods";

const TurnBox: React.FC = () => {
	const [guessInfo, setGuessInfo] = useState<T_SPELL_CATEGORY_INFO>(
		methods.createNewObject(NEW_SPELL_CATEGORY_INFO)
	);

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
