import { E_RESULT_OPTIONS } from "../../../../../../../../types/guesses";
import styles from "./Cell.module.scss";

export interface ICell {
	content: string[];
	result: E_RESULT_OPTIONS;
	categoryID: string;
	round: number;
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

const Cell: React.FC<ICell> = (props) => {
	return (
		<div
			className={`${styles.root} ${props.categoryID} ${props.round === 0 ? "header" : props.round.toString()}`}
			style={{ background: colorClass(props.result) }}
		>
			<div className={styles.content}>
				{props.content.map((str, i) => {
					return (
						<span key={`${props.categoryID}-${props.round}-${i}`}>{str}</span>
					);
				})}
			</div>
		</div>
	);
};

export default Cell;
