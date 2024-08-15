import styles from "./GuessInfoButton.module.scss";
import { useContext } from "react";
import GuessDataContext from "../../../contexts/GuessDataContext";
import * as testGuesses from "./TEST_GUESSES";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequestMakeGuess } from "../../../types/requests";
import { QUERY_KEYS } from "../../../utils/consts";
import { getUserSessionDataFromStorage } from "../../../utils/methods";
import { type T_GUESSES_AS_IDS } from "../../../types/guesses";

const GuessInfoButton: React.FC = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: apiRequestMakeGuess,
		onSuccess: (data) => {
			console.log("SUCCESFUL MAKE_GUESS: " + data.data.toString());
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.pastGuesses] });
		},
	});

	const guessData = useContext(GuessDataContext);

	const testGuess: T_GUESSES_AS_IDS = new Map(
		Object.entries(testGuesses.TEST_GUESS_SOME_CORRECT),
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
