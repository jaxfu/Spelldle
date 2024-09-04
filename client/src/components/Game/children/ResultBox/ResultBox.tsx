import { type T_PAST_GUESS_CATEGORIES } from "../../../../types/guesses";
import { type T_CATEGORY_INFO } from "../../../../types/categories";
import styles from "./ResultBox.module.scss";
import { useRef, useState, type MutableRefObject } from "react";
import Header from "./children/ResultCol/children/Header/Header";
import Locals from "./Locals";

export const CONSTS_RESULT = {
	ROUNDS: {
		ID: "round",
		DISPLAY: "Round",
	},
};

interface IProps {
	pastGuesses: T_PAST_GUESS_CATEGORIES[];
	categoriesInfoArr: T_CATEGORY_INFO[];
}

const ResultBox: React.FC<IProps> = (props) => {
	const mapKeys = Locals.generateMapKeys(
		CONSTS_RESULT.ROUNDS.ID,
		props.categoriesInfoArr,
	);
	const [colWidthsMap, setColWidthsMap] = useState<Map<string, number>>(
		new Map(mapKeys.map((key) => [key, 0])),
	);

	return (
		<div className={styles.root}>
			<div className={styles.headers}>
				{/* round header explicit because it is not in categoriesInfoArr */}
				<Header
					key={CONSTS_RESULT.ROUNDS.ID}
					categoryID={CONSTS_RESULT.ROUNDS.ID}
					title={CONSTS_RESULT.ROUNDS.DISPLAY}
					colWidthsMap={colWidthsMap}
					setColWidthsMap={setColWidthsMap}
				/>
				{props.categoriesInfoArr.map(({ id, display_name }, i) => (
					<Header
						key={id}
						categoryID={id}
						title={display_name}
						colWidthsMap={colWidthsMap}
						setColWidthsMap={setColWidthsMap}
					/>
				))}
			</div>
			<div className={styles.cols}>
				{Locals.generateCols(
					props.categoriesInfoArr,
					props.pastGuesses,
					colWidthsMap,
					setColWidthsMap,
				)}
			</div>
		</div>
	);
};

export default ResultBox;
