import styles from "./TextInput.module.scss";
import { FaCheck } from "react-icons/fa";
import { IconContext } from "react-icons";

interface IProps {
	input: string;
	setInput: React.Dispatch<React.SetStateAction<string>>;
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	validInput: boolean;
}

const TextInput: React.FC<IProps> = (props) => {
	return (
		<div className={styles.root}>
			<input
				type="text"
				name="guess"
				value={props.input}
				onChange={(e) => props.setInput(e.target.value)}
				onClick={() => !props.show && props.setShow(true)}
				onBlur={() => props.show && props.setShow(false)}
				autoComplete="false"
				className={styles.input}
			/>
			{props.validInput && (
				<span className={styles.check}>
					<FaCheck />
				</span>
			)}
		</div>
	);
};

export default TextInput;
