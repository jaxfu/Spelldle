import styles from "./Level.module.scss";
import { T_CATEGORY_INFO } from "../../../../../../../../types/categories";
import SingleText from "../SingleText/SingleText";
import CtxGuessData from "../../../../../../../../contexts/CtxGuessData";
import { useContext, useEffect, useRef, useState } from "react";
import {
	T_GUESS_STATES_IDS_LEVEL,
	T_GUESSES_AS_IDS,
	T_PAST_GUESS_CATEGORY,
} from "../../../../../../../../types/guesses";

function updateGuessCategoriesMapRitualToggle(
	checked: boolean,
	categoryId: string,
	guessData: React.MutableRefObject<T_GUESSES_AS_IDS> | null,
) {
	if (guessData !== null) {
		const currentData = guessData.current.get(
			categoryId,
		) as T_GUESS_STATES_IDS_LEVEL;

		if (currentData !== undefined) {
			guessData.current.set(categoryId, {
				level: currentData.level,
				is_ritual: checked,
			});
		}
	}
}

interface IProps {
	categoryInfo: T_CATEGORY_INFO;
	mostRecentGuess: T_PAST_GUESS_CATEGORY;
	showingRecentGuess: boolean;
	setShowingRecentGuess: React.Dispatch<React.SetStateAction<boolean>>;
}

const Level: React.FC<IProps> = (props) => {
	const guessData = useContext(CtxGuessData);
	const checkBoxValueFromMostRecentGuess = useRef<boolean>(false);
	const [checked, setChecked] = useState(false);

	// set from most recent guess
	useEffect(() => {
		const mostRecentGuessInfo = {
			...(props.mostRecentGuess.value as T_GUESS_STATES_IDS_LEVEL),
		};
		checkBoxValueFromMostRecentGuess.current = mostRecentGuessInfo.is_ritual;

		if (mostRecentGuessInfo.is_ritual) {
			setChecked(true);
			updateGuessCategoriesMapRitualToggle(
				true,
				props.categoryInfo.id,
				guessData,
			);
		} else {
			setChecked(false);
			updateGuessCategoriesMapRitualToggle(
				false,
				props.categoryInfo.id,
				guessData,
			);
		}
	}, [props.mostRecentGuess]);

	useEffect(() => {
		if (
			props.showingRecentGuess &&
			checkBoxValueFromMostRecentGuess.current !== checked
		) {
			console.log("running");
			props.setShowingRecentGuess(false);
		}
	}, [checked]);

	return (
		<div className={styles.root}>
			<SingleText {...props} />
			<div className={styles.toggle}>
				<label htmlFor="ritual_toggle">Ritual</label>
				<input
					type="checkbox"
					name="ritual_toggle"
					id="ritual_toggle"
					onChange={(e) => {
						setChecked(e.target.checked);
						updateGuessCategoriesMapRitualToggle(
							e.target.checked,
							props.categoryInfo.id,
							guessData,
						);
					}}
					checked={checked}
				/>
			</div>
		</div>
	);
};

export default Level;
