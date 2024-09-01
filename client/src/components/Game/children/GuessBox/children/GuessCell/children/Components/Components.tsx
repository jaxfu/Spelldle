import styles from "./Components.module.scss";
import CtxGuessData from "../../../../../../../../contexts/CtxGuessData";
import { useContext, useEffect, useRef, useState } from "react";
import { T_CATEGORY_INFO } from "../../../../../../../../types/categories";
import {
	T_GUESS_MAP_IDS,
	T_PAST_GUESS_CATEGORY,
} from "../../../../../../../../types/guesses";
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
				...(props.mostRecentGuess.value as number[]),
			];

			displayValuesFromMostRecentGuess.current.forEach((id) => {
				setCheckedStates((checkedStates) => {
					const current = [...checkedStates]
					current[id] = true
					return current
				})
			})
		}
	}, [props.mostRecentGuess])

	// update guess map on change
	useEffect(() => {
		const newArr: number[] = []
		checkedStates.forEach((bool, i) => bool && newArr.push(i))
		Locals.setGuessCategoriesMap(newArr.sort(), guessData, props.categoryInfo.id)
	}, [checkedStates])


	// set based on most recent guess
	// useEffect(() => {
	// 	if (Array.isArray(props.mostRecentGuess.value)) {
	// 		displayValuesFromMostRecentGuess.current = [
	// 			...(props.mostRecentGuess.value as number[]),
	// 		];

	// 		checkBoxRefs.current.forEach((checkBox) => {
	// 			if (
	// 				displayValuesFromMostRecentGuess.current.includes(
	// 					Number.parseInt(checkBox.name),
	// 				)
	// 			) {
	// 				checkBox.checked = true;
	// 			} else {
	// 				checkBox.checked = false;
	// 			}
	// 		});

	// 		Locals.setGuessCategoriesMap(
	// 			displayValuesFromMostRecentGuess.current,
	// 			guessData,
	// 			props.categoryInfo.id,
	// 		);
	// 	}
	// }, [props.mostRecentGuess]);

	return (
		<div className={styles.root}>
			{props.categoryInfo.values.map((value, i) => {
				return (
					<span
					key={value}
						className={checkedStates[i] ? styles.checked : styles.unchecked}
						onClick={() =>
							setCheckedStates((checkedStates) => {
								const current = [...checkedStates]
								current[i] = !current[i];
								return current;
							})
						}
					>
						<b>{value}</b>
					</span>
				);
			})}
			{/* {props.categoryInfo.values.map((value) => {
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
										Locals.updateGuessCategoriesMap(
											e.target.checked,
											valueId,
											guessData,
											props.categoryInfo.id,
										);

										if (
											props.showingRecentGuess &&
											!Locals.isCurrentEqualToRecentGuess(
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
				})} */}
		</div>
	);
};

export default Components;
