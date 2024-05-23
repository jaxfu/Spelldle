import TurnCell from "./children/TurnCell/TurnCell";
import styles from "./TurnBox.module.scss";
import CATEGORY_INFO from "../../CATEGORY_INFO";
import { useState } from "react";
import { T_SPELL_INFO, NEW_SPELL_INFO } from "../../types";
import * as methods from "../../utils/methods";

const TurnBox: React.FC = () => {
	const [currentGuessInfo, setCurrentGuessInfo] = useState<T_SPELL_INFO>(
		methods.createNewObject(NEW_SPELL_INFO)
	);

	return (
		<div className={styles.root}>
			<TurnCell
				category={CATEGORY_INFO.SCHOOL}
				setCurrentGuessInfo={setCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.LEVEL}
				setCurrentGuessInfo={setCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.CASTING_TIME}
				setCurrentGuessInfo={setCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.RANGE}
				setCurrentGuessInfo={setCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.TARGET}
				setCurrentGuessInfo={setCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.COMPONENTS}
				setCurrentGuessInfo={setCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.CLASS}
				setCurrentGuessInfo={setCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.EFFECTS}
				setCurrentGuessInfo={setCurrentGuessInfo}
			/>
		</div>
	);
};

export default TurnBox;
