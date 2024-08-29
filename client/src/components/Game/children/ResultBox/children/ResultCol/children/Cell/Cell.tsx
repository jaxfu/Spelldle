import { E_RESULT_OPTIONS } from "../../../../../../../../types/guesses";
import styles from "./Cell.module.scss";
import { useEffect, useRef } from "react";

export interface ICell {
	content: string[];
	result: E_RESULT_OPTIONS;
	categoryID: string;
	round: number;
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
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		console.log(ref.current?.clientWidth);
	}, [ref]);

	return (
		<div
			className={`${styles.root} ${props.data.categoryID} ${props.data.round === 0 ? "header" : props.data.round.toString()}`}
			style={{ background: colorClass(props.data.result) }}
			ref={ref}
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
