import styles from "./Components.module.scss";
import CtxGuessData from "../../../../../../../../contexts/CtxGuessData";
import { useContext, useEffect, useRef } from "react";
import { T_CATEGORY_INFO } from "../../../../../../../../types/categories";
import {
	T_GUESSES_AS_IDS,
	T_PAST_GUESS_CATEGORY,
} from "../../../../../../../../types/guesses";

function updateGuessCategoriesMap(
	checked: boolean,
	valueId: number,
	guessData: React.MutableRefObject<T_GUESSES_AS_IDS> | null,
	categoryId: string,
) {
	if (guessData !== null) {
		const currentArr = guessData.current.get(categoryId);
		if (currentArr !== undefined) {
			let newArr = [...(currentArr as number[])];

			if (checked) {
				newArr.push(valueId);
			} else newArr = newArr.filter((comp) => comp !== valueId);

			guessData.current.set(categoryId, newArr.sort());
		}
	}
}

function setGuessCategoriesMap(
	newArray: number[],
	guessData: React.MutableRefObject<T_GUESSES_AS_IDS> | null,
	categoryId: string,
) {
	if (guessData !== null) {
		const currentArr = guessData.current.get(categoryId);
		if (currentArr !== undefined) {
			guessData.current.set(categoryId, newArray.sort());
		}
	}
}

function isCurrentEqualToRecentGuess(
	current: number[],
	recent: number[],
): boolean {
	return current.sort().join() === recent.sort().join();
}

interface IProps {
	categoryInfo: T_CATEGORY_INFO;
	mostRecentGuess: T_PAST_GUESS_CATEGORY;
	showingRecentGuess: boolean;
	setShowingRecentGuess: React.Dispatch<React.SetStateAction<boolean>>;
}

const Components: React.FC<IProps> = (props) => {
	const guessData = useContext(CtxGuessData);
	const checkBoxRefs = useRef<HTMLInputElement[]>([]);
	const displayValuesFromMostRecentGuess = useRef<number[]>([]);

	// set based on most recent guess
	useEffect(() => {
		if (Array.isArray(props.mostRecentGuess.value)) {
			displayValuesFromMostRecentGuess.current = [
				...(props.mostRecentGuess.value as number[]),
			];

			checkBoxRefs.current.forEach((checkBox) => {
				if (
					displayValuesFromMostRecentGuess.current.includes(
						Number.parseInt(checkBox.name),
					)
				) {
					checkBox.checked = true;
				} else {
					checkBox.checked = false;
				}
			});

			setGuessCategoriesMap(
				displayValuesFromMostRecentGuess.current,
				guessData,
				props.categoryInfo.id,
			);
		}
	}, [props.mostRecentGuess]);

	return (
		<div className={styles.root}>
			<div className={styles.checkbox_root}>
				{props.categoryInfo.values.map((value) => {
					const lowerCase = value.toLowerCase();
					const valueId = props.categoryInfo.value_id_map.get(lowerCase);

					if (valueId !== undefined) {
						return (
							<span key={lowerCase}>
								<label htmlFor={lowerCase}>{value}</label>
								<input
									type="checkbox"
									name={valueId.toString()}
									id={lowerCase}
									onChange={(e) => {
										updateGuessCategoriesMap(
											e.target.checked,
											valueId,
											guessData,
											props.categoryInfo.id,
										);

										if (
											props.showingRecentGuess &&
											!isCurrentEqualToRecentGuess(
												checkBoxRefs.current
													.map((el) =>
														el.checked ? Number.parseInt(el.name) : null,
													)
													.filter((id) => id != null),
												displayValuesFromMostRecentGuess.current,
											)
										) {
											props.setShowingRecentGuess(false);
										}
									}}
									ref={(el) => {
										if (el) {
											checkBoxRefs.current.push(el);
										}
									}}
								/>
							</span>
						);
					}
				})}
			</div>
		</div>
	);
};

export default Components;
