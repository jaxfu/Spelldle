import styles from "./SingleTextInput.module.scss";
import { FaCheck } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

interface IProps {
	input: string;
	setInput: React.Dispatch<React.SetStateAction<string>>;
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	validInput: boolean;
}

const SingleTextInput: React.FC<IProps> = (props) => {
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
			/>
			<span className={styles.icon}>
				{props.validInput ? (
					<FaCheck style={{ color: "lightseagreen" }} />
				) : (
					<FaCircleXmark style={{ color: "red" }} />
				)}
			</span>
		</div>
	);
};

export default SingleTextInput;
