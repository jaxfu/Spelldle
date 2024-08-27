import styles from "./ResultCategory.module.scss";
import {
	type T_GUESS_STATES_IDS,
	translateIdsToDisplay,
} from "../../../../../../../../types/guesses";
import {
	E_CATEGORY_COMPONENT_TYPE,
	type T_CATEGORY_INFO,
} from "../../../../../../../../types/categories";
import { useMemo, Fragment } from "react";
import { E_RESULT_OPTIONS } from "../../../../../../../../types/guesses";

export interface IProps {
	categoryInfo: T_CATEGORY_INFO;
	result: number;
	guess: T_GUESS_STATES_IDS;
	round: number;
}

const ResultCategory: React.FC<IProps> = (props) => {
	const colorClass: string = useMemo((): string => {
		switch (props.result) {
			case E_RESULT_OPTIONS.INCORRECT:
				return "red";
			case E_RESULT_OPTIONS.SLIGHTLY_CORRECT:
				return "orange";
			case E_RESULT_OPTIONS.CORRECT:
				return "green";
		}
		return "";
	}, [props.result]);

	return (
		<span className={styles.root} style={{ background: colorClass }}>
			{translateIdsToDisplay(props.guess, props.categoryInfo).map((value) => {
				return (
					<Fragment key={`${props.round}-${value}`}>
						<span>{value}</span>
						<br />
					</Fragment>
				);
			})}
		</span>
	);
};

export default ResultCategory;
