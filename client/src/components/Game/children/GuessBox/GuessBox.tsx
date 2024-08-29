import styles from "./GuessBox.module.scss";
import { type T_CATEGORY_INFO } from "../../../../types/categories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequestMakeGuess } from "../../../../utils/requests";
import { QUERY_KEYS } from "../../../../utils/consts";
import CtxGuessData from "../../../../contexts/CtxGuessData";
import { useContext, useMemo } from "react";
import {
	deepCopyObject,
	getUserSessionDataFromStorage,
} from "../../../../utils/methods";
import {
	INIT_PAST_GUESS_CATEGORY,
	T_PAST_GUESS_CATEGORY,
	type T_PAST_GUESS,
} from "../../../../types/guesses";
import GuessCell from "./children/GuessCell/GuessCell";

interface IProps {
	categoriesInfoArr: T_CATEGORY_INFO[];
	mostRecentGuess: T_PAST_GUESS | null;
}

const GuessBox: React.FC<IProps> = (props) => {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: apiRequestMakeGuess,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.pastGuesses] });
		},
	});

	const guessData = useContext(CtxGuessData);

	const nullPastGuessCategory: T_PAST_GUESS_CATEGORY = useMemo(
		() => deepCopyObject(INIT_PAST_GUESS_CATEGORY),
		[],
	);

	return (
		<div className={styles.root}>
			<div className={styles.guess_cells}>
				{props.categoriesInfoArr.map((category) => {
					if (props.mostRecentGuess !== null) {
						const mostRecentGuess = props.mostRecentGuess.get(category.id);
						if (mostRecentGuess !== undefined)
							return (
								<GuessCell
									key={category.id}
									categoryInfo={category}
									mostRecentGuess={mostRecentGuess}
								/>
							);
					}
					return (
						<GuessCell
							key={category.id}
							categoryInfo={category}
							mostRecentGuess={nullPastGuessCategory}
						/>
					);
				})}
			</div>
			<div className={styles.submit}>
				<button
					onClick={() => {
						if (guessData !== null) {
							mutation.mutate({
								accessToken: getUserSessionDataFromStorage().access_token,
								guessData: guessData?.current,
							});
						}
					}}
				>
					Submit
				</button>
			</div>
		</div>
	);
};

export default GuessBox;
