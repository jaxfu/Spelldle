import styles from "./MultiTextInput.module.scss";

interface IProps {
	input: string;
	setInput: React.Dispatch<React.SetStateAction<string>>;
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const MultiTextInput: React.FC<IProps> = (props) => {
	return (
		<span className={styles.root}>
			<input
				type="text"
				name="guess"
				value={props.input}
				onChange={(e) => props.setInput(e.target.value)}
				onClick={() => !props.show && props.setShow(true)}
				onBlur={() => props.show && props.setShow(false)}
				autoComplete="false"
			/>
			<button>+</button>
		</span>
	);
};

export default MultiTextInput;
