import Cell from "./children/Cell/Cell";
import styles from "./ResultCol.module.scss";
import { ICell } from "./children/Cell/Cell";
import { E_RESULT_OPTIONS } from "../../../../../../../../types/guesses";

interface IProps {
	title: string;
	cells: ICell[];
}

const ResultCol: React.FC<IProps> = (props) => {
	return (
		<div className={styles.root}>
			<Cell
				data={{
					content: [props.title],
					result: E_RESULT_OPTIONS.UNINITIALIZED,
				}}
			/>
			{props.cells.map((cell) => {
				return <Cell data={cell} />;
			})}
		</div>
	);
};

export default ResultCol;
