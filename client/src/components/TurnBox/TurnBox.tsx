import TurnCell from "./children/TurnCell/TurnCell";
import styles from "./TurnBox.module.scss";
import CATEGORY_INFO from "../../CATEGORY_INFO";
import { useState } from "react";
import { T_CATEGORY_GUESS_STATE, T_SPELL_INFO } from "../../types";
import * as methods from "../../utils/methods";

const TurnBox: React.FC = () => {
	const [allCurrentGuessInfo, setAllCurrentGuessInfo] = useState<T_SPELL_INFO>(
		methods.createNewSpellInfoMap()
	);

	return (
		<div className={styles.root}>
			<TurnCell
				category={CATEGORY_INFO.SCHOOL}
				setAllCurrentGuessInfo={setAllCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.LEVEL}
				setAllCurrentGuessInfo={setAllCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.CASTING_TIME}
				setAllCurrentGuessInfo={setAllCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.RANGE}
				setAllCurrentGuessInfo={setAllCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.TARGET}
				setAllCurrentGuessInfo={setAllCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.COMPONENTS}
				setAllCurrentGuessInfo={setAllCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.CLASS}
				setAllCurrentGuessInfo={setAllCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.EFFECTS}
				setAllCurrentGuessInfo={setAllCurrentGuessInfo}
			/>
			<button>Submit</button>
		</div>
	);
};

export default TurnBox;
