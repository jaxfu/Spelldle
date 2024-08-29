import type { E_CATEGORY_COMPONENT_TYPE } from "../../../../../../../../../../types/categories";
import type { E_RESULT_OPTIONS } from "../../../../../../../../../../types/guesses";
import styles from "./Cell.module.scss";

export interface ICell {
	content: string[];
	result: E_RESULT_OPTIONS;
}

interface IProps {
	data: ICell;
}

const Cell: React.FC<IProps> = (props) => {
	return <div className={styles.root}>{props.data.content}</div>;
};

export default Cell;
