import styles from "./ResultCategory.module.scss";
import {
	T_GUESSES_AS_IDS,
	T_GUESS_CATEGORIES_LEVEL,
} from "../../../../../../../../types/guesses";
import { E_RESULT_OPTIONS } from "../../../../../../../../types/results";
import { E_CATEGORY_COMPONENT_TYPE } from "../../../../../../../../types/categories";
import { useMemo } from "react";

export interface IProps {
	name: string;
	value: T_GUESSES_AS_IDS;
	result: number;
	categoryType: E_CATEGORY_COMPONENT_TYPE;
	values: string[];
}

const ResultCategory: React.FC<IProps> = (props) => {
	function translateValuesToStrings(): string[] {
		switch (props.categoryType) {
			case E_CATEGORY_COMPONENT_TYPE.SINGLE_TEXT:
				return [props.values[props.value as number]];
			case E_CATEGORY_COMPONENT_TYPE.MULTI_TEXT:
			case E_CATEGORY_COMPONENT_TYPE.COMPONENTS:
				if (Array.isArray(props.value)) {
					return props.value.map((v) => {
						return props.values[v];
					});
				}
				break;
			case E_CATEGORY_COMPONENT_TYPE.LEVEL:
				const v = { ...(props.value as T_GUESS_CATEGORIES_LEVEL) };
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
					<>
						<span>{value}</span>
						<br />
					</>
				);
			})}
		</span>
	);
};

export default ResultCategory;
