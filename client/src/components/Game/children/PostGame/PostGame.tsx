import styles from "./PostGame.module.scss";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../../utils/consts";
import type { T_GAME_SESSION } from "../../../../types/gameSession";

interface IProps {
	setShowingPostGame: React.Dispatch<React.SetStateAction<boolean>>;
	gameSessionInfo: T_GAME_SESSION;
}

const PostGame: React.FC<IProps> = (props) => {
	const queryClient = useQueryClient();

	return (
		<div className={styles.root}>
			<div className={styles.content}>
				<h2>PostGame</h2>
				<button
					onClick={() => {
						queryClient.invalidateQueries({
							queryKey: [QUERY_KEYS.GAME_SESSION_INFO],
						});
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
