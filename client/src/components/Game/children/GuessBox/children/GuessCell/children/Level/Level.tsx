import styles from "./Level.module.scss";
import { T_CATEGORY_INFO } from "../../../../../../../../types/categories";
import SingleText from "../SingleText/SingleText";
import GuessDataContext from "../../../../../../../../contexts/GuessDataContext";
import { useContext } from "react";
import { T_GUESS_STATES_IDS_LEVEL } from "../../../../../../../../types/guesses";

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
				props.categoryInfo.id,
			) as T_GUESS_STATES_IDS_LEVEL;

			if (currentData !== undefined) {
				guessData.current.set(props.categoryInfo.id, {
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
