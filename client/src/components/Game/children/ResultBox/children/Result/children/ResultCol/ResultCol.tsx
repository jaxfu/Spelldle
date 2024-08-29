import Cell from "./children/Cell/Cell";
import styles from "./ResultCol.module.scss";
import { ICell } from "./children/Cell/Cell";

interface IProps {
	title: string;
	cells: ICell[];
}

const ResultCol: React.FC<IProps> = (props) => {
	return (
		<div className={styles.root}>
			<Cell data={{content: [props.title], result: 0}}/>
			<Cell data={props.cells[0]} />
		</div>
	);
};

export default ResultCol;
