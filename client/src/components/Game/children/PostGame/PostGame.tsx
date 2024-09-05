import styles from "./PostGame.module.scss";

const PostGame: React.FC = () => {
	return (
		<div className={styles.root}>
			<div className={styles.content}>
				<h2>PostGame</h2>
				<button>New Game</button>
			</div>
		</div>
	);
};

export default PostGame;
