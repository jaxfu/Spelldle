import styles from "./ResultCategory.module.scss";
import { T_CATEGORY_GUESS_STATE_VALUES } from "../../../../../../../../methods/guesses";
import type { E_CATEGORY_COMPONENT_TYPE } from "../../../../../../../../methods/categories";

export interface IProps {
	name: string;
	value: T_CATEGORY_GUESS_STATE_VALUES;
	result: number;
	categoryType: E_CATEGORY_COMPONENT_TYPE;
}

const ResultCategory: React.FC<IProps> = (props) => {
	return (
		<div className={styles.root}>
			{props.name}: {props.result}
			<br />
			Value: {JSON.stringify(props.value)}
		</div>
	);
};

export default ResultCategory;
