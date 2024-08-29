import styles from "./SingleText.module.scss";
import TextInput from "./children/TextInput/TextInput";
import RecommendationBox from "../RecommendationBox/RecommendationBox";
import { useState, useMemo, useContext, useEffect, useRef } from "react";
import {
	E_CATEGORY_COMPONENT_TYPE,
	type T_CATEGORY_INFO,
} from "../../../../../../../../types/categories";
import CtxGuessData from "../../../../../../../../contexts/CtxGuessData";
import {
	type T_GUESS_MAP_IDS,
	type T_PAST_GUESS_CATEGORY,
	translateIdsToDisplay,
} from "../../../../../../../../types/guesses";

function updateGuessCategoriesMapSingleText(
	input: string,
	hasValidInput: boolean,
	categoryInfo: T_CATEGORY_INFO,
	guessData: React.MutableRefObject<T_GUESS_MAP_IDS> | null,
): void {
	if (guessData !== null) {
		if (hasValidInput) {
			const valueId = categoryInfo.value_id_map.get(input.toLowerCase());

			if (valueId !== undefined) {
				guessData.current.set(categoryInfo.id, valueId);
			}
		} else {
			guessData.current.set(categoryInfo.id, -1);
		}
	}
}

function updateGuessCategoriesMapLevelText(
	input: string,
	hasValidInput: boolean,
	categoryInfo: T_CATEGORY_INFO,
	guessData: React.MutableRefObject<T_GUESS_MAP_IDS> | null,
): void {
	if (guessData !== null) {
		const currentData = guessData.current.get(categoryInfo.id) as
			| number[]
			| undefined;

		if (currentData !== undefined) {
			if (hasValidInput) {
				const valueId = categoryInfo.value_id_map.get(input.toLowerCase());

				if (valueId !== undefined) {
					guessData.current.set(categoryInfo.id, [valueId, currentData[1]]);
				}
			} else {
				guessData.current.set(categoryInfo.id, [-1, currentData[1]]);
			}
		}
	}
}

interface IProps {
	categoryInfo: T_CATEGORY_INFO;
	mostRecentGuess: T_PAST_GUESS_CATEGORY;
	showingRecentGuess: boolean;
	setShowingRecentGuess: React.Dispatch<React.SetStateAction<boolean>>;
}

const SingleText: React.FC<IProps> = (props) => {
	const [input, setInput] = useState<string>("");
	const [show, setShow] = useState<boolean>(false);
	const displayValueFromMostRecentGuess = useRef<string>("");

	const guessData = useContext(CtxGuessData);

	const hasValidInput: boolean = useMemo(() => {
		return props.categoryInfo.value_id_map.has(input.toLowerCase());
	}, [input]);

	// set from most recent guess
	useEffect(() => {
		if (props.mostRecentGuess.result !== -1) {
			if (Number.isInteger(props.mostRecentGuess.value)) {
				displayValueFromMostRecentGuess.current = translateIdsToDisplay(
					props.mostRecentGuess.value,
					props.categoryInfo,
				)[0];
				setInput(displayValueFromMostRecentGuess.current);
			} else if (Array.isArray(props.mostRecentGuess.value)) {
				displayValueFromMostRecentGuess.current = translateIdsToDisplay(
					props.mostRecentGuess.value,
					props.categoryInfo,
				)[0] as string;
				setInput(displayValueFromMostRecentGuess.current);
			}
		}
	}, [props.mostRecentGuess]);

	// reset color if input changed from most recent guess
	useEffect(() => {
		if (
			props.showingRecentGuess &&
			input !== displayValueFromMostRecentGuess.current
		) {
			props.setShowingRecentGuess(false);
		}
	}, [input]);

	// update guessData map on valid input detection
	useEffect(() => {
		if (
			props.categoryInfo.component_type ===
			E_CATEGORY_COMPONENT_TYPE.SINGLE_TEXT
		) {
			updateGuessCategoriesMapSingleText(
				input,
				hasValidInput,
				props.categoryInfo,
				guessData,
			);
		} else if (
			props.categoryInfo.component_type === E_CATEGORY_COMPONENT_TYPE.LEVEL
		) {
			updateGuessCategoriesMapLevelText(
				input,
				hasValidInput,
				props.categoryInfo,
				guessData,
			);
		}
	}, [hasValidInput]);

	return (
		<>
			<TextInput
				input={input}
				setInput={setInput}
				show={show}
				setShow={setShow}
				validInput={hasValidInput}
			/>
			{show && (
				<RecommendationBox
					values={props.categoryInfo.values}
					input={input}
					setInput={setInput}
				/>
			)}
		</>
	);
};

export default SingleText;
