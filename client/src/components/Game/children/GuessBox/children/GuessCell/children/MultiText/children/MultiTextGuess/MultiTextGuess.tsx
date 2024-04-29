import styles from "./MultiTextGuess.module.scss";
import { useState, useRef, useEffect } from "react";

interface IProps {
	guess: string;
	IRemoveFromGuesses: {
		removeFromGuesses(
			guess: string,
			setGuesses: React.Dispatch<React.SetStateAction<string[]>>,
			remainingReccomendations: React.MutableRefObject<string[]>,
		): void;
		setGuesses: React.Dispatch<React.SetStateAction<string[]>>;
		remainingReccomendations: React.MutableRefObject<string[]>;
	};
}

const MultiTextGuess: React.FC<IProps> = (props) => {
	const [content, setContent] = useState<string>(props.guess);
	const [contentWidth, setContentWidth] = useState<number>(0);
	const ref = useRef<HTMLDivElement>(null);

	// set contentWidth on load
	useEffect(() => {
		if (ref.current) {
			if (content === props.guess && contentWidth === 0) {
				setContentWidth(ref.current.offsetWidth);
			} else {
				ref.current.style.width = `${contentWidth}px`;
			}
		}
	}, [ref.current, content]);

	// set ref width to contentWidth on hover change
	useEffect(() => {
		if (ref.current && contentWidth !== 0) {
			ref.current.style.width = `${contentWidth}px`;
		}
	}, [contentWidth]);

	return (
		<div
			className={styles.root}
			onMouseLeave={() => setContent(props.guess)}
			onMouseOver={() => {
				setContent("-");
			}}
			onClick={() =>
				props.IRemoveFromGuesses.removeFromGuesses(
					props.guess,
					props.IRemoveFromGuesses.setGuesses,
					props.IRemoveFromGuesses.remainingReccomendations,
				)
			}
			ref={ref}
		>
			{content}
		</div>
	);
};

export default MultiTextGuess;
