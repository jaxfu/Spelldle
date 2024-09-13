import styles from "./Popup.module.scss";
interface IProps {
	children: React.ReactNode;
}

const Popup: React.FC<IProps> = (props) => {
	return <div className={styles.root}>{props.children}</div>;
};

export default Popup;
