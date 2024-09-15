import styles from "./GuessSpell.module.scss";
import SingleTextInput from "../GuessBox/children/GuessCell/children/SingleText/children/SingleTextInput/SingleTextInput";
import RecommendationBox from "../GuessBox/children/GuessCell/children/RecommendationBox/RecommendationBox";
import { useMemo, useState } from "react";
import GuessCount from "../GuessCount/GuessCount";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { LIMITS, QUERY_KEYS } from "../../../../utils/consts";
import { apiRequestMakeGuessSpell } from "../../../../utils/requests";
import { getUserSessionDataFromStorage } from "../../../../utils/methods";

interface IProps {
	spells: string[];
	pastSpellGuesses: number[];
	setShowingPostGame: React.Dispatch<React.SetStateAction<boolean>>;
}

const GuessSpell: React.FC<IProps> = (props) => {
	// setup submit button mutation
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: apiRequestMakeGuessSpell,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GAME_SESSION_INFO],
			});
		},
	});

	const [input, setInput] = useState<string>("");
	const [show, setShow] = useState<boolean>(false);

	const spellIdMap: Map<string, number> = useMemo(
		() => new Map(props.spells.map((spell, i) => [spell.toLowerCase(), i + 1])),
		[props.spells],
	);

	const hasValidInput = spellIdMap.has(input.toLowerCase());
	const spells = (
		spells: string[],
		idMap: Map<string, number>,
		pastGuesses: number[],
	): string[] => {
		const spellArr: string[] = [];

		spells.forEach((spell) => {
			const id = idMap.get(spell.toLowerCase());
			if (id !== undefined) {
				if (!pastGuesses.includes(id)) spellArr.push(spell);
			} else console.log(`error getting spells, spell ${spell} id not found`);
		});

		return spellArr.sort();
	};

	return (
		<div className={styles.root}>
			<GuessCount
				title="Spell Guesses"
				capacity={LIMITS.SPELL}
				numGuesses={props.pastSpellGuesses.length}
			/>
			{props.pastSpellGuesses.length > 0 && (
				<div className={styles.pastSpellGuesses}>
					{props.pastSpellGuesses.map((id, i) => (
						<span key={`spellPastGuess${i}`}>{props.spells[id - 1]}</span>
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
							values={spells(props.spells, spellIdMap, props.pastSpellGuesses)}
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
