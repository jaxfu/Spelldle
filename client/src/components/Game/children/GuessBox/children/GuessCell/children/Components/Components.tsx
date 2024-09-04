import styles from "./Components.module.scss";
import CtxGuessData from "../../../../../../../../contexts/CtxGuessData";
import { useContext, useEffect, useRef, useState } from "react";
import { T_CATEGORY_INFO } from "../../../../../../../../types/categories";
import { T_PAST_GUESS_CATEGORY } from "../../../../../../../../types/guesses";
import Locals from "./Locals";

interface IProps {
	categoryInfo: T_CATEGORY_INFO;
	mostRecentGuess: T_PAST_GUESS_CATEGORY;
	showingRecentGuess: boolean;
	setShowingRecentGuess: React.Dispatch<React.SetStateAction<boolean>>;
}

const Components: React.FC<IProps> = (props) => {
	const guessData = useContext(CtxGuessData);
	const displayValuesFromMostRecentGuess = useRef<number[]>([]);
	const [checkedStates, setCheckedStates] = useState<boolean[]>(
		props.categoryInfo.values.map((value) => false),
	);

	// set based on most recent guess
	useEffect(() => {
		if (Array.isArray(props.mostRecentGuess.value)) {
			displayValuesFromMostRecentGuess.current = [
				...(props.mostRecentGuess.value as number[]).sort(),
			];

			displayValuesFromMostRecentGuess.current.forEach((id) => {
				setCheckedStates((checkedStates) => {
					const current = [...checkedStates];
					current[id] = true;
					return current;
				});
			});
		}
	}, [props.mostRecentGuess]);

	// update guess map on change &&
	// unset showingRecentGuess on first change
	useEffect(() => {
		const newArr: number[] = [];
		checkedStates.forEach((bool, i) => bool && newArr.push(i));
		Locals.setGuessCategoriesMap(
			newArr.sort(),
			guessData,
			props.categoryInfo.id,
		);
		if (
			props.showingRecentGuess &&
			newArr.sort().join() !==
				displayValuesFromMostRecentGuess.current.sort().join()
		) {
			props.setShowingRecentGuess(false);
		}
	}, [checkedStates]);

	return (
		<div className={styles.root}>
			{props.categoryInfo.values.map((value, i) => {
				return (
					<span
						key={value}
						className={checkedStates[i] ? styles.checked : styles.unchecked}
						onClick={() =>
							setCheckedStates((checkedStates) => {
								const current = [...checkedStates];
								current[i] = !current[i];
								return current;
							})
						}
					>
						<b>{value}</b>
					</span>
				);
			})}
		</div>
	);
};

export default Components;
