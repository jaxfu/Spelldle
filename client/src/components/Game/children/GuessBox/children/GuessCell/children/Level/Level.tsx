import styles from "./Level.module.scss";
import { T_CATEGORY_INFO } from "../../../../../../../../methods/categories";
import SingleText from "../SingleText/SingleText";
import GuessDataContext from "../../../../../../../../Contexts/GuessDataContext";
import { useContext } from "react";
import { T_GUESS_CATEGORIES_LEVEL } from "../../../../../../../../methods/guesses";

interface IProps {
	categoryInfo: T_CATEGORY_INFO;
}

const Level: React.FC<IProps> = (props) => {
	const guessData = useContext(GuessDataContext);

	function updateGuessCategoriesMapRitualToggle(
		e: React.ChangeEvent<HTMLInputElement>,
	) {
		if (guessData !== null) {
			const currentData = guessData.current.get(
				props.categoryInfo.name,
			) as T_GUESS_CATEGORIES_LEVEL;

			if (currentData !== undefined) {
				guessData.current.set(props.categoryInfo.name, {
					level: currentData.level,
					is_ritual: e.target.checked,
				});
			}
		}
	}

	return (
		<div className={styles.root}>
			<SingleText {...props} />
			<div className={styles.toggle}>
				<label htmlFor="ritual_toggle">Ritual</label>
				<input
					type="checkbox"
					name="ritual_toggle"
					id="ritual_toggle"
					onChange={updateGuessCategoriesMapRitualToggle}
				/>
			</div>
		</div>
	);
};

export default Level;
