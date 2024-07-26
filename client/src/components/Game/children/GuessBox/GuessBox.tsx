import GuessCell from "./children/GuessCell/GuessCell";
import styles from "./GuessBox.module.scss";
import {
	T_GUESS_CATEGORIES,
	T_CATEGORY_VALUE_MAP,
	type T_ALL_CURRENT_GUESS_INFO,
	type T_CATEGORY_INFO_ALL,
} from "../../../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequestMakeGuess } from "../../../../utils/requests";
import { QUERY_KEYS } from "../../../../utils/consts";
import { getUserSessionDataFromStorage } from "../../../../utils/methods";

interface IProps {
	//allCategoriesInfo: React.MutableRefObject<T_ALL_POSSIBLE_CATEGORIES_INFO>;
	//allCurrentGuessInfo: React.MutableRefObject<T_ALL_CURRENT_GUESS_INFO>;
	SPELL_CATEGORY_MAP: T_CATEGORY_VALUE_MAP;
	allCurrentGuessInfo: React.MutableRefObject<T_GUESS_CATEGORIES>;
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

	const guessCells = (): JSX.Element[] => {
		const elements: JSX.Element[] = [];

		for (const outerMapKeys of props.SPELL_CATEGORY_MAP.keys()) {
			const innerMap = props.SPELL_CATEGORY_MAP.get(outerMapKeys);
			const innerMapKeysArr: string[] = [];
			if (innerMap !== undefined) {
				for (const innerMapKeys of innerMap.keys())
					innerMapKeysArr.push(innerMapKeys);
			}
			elements.push(
				<GuessCell
					category_name={outerMapKeys}
					category_values={innerMapKeysArr}
					allCurrentGuessInfo={props.allCurrentGuessInfo}
				/>,
			);
		}

		return elements;
	};

	return (
		<div className={styles.root}>
			{guessCells()}
			<button
			// onClick={() => {
			//   mutation.mutate({
			//     allCurrentGuessInfo: props.allCurrentGuessInfo.current,
			//     allCategoriesInfo: props.allCategoriesInfo.current,
			//     accessToken: getUserSessionDataFromStorage().access_token,
			//   });
			// }}
			>
				Submit
			</button>
		</div>
	);
};

export default GuessBox;
