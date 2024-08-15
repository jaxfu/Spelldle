import TextInput from "./children/TextInput/TextInput";
import RecommendationBox from "../RecommendationBox/RecommendationBox";
import { useState, useMemo, useContext, useEffect } from "react";
import {
	E_CATEGORY_COMPONENT_TYPE,
	type T_CATEGORY_INFO,
} from "../../../../../../../../methods/categories";
import GuessDataContext from "../../../../../../../../Contexts/GuessDataContext";
import { T_GUESS_CATEGORIES_LEVEL } from "../../../../../../../../methods/guesses";

interface IProps {
	categoryInfo: T_CATEGORY_INFO;
}

const SingleText: React.FC<IProps> = (props) => {
	const [input, setInput] = useState<string>("");
	const [show, setShow] = useState<boolean>(false);

	const guessData = useContext(GuessDataContext);

	const hasValidInput: boolean = useMemo(() => {
		return props.categoryInfo.value_id_map.has(input.toLowerCase());
	}, [input]);

	function updateGuessCategoriesMapSingleText(hasValidInput: boolean): void {
		if (guessData !== null) {
			if (hasValidInput) {
				const valueId = props.categoryInfo.value_id_map.get(input.toLowerCase());

				if (valueId !== undefined) {
					guessData.current.set(props.categoryInfo.name, valueId);
				}
			} else {
				guessData.current.set(props.categoryInfo.name, -1);
			}
		}
	}

	function updateGuessCategoriesMapLevelText(hasValidInput: boolean): void {
		if (guessData !== null) {
			const currentData = guessData.current.get(
				props.categoryInfo.name,
			) as T_GUESS_CATEGORIES_LEVEL;

			if (hasValidInput) {
				const valueId = props.categoryInfo.value_id_map.get(input.toLowerCase());

				if (valueId !== undefined && currentData !== undefined) {
					guessData.current.set(props.categoryInfo.name, {
						level: valueId,
						is_ritual: currentData.is_ritual,
					});
				}
			} else {
				guessData.current.set(props.categoryInfo.name, {
					level: -1,
					is_ritual: currentData.is_ritual,
				});
			}
		}
	}

	useEffect(() => {
		if (
			props.categoryInfo.component_type ===
			E_CATEGORY_COMPONENT_TYPE.SINGLE_TEXT
		) {
			updateGuessCategoriesMapSingleText(hasValidInput);
		} else if (
			props.categoryInfo.component_type === E_CATEGORY_COMPONENT_TYPE.LEVEL
		) {
			updateGuessCategoriesMapLevelText(hasValidInput);
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
