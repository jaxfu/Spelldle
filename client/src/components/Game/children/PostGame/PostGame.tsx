import styles from "./PostGame.module.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../../utils/consts";
import type { T_GAME_SESSION } from "../../../../types/gameSession";
import { apiRequestSpawnNewGameSession } from "../../../../utils/requests";
import { getUserSessionDataFromStorage } from "../../../../utils/methods";

interface IProps {
	setShowingPostGame: React.Dispatch<React.SetStateAction<boolean>>;
	gameSessionInfo: T_GAME_SESSION;
}

const PostGame: React.FC<IProps> = (props) => {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: apiRequestSpawnNewGameSession,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GAME_SESSION_INFO],
			});
		},
	});

	return (
		<div className={styles.root}>
			<div className={styles.content}>
				<h2>PostGame</h2>
				<button
					onClick={() => {
						mutation.mutate(getUserSessionDataFromStorage().access_token);
						props.setShowingPostGame(false);
					}}
				>
					New Game
				</button>
			</div>
		</div>
	);
};

export default PostGame;
