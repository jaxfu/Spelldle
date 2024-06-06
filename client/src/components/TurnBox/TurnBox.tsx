import TurnCell from "./children/TurnCell/TurnCell";
import styles from "./TurnBox.module.scss";
import CATEGORY_INFO from "../../CATEGORY_INFO";
import { T_SPELL_INFO } from "../../types";

interface IProps {
	allCurrentGuessInfo: React.MutableRefObject<T_SPELL_INFO>;
}

const TurnBox: React.FC<IProps> = (props) => {
	return (
		<div className={styles.root}>
			<TurnCell
				category={CATEGORY_INFO.SCHOOL}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.LEVEL}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.CASTING_TIME}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.RANGE}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.TARGET}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.COMPONENTS}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.CLASS}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<TurnCell
				category={CATEGORY_INFO.EFFECTS}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<button>Submit</button>
		</div>
	);
};

export default TurnBox;
