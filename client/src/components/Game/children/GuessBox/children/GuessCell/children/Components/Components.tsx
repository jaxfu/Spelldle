import styles from "./Components.module.scss";
import CtxGuessData from "../../../../../../../../contexts/CtxGuessData";
import { useContext, useEffect, useRef } from "react";
import { T_CATEGORY_INFO } from "../../../../../../../../types/categories";
import { T_PAST_GUESS_CATEGORY } from "../../../../../../../../types/guesses";

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

	function updateGuessCategoriesMap(checked: boolean, valueId: number) {
		if (guessData !== null) {
			const currentArr = guessData.current.get(props.categoryInfo.id);
			if (currentArr !== undefined) {
				let newArr = [...(currentArr as number[])];

				if (checked) {
					newArr.push(valueId);
				} else newArr = newArr.filter((comp) => comp !== valueId);

				guessData.current.set(props.categoryInfo.id, newArr.sort());
			}
		}
	}

	// set based on most recent guess
	useEffect(() => {
		if (Array.isArray(props.mostRecentGuess.value)) {
			const ids = [...(props.mostRecentGuess.value as number[])];
			checkBoxRefs.current.forEach((checkBox) => {
				if (ids.includes(Number.parseInt(checkBox.name))) {
					checkBox.checked = true;
				} else {
					checkBox.checked = false;
				}
			});

			ids.forEach((id) => {
				const el = checkBoxRefs.current.find((el) => el.id === id.toString());
				if (el) {
					el.checked = true;
					updateGuessCategoriesMap(true, id);
				}
			});
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
										updateGuessCategoriesMap(e.target.checked, valueId);
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
