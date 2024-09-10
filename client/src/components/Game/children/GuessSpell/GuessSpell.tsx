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
	pastGuesses: number[];
	setShowingPostGame: React.Dispatch<React.SetStateAction<boolean>>;
}

const GuessSpell: React.FC<IProps> = (props) => {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: apiRequestMakeGuessSpell,
		onSuccess: (data) => {
			console.log(`CORRECT: ${data.data.correct}`);
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GAME_SESSION_INFO],
			});
			if (data.data.correct) {
				props.setShowingPostGame(true);
			}
		},
	});

	const [input, setInput] = useState<string>("");
	const [show, setShow] = useState<boolean>(false);

	const spellIdMap: Map<string, number> = useMemo(
		() => new Map(props.spells.map((spell, i) => [spell.toLowerCase(), i + 1])),
		[props.spells],
	);

	const hasValidInput = spellIdMap.has(input.toLowerCase());

	return (
		<div className={styles.root}>
			<GuessCount
				title="Guesses"
				capacity={3}
				numGuesses={props.pastGuesses.length}
			/>
			{props.spells.length > 0 && (
				<div className={styles.pastSpellGuesses}>
					{props.pastGuesses.map((id) => (
						<span>{props.spells[id - 1]}</span>
					))}
				</div>
			)}
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
					{show && (
						<RecommendationBox
							values={props.spells}
							input={input}
							setInput={setInput}
						/>
					)}
				</div>
			</div>
			{hasValidInput && (
				<button
					onClick={() => {
						const id = spellIdMap.get(input.toLowerCase());
						id &&
							mutation.mutate({
								accessToken: getUserSessionDataFromStorage().access_token,
								spell_id: id,
							});
					}}
				>
					Submit
				</button>
			)}
		</div>
	);
};

export default GuessSpell;
