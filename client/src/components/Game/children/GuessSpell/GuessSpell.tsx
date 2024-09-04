import styles from "./GuessSpell.module.scss";
import SingleTextInput from "../GuessBox/children/GuessCell/children/SingleText/children/SingleTextInput/SingleTextInput";
import RecommendationBox from "../GuessBox/children/GuessCell/children/RecommendationBox/RecommendationBox";
import { useMemo, useState } from "react";
import GuessCount from "../GuessCount/GuessCount";

interface IProps {
	spells: string[];
	numGuesses: number;
}

const GuessSpell: React.FC<IProps> = (props) => {
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
	);
};

export default GuessSpell;
