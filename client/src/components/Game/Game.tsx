import GuessBox from "./children/GuessBox/GuessBox";
import {
	type T_ALL_POSSIBLE_CATEGORIES_INFO,
	type T_ALL_CURRENT_GUESS_INFO,
} from "../../types";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/consts";

interface IProps {
	allCategoriesInfo: React.MutableRefObject<T_ALL_POSSIBLE_CATEGORIES_INFO>;
	allCurrentGuessInfo: React.MutableRefObject<T_ALL_CURRENT_GUESS_INFO>;
}

const Game: React.FC<IProps> = (props) => {
	const query = useQuery({
		queryKey: [QUERY_KEYS.pastGuesses],
		queryFn: () => console.log("TEST"),
	});

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
