import styles from "./Header.module.scss";
import { IColWidths } from "../../../../ResultBox";
import { useEffect, useRef } from "react";

interface IProps {
	title: string;
	categoryID: string;
	colWidthsMap: Map<string, IColWidths>;
	setColWidthsMap: React.Dispatch<
		React.SetStateAction<Map<string, IColWidths>>
	>;
}

const Header: React.FC<IProps> = (props) => {
	const ref: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

	// update colWidthsMap on load
	useEffect(() => {
		props.setColWidthsMap((colWidthsMap) => {
			const colWidths = colWidthsMap.get(props.categoryID);

			if (colWidths !== undefined) {
				if (ref.current) {
					colWidths.header = ref.current.clientWidth;
				}
				colWidthsMap.set(props.categoryID, { ...colWidths });
			}

			return colWidthsMap;
		});
	}, [ref.current]);

	// update ref width on colWidthsMap change
	useEffect(() => {
		const colWidths = props.colWidthsMap.get(props.categoryID);

		if (colWidths !== undefined) {
			if (ref.current) {
				ref.current.style.width = `${Math.max(colWidths.col, colWidths.header)}px`;
				if (props.categoryID === "components") {
					console.log(`${colWidths.col} vs ${colWidths.header}`)
					console.log(`${Math.max(colWidths.col, colWidths.header)}`)
				}
			}
		}
	}, [props.colWidthsMap]);

	return (
		<div className={`${styles.root} ${props.categoryID} header`} ref={ref}>
			{props.title}
		</div>
	);
};

export default Header;
