import styles from "./ContentBox.module.scss";

interface IProps {
	children: React.ReactNode;
	showingPostGame: boolean;
	showingInfoPopup: boolean;
}

const ContentBox: React.FC<IProps> = (props) => {
	return (
		<div
			className={`${styles.root} ${props.showingPostGame || props.showingInfoPopup ? styles.showingPopup : ""}`}
		>
			<div className={styles.content}>
				{props.children}
				<div className={styles.spacer}></div>
			</div>
		</div>
	);
};

export default ContentBox;
