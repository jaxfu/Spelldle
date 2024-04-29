import styles from "./GuessCount.module.scss";

interface IProps {
	title: string;
	capacity: number;
	numGuesses: number;
}

const GuessCount: React.FC<IProps> = (props) => {
	return (
		<div className={styles.root}>
			<div className={styles.title}>{props.title}</div>
			<div className={styles.guesses}>
				{Array.from({ length: props.capacity }, (_, i) => i).map((i) => {
					return (
						<div
							key={`${props.title}-${i}`}
							className={`${styles.guess} ${i < props.numGuesses && styles.filled}`}
						></div>
					);
				})}
			</div>
		</div>
	);
};

export default GuessCount;
