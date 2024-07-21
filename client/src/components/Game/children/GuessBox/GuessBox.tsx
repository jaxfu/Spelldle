import GuessCell from "./children/GuessCell/GuessCell";
import styles from "./GuessBox.module.scss";
import {
	T_GAME_SESSION,
	type T_ALL_CURRENT_GUESS_INFO,
	type T_ALL_POSSIBLE_CATEGORIES_INFO,
} from "../../../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequestMakeGuess } from "../../../../utils/requests";
import { QUERY_KEYS } from "../../../../utils/consts";
import { getUserSessionDataFromStorage } from "../../../../utils/methods";

interface IProps {
	allCategoriesInfo: React.MutableRefObject<T_ALL_POSSIBLE_CATEGORIES_INFO>;
	allCurrentGuessInfo: React.MutableRefObject<T_ALL_CURRENT_GUESS_INFO>;
	gameSession: T_GAME_SESSION;
}

const GuessBox: React.FC<IProps> = (props) => {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: apiRequestMakeGuess,
		onSuccess: (data) => {
			console.log("SUCCESFUL MAKE_GUESS: " + data.data.toString());
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.pastGuesses] });
		},
	});

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
				onClick={() => {
					mutation.mutate({
						allCurrentGuessInfo: props.allCurrentGuessInfo.current,
						allCategoriesInfo: props.allCategoriesInfo.current,
						accessToken: getUserSessionDataFromStorage().access_token,
						gameSession: props.gameSession,
					});
				}}
			>
				Submit
			</button>
		</div>
	);
};

export default GuessBox;
