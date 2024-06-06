import styles from "./GuessInfoButton.module.scss";
import { T_SPELL_INFO } from "../../../types";

interface IProps {
	allCurrentGuessInfo: React.MutableRefObject<T_SPELL_INFO>;
}

const GuessInfoButton: React.FC<IProps> = (props) => {
	return (
		<div
			className={styles.root}
			onClick={() => {
				console.log("CURRENT GUESS INFO: {");
				props.allCurrentGuessInfo.current.forEach((value: any, key: any) => {
					console.log(`${key}: ${value}`);
				});
				console.log("}");
			}}
		>
			<h1>GI</h1>
		</div>
	);
};

export default GuessInfoButton;
