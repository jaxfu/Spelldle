import styles from "./GuessInfoButton.module.scss";
import { type T_GUESS_CATEGORIES } from "../../../methods/guesses";
import { createRequestObjectFromCurrentGuessInfo } from "../../../utils/methods";
import { type T_CATEGORY_INFO } from "../../../methods/categories";

interface IProps {
	allCurrentGuessInfo: T_GUESS_CATEGORIES;
	categoryInfo: T_CATEGORY_INFO[];
}

const GuessInfoButton: React.FC<IProps> = (props) => {
	return (
		<div
			className={styles.root}
			onClick={() => {
				console.log("CURRENT GUESSINFO: {");
				props.allCurrentGuessInfo.forEach((value: any, key: any) => {
					console.log(`${key}: ${value}`);
				});
				console.log("}");

				createRequestObjectFromCurrentGuessInfo(
					props.allCurrentGuessInfo,
					props.categoryInfo,
				);
			}}
		>
			<h1>GI</h1>
		</div>
	);
};

export default GuessInfoButton;
