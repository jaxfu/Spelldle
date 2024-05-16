import { useState } from "react";
import styles from "./MultiTurnCell.module.scss";
import { T_CATEGORY } from "../../../../../../types";
import { handleInput } from "../../../../../../utils/HandleInputs";
import * as methods from "../TurnCell/methods";

export interface IProps {
	category: T_CATEGORY;
}

const MultiTurnCell: React.FC<IProps> = (props) => {
	const [inputValue, setInputValue] = useState<string>("");
	const [recommendations, setRecommendations] = useState<string[]>([]);
	const [guesses, setGuesses] = useState<string[]>([]);

	function onAddGuessClick(
		setGuesses: React.Dispatch<React.SetStateAction<string[]>>,
		inputValue: string
	): void {
		setGuesses((guesses: string[]) => {
			const newArr = [...guesses];
			newArr.push(inputValue);
			return newArr;
		});
		setInputValue("");
	}

	function onRemoveGuessClick(
		setGuesses: React.Dispatch<React.SetStateAction<string[]>>,
		guess: string
	): void {
		setGuesses((guesses) => {
			return guesses.filter((g: string) => {
				return g.toLocaleLowerCase() !== guess.toLocaleLowerCase();
			});
		});
	}

	return (
		<div className={styles.root}>
			<h4>{props.category.name}</h4>
			{guesses.length == 0 ? null : (
				<div className={styles.guesses_root}>
					{guesses.map((guess) => {
						return (
							<div key={guess}>
								<h5>{guess}</h5>
								<button onClick={() => onRemoveGuessClick(setGuesses, guess)}>
									-
								</button>
							</div>
						);
					})}
				</div>
			)}
			<div className={styles.input_root}>
				<input
					type="text"
					name="inputText"
					value={inputValue}
					onChange={(e) => {
						handleInput(e, setInputValue);
						setRecommendations(methods.getRecommendations(e, props));
					}}
					onFocus={(e) =>
						setRecommendations(methods.getRecommendations(e, props))
					}
					onBlur={() => setRecommendations([])}
				/>
				<button onClick={() => onAddGuessClick(setGuesses, inputValue)}>
					+
				</button>
			</div>
			{recommendations.length == 0 ? null : (
				<div className={styles.recommend_root}>
					{recommendations.map((option) => {
						return (
							<div
								className={styles.cell}
								key={option.toString()}
								onClick={() => {
									methods.onRecommendationClick(
										option.toString(),
										setInputValue,
										setRecommendations
									);
								}}
								// Keep focus on text input
								onMouseDown={(e) => e.preventDefault()}
							>
								{option.toString()}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default MultiTurnCell;
