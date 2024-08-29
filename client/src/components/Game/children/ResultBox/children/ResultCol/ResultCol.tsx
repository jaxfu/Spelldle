import Cell from "./children/Cell/Cell";
import styles from "./ResultCol.module.scss";
import { ICell } from "./children/Cell/Cell";
import { useEffect, useRef } from "react";
import type { IColWidths } from "../../ResultBox";

interface IProps {
	title: string;
	cells: ICell[];
	categoryID: string;
	colWidthsMap: Map<string, IColWidths>
	setColWidthsMap: React.Dispatch<React.SetStateAction<Map<string, IColWidths>>>
}

const ResultCol: React.FC<IProps> = (props) => {
	const ref: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

	useEffect(() => {
			props.setColWidthsMap((colWidthsMap) => {
				const colWidths = colWidthsMap.get(props.categoryID)

				if (colWidths !== undefined) {
					if (ref.current) {
						colWidths.col = ref.current.clientWidth;
					}
					colWidthsMap.set(props.categoryID, {...colWidths})
			}

				return colWidthsMap
			})
			console.log("useEffect")
	}, [ref.current])

	return (
		<div className={`${styles.root} ${props.categoryID} col`} ref={ref}>
			{props.cells.map((cell, i) => {
				return <Cell key={`${props.title}-${i}`} {...cell} />;
			})}
		</div>
	);
};

export default ResultCol;
