import styles from "./Level.module.scss";
import { T_CATEGORY_INFO } from "../../../../../../../../types/categories";
import SingleText from "../SingleText/SingleText";
import CtxGuessData from "../../../../../../../../contexts/CtxGuessData";
import { useContext, useEffect, useRef, useState } from "react";
import {
	T_GUESS_MAP_IDS,
	T_PAST_GUESS_CATEGORY,
} from "../../../../../../../../types/guesses";
import { FaCheck } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

function updateGuessCategoriesMapRitualToggle(
	checked: boolean,
	categoryId: string,
	guessData: React.MutableRefObject<T_GUESS_MAP_IDS> | null,
) {
	if (guessData !== null) {
		const currentData = guessData.current.get(categoryId) as number[];

		if (currentData !== undefined) {
			const newData = [currentData[0]];
			newData.push(checked ? 1 : 0);
			guessData.current.set(categoryId, newData);
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
		const mostRecentGuessInfo: number[] = props.mostRecentGuess
			.value as number[];
		checkBoxValueFromMostRecentGuess.current =
			mostRecentGuessInfo[1] == 1 ? true : false;

		if (mostRecentGuessInfo[1] == 1) {
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
			<div className={styles.ritual_toggle}>
				<button
					className={!checked ? styles.unchecked : ""}
					onClick={() => {
						setChecked((checked) => !checked);
						updateGuessCategoriesMapRitualToggle(
							!checked,
							props.categoryInfo.id,
							guessData,
						);
					}}
				>
					Ritual
				</button>
			</div>
		</div>
	);
};

export default Level;
