import styles from "./MultiTextGuess.module.scss";
import { useState, useRef, useEffect } from "react";

interface IProps {
	content: string;
}

const MultiTextGuess: React.FC<IProps> = (props) => {
	const [content, setContent] = useState<string>(props.content);
	const [contentWidth, setContentWidth] = useState<number>(0);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current) {
			if (content === props.content && contentWidth === 0) {
				setContentWidth(ref.current.offsetWidth);
			} else {
				ref.current.style.width = `${contentWidth}px`;
			}
		}
	}, [ref.current, content]);

	useEffect(() => {
		if (ref.current && contentWidth !== 0) {
			ref.current.style.width = `${contentWidth}px`;
		}
	}, [contentWidth])

	return (
		<div
			className={styles.root}
			onMouseLeave={() => setContent(props.content)}
			onMouseOver={() => {
				setContent("-");
			}}
			ref={ref}
		>
			{content}
		</div>
	);
};

export default MultiTextGuess;
