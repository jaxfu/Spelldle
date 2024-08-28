import styles from "./Result.module.scss";
import { type T_PAST_GUESS } from "../../../../../../types/guesses";
import ResultCategory from "./children/ResultCategory/ResultCategory";
import { type T_CATEGORY_INFO } from "../../../../../../types/categories";

interface IProps {
	guess: T_PAST_GUESS;
	categoriesInfoArr: T_CATEGORY_INFO[];
	round: number;
}

const Result: React.FC<IProps> = (props) => {
	const categoryMap = new Map(Object.entries(props.guess));

	const resultCategories = props.categoriesInfoArr.map((categoryInfo) => {
		const pastGuessInfo = categoryMap.get(categoryInfo.id);

		if (pastGuessInfo !== undefined) {
			return (
				<ResultCategory
					key={`${props.round}-${categoryInfo.id}`}
					round={props.round}
					result={pastGuessInfo.result}
					guess={pastGuessInfo.value}
					categoryInfo={categoryInfo}
				/>
			);
		}
	});

	return (
		<div className={styles.root}>
			<span className={styles.round}>
				<b>{props.round}</b>
			</span>
			{resultCategories}
		</div>
	);
};

export default Result;
