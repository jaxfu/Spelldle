import GuessCell, { I_GUESS_CELL_STATE } from "./children/GuessCell/GuessCell";
import styles from "./GuessBox.module.scss";
import { type T_CATEGORY_INFO } from "../../../../types/categories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequestMakeGuess } from "../../../../types/requests";
import { QUERY_KEYS } from "../../../../utils/consts";
import CtxGuessData from "../../../../contexts/CtxGuessData";
import { useContext } from "react";
import { getUserSessionDataFromStorage } from "../../../../utils/methods";

interface IProps {
	categoriesInfoArr: T_CATEGORY_INFO[];
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
				return <GuessCell key={category.id} categoryInfo={category} />;
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
