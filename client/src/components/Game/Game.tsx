import styles from "./Game.module.scss";
import GuessBox from "./children/GuessBox/GuessBox";
import {
	T_ALL_POSSIBLE_CATEGORIES_INFO,
	T_ALL_CURRENT_GUESS_INFO,
} from "../../types";

interface IProps {
	allCategoriesInfo: React.MutableRefObject<T_ALL_POSSIBLE_CATEGORIES_INFO>;
	allCurrentGuessInfo: React.MutableRefObject<T_ALL_CURRENT_GUESS_INFO>;
}

const Game: React.FC<IProps> = (props) => {
	return (
		<>
			<GuessBox
				allCategoriesInfo={props.allCategoriesInfo}
				allCurrentGuessInfo={props.allCurrentGuessInfo}
			/>
		</>
	);
};

export default Game;
