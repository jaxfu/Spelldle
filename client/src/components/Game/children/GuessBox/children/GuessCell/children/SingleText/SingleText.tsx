import styles from "./SingleText.module.scss";
import SingleTextInput from "./children/SingleTextInput/SingleTextInput";
import RecommendationBox from "../RecommendationBox/RecommendationBox";
import { useState, useMemo, useContext, useEffect, useRef } from "react";
import {
	E_CATEGORY_COMPONENT_TYPE,
	type T_CATEGORY_INFO,
} from "../../../../../../../../types/categories";
import CtxGuessData from "../../../../../../../../contexts/CtxGuessData";
import {
	type T_GUESS_CATEGORIES_IDS_MAP,
	type T_PAST_GUESS_CATEGORY,
	translateIdsToDisplay,
} from "../../../../../../../../types/guesses";
import LevelTextInput from "../Level/children/LevelTextInput/LevelTextInput";
import Locals from "./Locals";

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
			Locals.updateGuessCategoriesMapSingleText(
				input,
				hasValidInput,
				props.categoryInfo,
				guessData,
			);
		} else if (
			props.categoryInfo.component_type === E_CATEGORY_COMPONENT_TYPE.LEVEL
		) {
			Locals.updateGuessCategoriesMapLevelText(
				input,
				hasValidInput,
				props.categoryInfo,
				guessData,
			);
		}
	}, [hasValidInput]);

	return (
		<div className={styles.root}>
			{props.categoryInfo.component_type ===
			E_CATEGORY_COMPONENT_TYPE.SINGLE_TEXT ? (
				<SingleTextInput
					input={input}
					setInput={setInput}
					show={show}
					setShow={setShow}
					validInput={hasValidInput}
				/>
			) : (
				<LevelTextInput
					input={input}
					setInput={setInput}
					show={show}
					setShow={setShow}
					validInput={hasValidInput}
				/>
			)}

			{show && (
				<RecommendationBox
					values={props.categoryInfo.values}
					input={input}
					setInput={setInput}
				/>
			)}
		</div>
	);
};

export default SingleText;
