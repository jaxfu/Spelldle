import TextInput from "./children/TextInput/TextInput";
import RecommendationBox from "../RecommendationBox/RecommendationBox";
import { useState, useMemo, useContext, useEffect } from "react";
import {
	E_CATEGORY_COMPONENT_TYPE,
	type T_CATEGORY_INFO,
} from "../../../../../../../../types/categories";
import CtxGuessData from "../../../../../../../../contexts/CtxGuessData";
import {
	type T_GUESS_STATES_IDS_LEVEL,
	type T_GUESSES_AS_IDS,
	translateIdsToValues,
} from "../../../../../../../../types/guesses";
import CtxGuessCellsState, {
	I_CTX_GUESS_CELLS_STATE,
} from "../../../../../../../../contexts/CtxGuessCellsState";

function updateGuessCategoriesMapSingleText(
	input: string,
	hasValidInput: boolean,
	categoryInfo: T_CATEGORY_INFO,
	guessData: React.MutableRefObject<T_GUESSES_AS_IDS> | null,
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
	guessData: React.MutableRefObject<T_GUESSES_AS_IDS> | null,
): void {
	if (guessData !== null) {
		const currentData = guessData.current.get(
			categoryInfo.id,
		) as T_GUESS_STATES_IDS_LEVEL;

		if (hasValidInput) {
			const valueId = categoryInfo.value_id_map.get(input.toLowerCase());

			if (valueId !== undefined && currentData !== undefined) {
				guessData.current.set(categoryInfo.id, {
					level: valueId,
					is_ritual: currentData.is_ritual,
				});
			}
		} else {
			guessData.current.set(categoryInfo.id, {
				level: -1,
				is_ritual: currentData.is_ritual,
			});
		}
	}
}

interface IProps {
	categoryInfo: T_CATEGORY_INFO;
}

const SingleText: React.FC<IProps> = (props) => {
	const [input, setInput] = useState<string>("");
	const [show, setShow] = useState<boolean>(false);

	const guessData = useContext(CtxGuessData);
	const cellState = useContext(CtxGuessCellsState);

	const hasValidInput: boolean = useMemo(() => {
		return props.categoryInfo.value_id_map.has(input.toLowerCase());
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

	useEffect(() => {
		if (cellState !== null) {
			const info = cellState.state.get(props.categoryInfo.id);
			//console.log(info);
			if (info !== undefined) {
				setInput((input) => info.input.toString());
			}
		}
	}, [cellState]);

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
