import { useState } from "react";
import styles from "./MultiText.module.scss"
import MultiTextInput from "./children/MultiTextInput/MultiTextInput"
import RecommendationBox from "../RecommendationBox/RecommendationBox";
import { type T_CATEGORY_INFO } from "../../../../../../../../methods/categories";
import { type T_GUESS_CATEGORIES } from "../../../../../../../../methods/guesses";

interface IProps {
	categoryInfo: T_CATEGORY_INFO;
	allCurrentGuessInfo: React.MutableRefObject<T_GUESS_CATEGORIES>;
}

const MultiText: React.FC<IProps> = (props) => {
	const [input, setInput] = useState<string>("")
	const [show, setShow] = useState<boolean>(false)

	return (
		<div className={styles.root}>
		<MultiTextInput
						input={input}
						setInput={setInput}
						show={show}
						setShow={setShow}
					/>
					{show && (
						<RecommendationBox
							values={Array.from(props.categoryInfo.values_map.keys())}
							input={input}
							setInput={setInput}
						/>
					)}
					</div>
	)
}

export default MultiText