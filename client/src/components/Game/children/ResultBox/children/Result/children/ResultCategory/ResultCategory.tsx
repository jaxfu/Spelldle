import styles from "./ResultCategory.module.scss";
import {
	T_CATEGORY_GUESS_STATE_VALUES,
	type T_CATEGORY_GUESS_STATE,
	type T_GUESS_CATEGORIES,
} from "../../../../../../../../methods/guesses";
import { E_CATEGORY_COMPONENT_TYPE } from "../../../../../../../../methods/categories";

export interface IProps {
	name: string;
	value: T_CATEGORY_GUESS_STATE_VALUES;
	result: number;
	categoryType: E_CATEGORY_COMPONENT_TYPE;
	values: string[];
}

const ResultCategory: React.FC<IProps> = (props) => {
	function translateValuesToStrings(): T_CATEGORY_GUESS_STATE {
		switch (props.categoryType) {
			case E_CATEGORY_COMPONENT_TYPE.SINGLE_TEXT:
				return props.values[props.value as number];
			case E_CATEGORY_COMPONENT_TYPE.MULTI_TEXT:
			case E_CATEGORY_COMPONENT_TYPE.COMPONENTS:
				if (Array.isArray(props.value)) {
					return props.value.map((v) => {
						return props.values[v];
					});
				}
				break;
			case E_CATEGORY_COMPONENT_TYPE.LEVEL:
				break;
			default:
				return "";
		}
		return "";
	}

	return (
		<div className={styles.root}>
			{props.name}: {props.result}
			<br />
			Value: {translateValuesToStrings()}
		</div>
	);
};

export default ResultCategory;
