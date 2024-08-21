import styles from "./ResultCategory.module.scss";
import {
	type T_GUESSES_AS_IDS,
	type T_GUESS_STATES_IDS_LEVEL,
} from "../../../../../../../../types/guesses";
import { E_CATEGORY_COMPONENT_TYPE } from "../../../../../../../../types/categories";
import { useMemo, Fragment } from "react";
import { E_RESULT_OPTIONS } from "../../../../../../../../types/guesses";

export interface IProps {
	display_name: string;
	id: string;
	guessAsIds: T_GUESSES_AS_IDS;
	result: number;
	categoryType: E_CATEGORY_COMPONENT_TYPE;
	values: string[];
	round: number;
}

const ResultCategory: React.FC<IProps> = (props) => {
	function translateValuesToStrings(): string[] {
		switch (props.categoryType) {
			case E_CATEGORY_COMPONENT_TYPE.SINGLE_TEXT:
				return [props.values[props.guessAsIds as unknown as number]];
			case E_CATEGORY_COMPONENT_TYPE.MULTI_TEXT:
			case E_CATEGORY_COMPONENT_TYPE.COMPONENTS:
				if (Array.isArray(props.guessAsIds)) {
					return props.guessAsIds.map((v: number) => {
						return props.values[v];
					});
				}
				break;
			case E_CATEGORY_COMPONENT_TYPE.LEVEL:
				const v = {
					...(props.guessAsIds as unknown as T_GUESS_STATES_IDS_LEVEL),
				};
				return [props.values[v.level], v.is_ritual.toString()];
		}
		return [];
	}

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
			{translateValuesToStrings().map((value) => {
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
