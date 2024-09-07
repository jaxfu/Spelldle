import styles from "./GuessInfoButton.module.scss";
import { useContext } from "react";
import CtxGuessData from "../../../contexts/CtxGuessData";
import * as testGuesses from "./TEST_GUESSES";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequestMakeGuessCategory } from "../../../utils/requests";
import { QUERY_KEYS } from "../../../utils/consts";
import { getUserSessionDataFromStorage } from "../../../utils/methods";
import { type T_GUESS_CATEGORIES_IDS_MAP } from "../../../types/guesses";

const GuessInfoButton: React.FC = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: apiRequestMakeGuessCategory,
		onSuccess: (data) => {
			console.log("SUCCESFUL MAKE_GUESS: " + data.data.toString());
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GAME_SESSION_INFO] });
		},
	});

	const guessData = useContext(CtxGuessData);

	const testGuess: T_GUESS_CATEGORIES_IDS_MAP = new Map(
		Object.entries(testGuesses.TEST_GUESS_INCORRECT),
	);

	return (
		<div className={styles.root}>
			<button
				onClick={() => {
					console.log("CURRENT GUESSINFO: ");
					guessData && console.log(guessData?.current);
				}}
			>
				Log
			</button>
			<button
				onClick={() => {
					mutation.mutate({
						accessToken: getUserSessionDataFromStorage().access_token,
						guessData: testGuess,
					});
				}}
			>
				Guess
			</button>
		</div>
	);
};

export default GuessInfoButton;
