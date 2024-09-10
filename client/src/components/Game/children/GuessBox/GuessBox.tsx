import styles from "./GuessBox.module.scss";
import { type T_CATEGORY_INFO } from "../../../../types/categories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequestMakeGuessCategory } from "../../../../utils/requests";
import { QUERY_KEYS, USER_ROLES } from "../../../../utils/consts";
import CtxGuessData from "../../../../contexts/CtxGuessData";
import { useContext, useEffect, useRef, useState } from "react";
import {
	deepCopyObject,
	getAuthStatus,
	getUserSessionDataFromStorage,
} from "../../../../utils/methods";
import {
	INIT_PAST_GUESS_CATEGORY,
	type T_PAST_GUESS_CATEGORY,
	type T_PAST_GUESS_CATEGORIES_MAP,
} from "../../../../types/guesses";
import GuessCell from "./children/GuessCell/GuessCell";
import Locals from "./Locals";
import GuessCount from "../GuessCount/GuessCount";
// TODO: remove
import devRequests from "../../../DEBUG/GuessInfoButton/devRequests";
import { HttpStatusCode } from "axios";
// END

interface IProps {
	categoriesInfoArr: T_CATEGORY_INFO[];
	mostRecentGuess: T_PAST_GUESS_CATEGORIES_MAP | null;
	numGuesses: { category: number; spell: number };
}

const GuessBox: React.FC<IProps> = (props) => {
	// TODO: remove
	const { data } = useQuery({
		queryKey: [QUERY_KEYS.USER_DATA],
		queryFn: getAuthStatus,
		retry: false,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
	});

	const nameRef = useRef<HTMLInputElement>(null);
	// END

	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: apiRequestMakeGuessCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GAME_SESSION_INFO],
			});
		},
	});

	const [triggerGuessDataChange, setTriggerGuessDataChange] =
		useState<boolean>(false);
	const [validForSubmission, setValidForSubmission] = useState<boolean>(false);
	const guessDataCtx = useContext(CtxGuessData);

	const nullPastGuessCategory: T_PAST_GUESS_CATEGORY = deepCopyObject(
		INIT_PAST_GUESS_CATEGORY,
	);

	// check for valid submission to render submit button
	useEffect(() => {
		//console.log("checking validForSubmission")
		if (guessDataCtx) {
			setValidForSubmission(
				Locals.checkForValidToSubmit(
					guessDataCtx.guessData,
					props.categoriesInfoArr,
				),
			);
		}
	}, [guessDataCtx?.guessData]);

	if (guessDataCtx)
		return (
			<div className={styles.root}>
				<div className={styles.session_info}>
					<GuessCount
						title={"Category Guesses"}
						capacity={5}
						numGuesses={props.numGuesses.category}
					/>
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
										setTriggerGuessDataChange={setTriggerGuessDataChange}
									/>
								);
						}
						return (
							<GuessCell
								key={category.id}
								categoryInfo={category}
								mostRecentGuess={nullPastGuessCategory}
								setTriggerGuessDataChange={setTriggerGuessDataChange}
							/>
						);
					})}
				</div>
				{validForSubmission && (
					<div className={styles.submit}>
						<button
							onClick={() => {
								if (guessDataCtx !== null) {
									mutation.mutate({
										accessToken: getUserSessionDataFromStorage().access_token,
										guessData: guessDataCtx.guessData,
									});
								}
							}}
						>
							Submit
						</button>
					</div>
				)}
				{/*TODO: remove */}
				{data?.user_data.role === USER_ROLES.ADMIN && (
					<>
						<button
							onClick={async () => {
								try {
									if (guessDataCtx && nameRef.current) {
										const paramObj = {
											accessToken: getUserSessionDataFromStorage().access_token,
											category_info: Object.fromEntries(guessDataCtx.guessData),
											name: nameRef.current.value,
										};
										console.log(paramObj);
										const res = await devRequests.addSpell(paramObj);
										if (res.status === HttpStatusCode.Ok)
											console.log("added spell");
										else console.log("unsuccessful, status " + res.status);
									}
								} catch (error) {
									console.log(error);
								}
							}}
						>
							Add Spell
						</button>
						<input
							type="text"
							placeholder="name"
							name="name"
							ref={nameRef}
							style={{ marginBottom: "50px" }}
						/>
					</>
				)}
				{/*END*/}
			</div>
		);
};

export default GuessBox;
