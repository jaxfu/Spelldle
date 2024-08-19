import { type T_PAST_GUESS } from "../../../../types/guesses";
import { type T_CATEGORY_INFO } from "../../../../types/categories";
import Result from "./children/Result/Result";
import styles from "./ResultBox.module.scss";

interface IProps {
	pastGuesses: T_PAST_GUESS[];
	categoriesInfoArr: T_CATEGORY_INFO[];
}

const ResultBox: React.FC<IProps> = (props) => {
	return (
		<div className={styles.root}>
			<div className={styles.row}>
				<span className={styles.round}>
					<b>Round</b>
				</span>

				{props.categoriesInfoArr.map((category) => {
					return (
						<span className={styles.cell} key={category.id}>
							<b>{category.display_name}</b>
						</span>
					);
				})}
			</div>
			{props.pastGuesses.map((guess, i) => {
				return (
					<Result
						guess={guess}
						key={i}
						round={i + 1}
						categoriesInfoArr={props.categoriesInfoArr}
					/>
				);
			})}
		</div>
	);
};

export default ResultBox;
