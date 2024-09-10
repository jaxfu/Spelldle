import styles from "./SingleTextWithToggle.module.scss";
import { T_CATEGORY_INFO } from "../../../../../../../../types/categories";
import SingleText from "../SingleText/SingleText";
import CtxGuessData from "../../../../../../../../contexts/CtxGuessData";
import { useContext, useEffect, useRef, useState } from "react";
import {
	E_GUESS_CATEGORY_RESULTS,
	T_PAST_GUESS_CATEGORY,
} from "../../../../../../../../types/guesses";
import { FaCheck } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import Locals from "./Locals";

interface IProps {
	categoryInfo: T_CATEGORY_INFO;
	mostRecentGuess: T_PAST_GUESS_CATEGORY;
	showingRecentGuess: boolean;
	setShowingRecentGuess: React.Dispatch<React.SetStateAction<boolean>>;
	setTriggerGuessDataChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const SingleTextWithToggle: React.FC<IProps> = (props) => {
	const guessData = useContext(CtxGuessData);
	const checkBoxValueFromMostRecentGuess = useRef<boolean>(false);
	const [checked, setChecked] = useState(false);

	// set from most recent guess
	useEffect(() => {
		if (
			props.mostRecentGuess.result !== E_GUESS_CATEGORY_RESULTS.UNINITIALIZED
		) {
			const mostRecentGuessInfo: number[] = props.mostRecentGuess
				.value as number[];
			checkBoxValueFromMostRecentGuess.current =
				mostRecentGuessInfo[1] == 1 ? true : false;

			if (mostRecentGuessInfo[1] == 1) {
				setChecked(true);
			} else {
				setChecked(false);
			}
		}
	}, [props.mostRecentGuess]);

	// change showingRecentGuess on first change
	useEffect(() => {
		if (
			props.showingRecentGuess &&
			checkBoxValueFromMostRecentGuess.current !== checked
		) {
			props.setShowingRecentGuess(false);
		}
	}, [checked]);

	// update guess map on checked change
	useEffect(() => {
		if (checked) {
			Locals.updateGuessCategoriesMapToggle(
				true,
				props.categoryInfo.id,
				guessData,
				props.setTriggerGuessDataChange,
			);
		} else {
			Locals.updateGuessCategoriesMapToggle(
				false,
				props.categoryInfo.id,
				guessData,
				props.setTriggerGuessDataChange,
			);
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
						Locals.updateGuessCategoriesMapToggle(
							!checked,
							props.categoryInfo.id,
							guessData,
							props.setTriggerGuessDataChange,
						);
					}}
				>
					{props.categoryInfo.id == "level" ? "Ritual:" : "Conc:"}
					{checked ? (
						<FaCheck className={styles.icon} />
					) : (
						<FaCircleXmark className={`${styles.icon} ${styles.unchecked}`} />
					)}
				</button>
			</div>
		</div>
	);
};

export default SingleTextWithToggle;
