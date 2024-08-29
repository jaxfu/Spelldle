import Cell from "./children/Cell/Cell";
import styles from "./ResultCol.module.scss";
import { ICell } from "./children/Cell/Cell";
import { CONSTS_RESULT } from "../../ResultBox";

interface IProps {
	title: string;
	cells: ICell[];
}

const ResultCol: React.FC<IProps> = (props) => {
	const id =
		props.title.toLowerCase() === CONSTS_RESULT.ROUNDS.ID
			? CONSTS_RESULT.ROUNDS.ID
			: "";

	return (
		<div className={styles.root} id={id}>
			{props.cells.map((cell, i) => {
				return <Cell key={`${props.title}-${i}`} data={cell} />;
			})}
		</div>
	);
};

export default ResultCol;
