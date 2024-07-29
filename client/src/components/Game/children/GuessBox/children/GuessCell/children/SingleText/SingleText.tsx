import styles from "./SingleText.module.scss";
import TextInput from "./children/TextInput/TextInput";
import RecommendationBox from "../RecommendationBox/RecommendationBox";
import { useState } from "react";
import { type T_CATEGORY_INFO } from "../../../../../../../../methods/categories";
import { type T_GUESS_CATEGORIES } from "../../../../../../../../methods/guesses";

interface IProps {
	categoryInfo: T_CATEGORY_INFO;
	allCurrentGuessInfo: React.MutableRefObject<T_GUESS_CATEGORIES>;
}

const SingleText: React.FC<IProps> = (props) => {
	const [input, setInput] = useState<string>("");
	const [show, setShow] = useState<boolean>(false);

	return (
		<>
			<TextInput
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
		</>
	);
};

export default SingleText;
