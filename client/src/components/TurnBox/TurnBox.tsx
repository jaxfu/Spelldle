import TurnCell from "./children/TurnCell/TurnCell";
import styles from "./TurnBox.module.scss";
import CATEGORY_INFO from "../../CATEGORY_INFO";
import { T_SPELL_INFO } from "../../types";

interface IProps {
	allCurrentGuessInfo: T_SPELL_INFO;
	setAllCurrentGuessInfo: React.Dispatch<React.SetStateAction<T_SPELL_INFO>>;
}

const TurnBox: React.FC<IProps> = (props) => {
	return (
		<div className={styles.root}>
			<TurnCell
				category={CATEGORY_INFO.SCHOOL}
				setAllCurrentGuessInfo={props.setAllCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.LEVEL}
				setAllCurrentGuessInfo={props.setAllCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.CASTING_TIME}
				setAllCurrentGuessInfo={props.setAllCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.RANGE}
				setAllCurrentGuessInfo={props.setAllCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.TARGET}
				setAllCurrentGuessInfo={props.setAllCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.COMPONENTS}
				setAllCurrentGuessInfo={props.setAllCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.CLASS}
				setAllCurrentGuessInfo={props.setAllCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.EFFECTS}
				setAllCurrentGuessInfo={props.setAllCurrentGuessInfo}
			/>
			<button>Submit</button>
		</div>
	);
};

export default TurnBox;
