import { useState } from "react";
import styles from "./ContentBox.module.scss";

interface IProps {
	children: React.ReactNode;
	showingPostGame: boolean;
}

const ContentBox: React.FC<IProps> = (props) => {
	return (
		<div
			className={`${styles.root} ${props.showingPostGame ? styles.showingPostGame : ""}`}
		>
			<div className={styles.content}>{props.children}</div>
		</div>
	);
};

export default ContentBox;
