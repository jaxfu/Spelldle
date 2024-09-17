import styles from "./PostGame.module.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../../utils/consts";
import type { T_GAME_SESSION } from "../../../../types/gameSession";
import {
	apiRequestGetCorrectSpellInfo,
	apiRequestSpawnNewGameSession,
} from "../../../../utils/requests";
import { getUserSessionDataFromStorage } from "../../../../utils/methods";
import type { T_CATEGORY_INFO } from "../../../../types/categories";
import SpellInfo from "../SpellInfo/SpellInfo";
import Popup from "../Popup/Popup";

interface IProps {
	setShowing: React.Dispatch<React.SetStateAction<boolean>>;
	gameSessionInfo: T_GAME_SESSION;
	categoryInfo: T_CATEGORY_INFO[];
}

const PostGame: React.FC<IProps> = (props) => {
	// fetch spell information
	const { data, error, isSuccess } = useQuery({
		queryKey: [QUERY_KEYS.CORRECT_SPELL_INFO],
		queryFn: () =>
			apiRequestGetCorrectSpellInfo(
				getUserSessionDataFromStorage().access_token,
			),
		retry: false,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
	});
	if (error) {
		console.log(`apiRequestGetCorrectSpellInfo error: ${error}`);
	}

	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: apiRequestSpawnNewGameSession,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GAME_SESSION_INFO],
			});
		},
	});

	if (isSuccess && data !== undefined) {
		return (
			<Popup>
				<div className={styles.content}>
					<h2
						className={
							props.gameSessionInfo.guesses.correct
								? styles.correct
								: styles.incorrect
						}
					>
						{props.gameSessionInfo.guesses.correct ? "Nice! :)" : "You lost :("}
					</h2>
					<span>Correct Spell: {data.name}</span>
					<div className={styles.guesses}>
						<SpellInfo spellInfo={data} categoryInfo={props.categoryInfo} />
					</div>
					<button
						onClick={() => {
							mutation.mutate(getUserSessionDataFromStorage().access_token);
							props.setShowing(false);
						}}
					>
						New Game
					</button>
				</div>
			</Popup>
		);
	}
};

export default PostGame;
