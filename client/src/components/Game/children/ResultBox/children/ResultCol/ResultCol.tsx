import styles from "./ResultCol.module.scss";
import Cell from "./children/Cell/Cell";
import { ICell } from "./children/Cell/Cell";
import { useEffect, useRef } from "react";

interface IProps {
	title: string;
	cells: ICell[];
	categoryID: string;
	colWidthsMap: Map<string, number>;
	setColWidthsMap: React.Dispatch<React.SetStateAction<Map<string, number>>>;
}

const ResultCol: React.FC<IProps> = (props) => {
	const ref: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

	// update colWidthsMap on load
	useEffect(() => {
		props.setColWidthsMap((colWidthsMap) => {
			let colWidth = colWidthsMap.get(props.categoryID);

			if (colWidth !== undefined) {
				if (ref.current) {
					colWidth = Math.max(colWidth, ref.current.clientWidth);
				}
				colWidthsMap.set(props.categoryID, colWidth);
			}

			return colWidthsMap;
		});
	}, [ref.current]);

	// update ref width on colWidthsMap change
	useEffect(() => {
		const colWidth = props.colWidthsMap.get(props.categoryID);

		if (colWidth !== undefined) {
			if (ref.current) {
				ref.current.style.width = `${colWidth}px`;
			}
		}
	}, [props.colWidthsMap]);

	return (
		<div className={`${styles.root} ${props.categoryID} col`} ref={ref}>
			{props.cells.map((cell, i) => {
				return <Cell key={`${props.title}-${i}`} {...cell} />;
			})}
		</div>
	);
};

export default ResultCol;
