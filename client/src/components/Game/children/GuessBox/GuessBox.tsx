import GuessCell from "./children/GuessCell/GuessCell";
import styles from "./GuessBox.module.scss";
import {
	type T_ALL_CURRENT_GUESS_INFO,
	type T_ALL_POSSIBLE_CATEGORIES_INFO,
} from "../../../../types";
import { apiRequestMakeGuess } from "../../../../utils/requests";
import { getUserSessionDataFromStorage } from "../../../../utils/methods";

interface IProps {
	allCategoriesInfo: React.MutableRefObject<T_ALL_POSSIBLE_CATEGORIES_INFO>;
	allCurrentGuessInfo: React.MutableRefObject<T_ALL_CURRENT_GUESS_INFO>;
}

const GuessBox: React.FC<IProps> = (props) => {
	return (
		<div className={styles.root}>
			<GuessCell
				category_name={props.allCategoriesInfo.current.SCHOOL.name}
				category_values={props.allCategoriesInfo.current.SCHOOL.values}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<GuessCell
				category_name={props.allCategoriesInfo.current.LEVEL.name}
				category_values={props.allCategoriesInfo.current.LEVEL.values}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<GuessCell
				category_name={props.allCategoriesInfo.current.CASTING_TIME.name}
				category_values={props.allCategoriesInfo.current.CASTING_TIME.values}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<GuessCell
				category_name={props.allCategoriesInfo.current.RANGE.name}
				category_values={props.allCategoriesInfo.current.RANGE.values}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<GuessCell
				category_name={props.allCategoriesInfo.current.TARGET.name}
				category_values={props.allCategoriesInfo.current.TARGET.values}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<GuessCell
				category_name={props.allCategoriesInfo.current.DURATION.name}
				category_values={props.allCategoriesInfo.current.DURATION.values}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<GuessCell
				category_name={props.allCategoriesInfo.current.COMPONENTS.name}
				category_values={props.allCategoriesInfo.current.COMPONENTS.values}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<GuessCell
				category_name={props.allCategoriesInfo.current.CLASS.name}
				category_values={props.allCategoriesInfo.current.CLASS.values}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<GuessCell
				category_name={props.allCategoriesInfo.current.EFFECTS.name}
				category_values={props.allCategoriesInfo.current.EFFECTS.values}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
			<button
				onClick={async () => {
					const res = await apiRequestMakeGuess(
						props.allCurrentGuessInfo.current,
						props.allCategoriesInfo.current,
						getUserSessionDataFromStorage().access_token,
					);
					console.log(`RES: ${JSON.stringify(res.data)}`);
				}}
			>
				Submit
			</button>
		</div>
	);
};

export default GuessBox;
