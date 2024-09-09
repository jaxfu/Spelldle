import styles from "./GuessCell.module.scss";
import {
	type T_CATEGORY_INFO,
	E_CATEGORY_COMPONENT_TYPE,
} from "../../../../../../types/categories";
import SingleText from "./children/SingleText/SingleText";
import MultiText from "./children/MultiText/MultiText";
import Components from "./children/Components/Components";
import Level from "./children/Level/Level";
import {
	E_GUESS_CATEGORY_RESULTS,
	type T_PAST_GUESS_CATEGORY,
} from "../../../../../../types/guesses";
import { useEffect, useState } from "react";

function getColor(result: E_GUESS_CATEGORY_RESULTS): string {
	switch (result) {
		case E_GUESS_CATEGORY_RESULTS.INCORRECT:
			return "red";
		case E_GUESS_CATEGORY_RESULTS.SLIGHTLY_CORRECT:
			return "orange";
		case E_GUESS_CATEGORY_RESULTS.CORRECT:
			return "green";
		default:
			return "";
	}
}

interface IProps {
	categoryInfo: T_CATEGORY_INFO;
	mostRecentGuess: T_PAST_GUESS_CATEGORY;
	setTriggerGuessDataChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const GuessCell: React.FC<IProps> = (props) => {
	const [showingRecentGuess, setShowingRecentGuess] = useState<boolean>(false);
	const [color, setColor] = useState<string>("");

	const component = (type: E_CATEGORY_COMPONENT_TYPE): JSX.Element => {
		switch (type) {
			case E_CATEGORY_COMPONENT_TYPE.SINGLE_TEXT:
				return (
					<SingleText
						{...props}
						showingRecentGuess={showingRecentGuess}
						setShowingRecentGuess={setShowingRecentGuess}
					/>
				);
			case E_CATEGORY_COMPONENT_TYPE.MULTI_TEXT:
				return (
					<MultiText
						{...props}
						showingRecentGuess={showingRecentGuess}
						setShowingRecentGuess={setShowingRecentGuess}
					/>
				);
			case E_CATEGORY_COMPONENT_TYPE.COMPONENTS:
				return (
					<Components
						{...props}
						showingRecentGuess={showingRecentGuess}
						setShowingRecentGuess={setShowingRecentGuess}
					/>
				);
			case E_CATEGORY_COMPONENT_TYPE.SINGLE_TEXT_WITH_TOGGLE:
				return (
					<Level
						{...props}
						showingRecentGuess={showingRecentGuess}
						setShowingRecentGuess={setShowingRecentGuess}
					/>
				);
		}
	};

	useEffect(() => {
		if (props.mostRecentGuess.result !== -1) {
			setShowingRecentGuess(true);
		}
	}, [props.mostRecentGuess]);

	useEffect(() => {
		if (props.mostRecentGuess.result !== -1) {
			setColor(() =>
				showingRecentGuess ? getColor(props.mostRecentGuess.result) : "",
			);
		}
	}, [props.mostRecentGuess, showingRecentGuess]);

	return (
		<div className={styles.root}>
			<h3 style={{ backgroundColor: color }}>
				{props.categoryInfo.display_name}
			</h3>
			{component(props.categoryInfo.component_type)}
		</div>
	);
};

export default GuessCell;
