import TurnCell from "./children/TurnCell/TurnCell";
import styles from "./TurnBox.module.scss";
import {
	type T_SPELL_INFO,
	type T_ALL_POSSIBLE_CATEGORIES_INFO,
} from "../../types";

interface IProps {
	allCategoriesInfo: React.MutableRefObject<T_ALL_POSSIBLE_CATEGORIES_INFO>;
	allCurrentGuessInfo: React.MutableRefObject<T_SPELL_INFO>;
}

const TurnBox: React.FC<IProps> = (props) => {
	return (
		<div className={styles.root}>
			<TurnCell
				category={props.allCategoriesInfo.current.SCHOOL}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<TurnCell
				category={props.allCategoriesInfo.current.LEVEL}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<TurnCell
				category={props.allCategoriesInfo.current.CASTING_TIME}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<TurnCell
				category={props.allCategoriesInfo.current.RANGE}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<TurnCell
				category={props.allCategoriesInfo.current.TARGET}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<TurnCell
				category={props.allCategoriesInfo.current.COMPONENTS}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<TurnCell
				category={props.allCategoriesInfo.current.CLASS}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<TurnCell
				category={props.allCategoriesInfo.current.EFFECTS}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<button>Submit</button>
		</div>
	);
};

export default TurnBox;
