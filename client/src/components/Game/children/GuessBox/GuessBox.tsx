import GuessCell, { I_GUESS_CELL_STATE } from "./children/GuessCell/GuessCell";
import styles from "./GuessBox.module.scss";
import { type T_CATEGORY_INFO } from "../../../../types/categories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequestMakeGuess } from "../../../../types/requests";
import { QUERY_KEYS } from "../../../../utils/consts";
import CtxGuessData from "../../../../contexts/CtxGuessData";
import { useContext, useEffect } from "react";
import { getUserSessionDataFromStorage } from "../../../../utils/methods";
import { type T_PAST_GUESS } from "../../../../types/guesses";

interface IProps {
	categoriesInfoArr: T_CATEGORY_INFO[];
	mostRecentGuess: T_PAST_GUESS | null;
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

	const guessData = useContext(CtxGuessData);

	return (
		<div className={styles.root}>
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
						mostRecentGuess={null}
					/>
				);
			})}
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
	);
};

export default GuessBox;
