import Cell from "./children/Cell/Cell";
import styles from "./ResultCol.module.scss";
import { ICell } from "./children/Cell/Cell";

interface IProps {
	title: string;
	cells: ICell[];
	categoryID: string;
}

const ResultCol: React.FC<IProps> = (props) => {
	return (
		<div className={`${styles.root} ${props.categoryID} col`}>
			{props.cells.map((cell, i) => {
				return <Cell key={`${props.title}-${i}`} data={cell} />;
			})}
		</div>
	);
};

export default ResultCol;
