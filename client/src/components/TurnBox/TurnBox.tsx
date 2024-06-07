import TurnCell from "./children/TurnCell/TurnCell";
import styles from "./TurnBox.module.scss";
import {
	type T_ALL_CURRENT_GUESS_INFO,
	type T_ALL_POSSIBLE_CATEGORIES_INFO,
} from "../../types";
import { apiRequestMakeGuess } from "../../utils/requests";

interface IProps {
	allCategoriesInfo: React.MutableRefObject<T_ALL_POSSIBLE_CATEGORIES_INFO>;
	allCurrentGuessInfo: React.MutableRefObject<T_ALL_CURRENT_GUESS_INFO>;
}

const TurnBox: React.FC<IProps> = (props) => {
	return (
		<div className={styles.root}>
			<TurnCell
				category_name={props.allCategoriesInfo.current.SCHOOL.name}
				category_values={props.allCategoriesInfo.current.SCHOOL.values}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<TurnCell
				category_name={props.allCategoriesInfo.current.LEVEL.name}
				category_values={props.allCategoriesInfo.current.LEVEL.values}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<TurnCell
				category_name={props.allCategoriesInfo.current.CASTING_TIME.name}
				category_values={props.allCategoriesInfo.current.CASTING_TIME.values}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<TurnCell
				category_name={props.allCategoriesInfo.current.RANGE.name}
				category_values={props.allCategoriesInfo.current.RANGE.values}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<TurnCell
				category_name={props.allCategoriesInfo.current.TARGET.name}
				category_values={props.allCategoriesInfo.current.TARGET.values}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<TurnCell
				category_name={props.allCategoriesInfo.current.DURATION.name}
				category_values={props.allCategoriesInfo.current.DURATION.values}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<TurnCell
				category_name={props.allCategoriesInfo.current.COMPONENTS.name}
				category_values={props.allCategoriesInfo.current.COMPONENTS.values}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<TurnCell
				category_name={props.allCategoriesInfo.current.CLASS.name}
				category_values={props.allCategoriesInfo.current.CLASS.values}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<TurnCell
				category_name={props.allCategoriesInfo.current.EFFECTS.name}
				category_values={props.allCategoriesInfo.current.EFFECTS.values}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<button
				onClick={async () => {
					await apiRequestMakeGuess(
						props.allCurrentGuessInfo.current,
						props.allCategoriesInfo.current
					);
				}}
			>
				Submit
			</button>
		</div>
	);
};

export default TurnBox;
