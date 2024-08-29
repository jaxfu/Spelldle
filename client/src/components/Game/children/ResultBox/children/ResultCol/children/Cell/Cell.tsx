import { E_RESULT_OPTIONS } from "../../../../../../../../types/guesses";
import styles from "./Cell.module.scss";

export interface ICell {
	content: string[];
	result: E_RESULT_OPTIONS;
}

interface IProps {
	data: ICell;
}

const colorClass = (result: E_RESULT_OPTIONS) => {
	switch (result) {
		case E_RESULT_OPTIONS.INCORRECT:
			return "red";
		case E_RESULT_OPTIONS.SLIGHTLY_CORRECT:
			return "orange";
		case E_RESULT_OPTIONS.CORRECT:
			return "green";
		default:
			return "";
	}
};

const Cell: React.FC<IProps> = (props) => {
	return (
		<div
			className={styles.root}
			style={{ background: colorClass(props.data.result) }}
		>
			<div className={styles.content}>
				{props.data.content.map((str, i) => {
					//TODO: better key
					return <span key={`${str}-${i}`}>{str}</span>;
				})}
			</div>
		</div>
	);
};

export default Cell;
