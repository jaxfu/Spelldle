import styles from "./GuessBox.module.scss";
import {
	E_CATEGORY_COMPONENT_TYPE,
	type T_CATEGORY_INFO,
} from "../../../../types/categories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequestMakeGuess } from "../../../../utils/requests";
import { QUERY_KEYS } from "../../../../utils/consts";
import CtxGuessData from "../../../../contexts/CtxGuessData";
import { useContext, useEffect, useMemo } from "react";
import {
	deepCopyObject,
	getUserSessionDataFromStorage,
} from "../../../../utils/methods";
import {
	INIT_PAST_GUESS_CATEGORY,
	type T_PAST_GUESS_CATEGORY,
	type T_PAST_GUESS_CATEGORIES_MAP,
	type T_GUESS_CATEGORIES_IDS_MAP,
} from "../../../../types/guesses";
import GuessCell from "./children/GuessCell/GuessCell";
import Locals from "./Locals";
import GuessCount from "./children/GuessCount/GuessCount";

function checkForValidToSubmit(
	guessData: React.MutableRefObject<T_GUESS_CATEGORIES_IDS_MAP> | null,
	categoriesInfoArr: T_CATEGORY_INFO[],
) {
	if (guessData !== null) {
		categoriesInfoArr.forEach(({ component_type, id }) => {
			const currentValue = guessData.current.get(id);
			if (currentValue !== undefined) {
				switch (component_type) {
					case E_CATEGORY_COMPONENT_TYPE.SINGLE_TEXT:
						if (currentValue === -1) return false;
						break;
					case E_CATEGORY_COMPONENT_TYPE.MULTI_TEXT:
					case E_CATEGORY_COMPONENT_TYPE.COMPONENTS:
						if (Array.isArray(currentValue) && currentValue.length === 0)
							return false;
						break;
					case E_CATEGORY_COMPONENT_TYPE.LEVEL:
						if (Array.isArray(currentValue) && currentValue[0] === -1)
							return false;
				}
			}
		});
	}

	return true;
}

interface IProps {
	categoriesInfoArr: T_CATEGORY_INFO[];
	mostRecentGuess: T_PAST_GUESS_CATEGORIES_MAP | null;
	numGuesses: { category: number; spell: number };
}

const GuessBox: React.FC<IProps> = (props) => {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: apiRequestMakeGuess,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.gameSessionInfo] });
		},
	});

	const guessData = useContext(CtxGuessData);

	const nullPastGuessCategory: T_PAST_GUESS_CATEGORY = useMemo(
		() => deepCopyObject(INIT_PAST_GUESS_CATEGORY),
		[],
	);

	useEffect(() => {
		if (guessData) {
			console.log("running");
		}
	}, [guessData?.current]);

	return (
		<div className={styles.root}>
			<div className={styles.session_info}>
				<GuessCount title={"Category Guesses"} capacity={5} numGuesses={props.numGuesses.category} />
				<GuessCount title={"Spell Guesses"} capacity={3} numGuesses={props.numGuesses.spell} />
			</div>
			<div className={styles.guess_cells}>
				{props.categoriesInfoArr.map((category) => {
					if (props.mostRecentGuess !== null) {
						const mostRecentGuess = props.mostRecentGuess.get(category.id);
						if (mostRecentGuess !== undefined)
							return (
								<GuessCell
									key={category.id}
									categoryInfo={category}
									mostRecentGuess={mostRecentGuess}
								/>
							);
					}
					return (
						<GuessCell
							key={category.id}
							categoryInfo={category}
							mostRecentGuess={nullPastGuessCategory}
						/>
					);
				})}
			</div>
			<div className={styles.submit}>
				<button
					onClick={() => {
						if (guessData !== null) {
							mutation.mutate({
								accessToken: getUserSessionDataFromStorage().access_token,
								guessData: guessData?.current,
							});
						}
					}}
				>
					Submit
				</button>
			</div>
		</div>
	);
};

export default GuessBox;
