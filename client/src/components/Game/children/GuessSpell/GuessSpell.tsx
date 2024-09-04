import styles from "./GuessSpell.module.scss";
import SingleTextInput from "../GuessBox/children/GuessCell/children/SingleText/children/SingleTextInput/SingleTextInput";
import RecommendationBox from "../GuessBox/children/GuessCell/children/RecommendationBox/RecommendationBox";
import { useMemo, useState } from "react";
import GuessCount from "../GuessCount/GuessCount";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../../utils/consts";
import { apiRequestMakeGuessSpell } from "../../../../utils/requests";
import { getUserSessionDataFromStorage } from "../../../../utils/methods";

interface IProps {
	spells: string[];
	numGuesses: number;
}

const GuessSpell: React.FC<IProps> = (props) => {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: apiRequestMakeGuessSpell,
		onSuccess: (data) => {
			console.log(`CORRECT: ${data.data.correct}`);
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.gameSessionInfo] });
		},
	});

	const [input, setInput] = useState<string>("");
	const [show, setShow] = useState<boolean>(false);

	const spellSet = useMemo(
		() => new Set(props.spells.map((spell) => spell.toLowerCase())),
		[props.spells],
	);

	const hasValidInput = useMemo(
		() => spellSet.has(input.toLowerCase()),
		[input],
	);

	return (
		<div className={styles.root}>
			<GuessCount title="Guesses" capacity={3} numGuesses={props.numGuesses} />
			<div className={styles.cell}>
				<h3>Spell</h3>
				<div className={styles.input}>
					<SingleTextInput
						input={input}
						setInput={setInput}
						show={show}
						setShow={setShow}
						validInput={hasValidInput}
					/>
				</div>
				{show && (
					<RecommendationBox
						values={props.spells}
						input={input}
						setInput={setInput}
					/>
				)}
			</div>
			<button
				onClick={() =>
					mutation.mutate({
						accessToken: getUserSessionDataFromStorage().access_token,
						spell_id: 1,
					})
				}
			>
				Submit
			</button>
		</div>
	);
};

export default GuessSpell;
