import styles from "./SingleText.module.scss";

interface IProps {
	input: string;
	setInput: React.Dispatch<React.SetStateAction<string>>;
}

const SingleText: React.FC<IProps> = (props) => {
	return (
		<input
			type="text"
			name="guess"
			value={props.input}
			onChange={(e) => props.setInput(e.target.value)}
			className={styles.root}
		/>
	);
};

export default SingleText;
