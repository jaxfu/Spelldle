import GuessCell from "./children/GuessCell/GuessCell";
import styles from "./GuessBox.module.scss";
import { type T_GUESS_CATEGORIES } from "../../../../methods/guesses";
import { type T_CATEGORY_INFO } from "../../../../methods/categories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequestMakeGuess } from "../../../../methods/requests";
import { QUERY_KEYS } from "../../../../utils/consts";
import GuessDataContext from "../../../../Contexts/GuessDataContext";
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

	const guessData = useContext(GuessDataContext);

	const guessCells = (): JSX.Element[] => {
		const elements: JSX.Element[] = [];

		for (const category of props.categoriesInfoArr) {
			elements.push(<GuessCell key={category.name} categoryInfo={category} />);
		}

		return elements;
	};

	return (
		<div className={styles.root}>
			{guessCells()}
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
