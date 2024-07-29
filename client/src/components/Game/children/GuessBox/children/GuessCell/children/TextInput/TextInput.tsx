import styles from "./TextInput.module.scss";

interface IProps {
	input: string;
	setInput: React.Dispatch<React.SetStateAction<string>>;
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const TextInput: React.FC<IProps> = (props) => {
	return (
		<input
			type="text"
			name="guess"
			value={props.input}
			onChange={(e) => props.setInput(e.target.value)}
			onClick={() => !props.show && props.setShow(true)}
			onBlur={() => props.show && props.setShow(false)}
			autoComplete="false"
			className={styles.root}
		/>
	);
};

export default TextInput;
