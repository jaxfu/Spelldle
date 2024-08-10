import { T_GUESS_AND_RESULT } from "../../../../methods/guesses";
import Result from "./children/Result/Result";
import styles from "./ResultBox.module.scss";

interface IProps {
	pastGuesses: T_GUESS_AND_RESULT[];
}

const ResultBox: React.FC<IProps> = (props) => {
	return (
		<div className={styles.root}>
			{props.pastGuesses.map((guess) => {
				return <Result guess={guess} key={guess.round} />;
			})}
		</div>
	);
};

export default ResultBox;
