import styles from "./Level.module.scss";
import { T_CATEGORY_INFO } from "../../../../../../../../types/categories";
import SingleText from "../SingleText/SingleText";
import CtxGuessData from "../../../../../../../../contexts/CtxGuessData";
import { useContext, useEffect, useRef } from "react";
import {
	T_GUESS_STATES_IDS_LEVEL,
	T_PAST_GUESS_CATEGORY,
} from "../../../../../../../../types/guesses";

interface IProps {
	categoryInfo: T_CATEGORY_INFO;
	mostRecentGuess: T_PAST_GUESS_CATEGORY;
}

const Level: React.FC<IProps> = (props) => {
	const guessData = useContext(CtxGuessData);
	const checkBoxRef = useRef<HTMLInputElement>(null);

	function updateGuessCategoriesMapRitualToggle(checked: boolean) {
		if (guessData !== null) {
			const currentData = guessData.current.get(
				props.categoryInfo.id,
			) as T_GUESS_STATES_IDS_LEVEL;

			if (currentData !== undefined) {
				guessData.current.set(props.categoryInfo.id, {
					level: currentData.level,
					is_ritual: checked,
				});
			}
		}
	}

	useEffect(() => {
		const levelInfo = props.mostRecentGuess.value as T_GUESS_STATES_IDS_LEVEL;
		if (levelInfo.is_ritual && checkBoxRef.current) {
			checkBoxRef.current.checked = true;
			updateGuessCategoriesMapRitualToggle(true);
		}
	}, [props.mostRecentGuess]);

	return (
		<div className={styles.root}>
			<SingleText {...props} />
			<div className={styles.toggle}>
				<label htmlFor="ritual_toggle">Ritual</label>
				<input
					type="checkbox"
					name="ritual_toggle"
					id="ritual_toggle"
					onChange={(e) =>
						updateGuessCategoriesMapRitualToggle(e.target.checked)
					}
					ref={checkBoxRef}
				/>
			</div>
		</div>
	);
};

export default Level;
