import styles from "./MultiTextGuess.module.scss";

interface IProps {
	content: string;
}

const MultiTextGuess: React.FC<IProps> = (props) => {
	return <div className={styles.root}>{props.content}</div>;
};

export default MultiTextGuess;
