import { useState } from "react";
import styles from "./TurnCell.module.scss";
import { T_CATEGORY } from "../../../../types";
import CATEGORY_INFO from "../../../../CATEGORY_INFO";
import LevelRitualToggle from "./children/LevelRitualToggle/LevelRitualToggle";
import SingleTextInput from "./children/SingleTextInput/SingleTextInput";
import RecommendationBox from "./children/RecommendationBox/RecommendationBox";
import ComponentsSelection from "./children/ComponentsSelection/ComponentsSelection";

interface IProps {
	category: T_CATEGORY;
}

const TurnCell: React.FC<IProps> = (props) => {
	const [inputValue, setInputValue] = useState<string>("");
	const [recommendations, setRecommendations] = useState<string[]>([]);

	function getUniqueItems(props: IProps): JSX.Element {
		const singleInput: JSX.Element = (
			<SingleTextInput
				inputValue={inputValue}
				setInputValue={setInputValue}
				setRecommendations={setRecommendations}
				recommendationValues={props.category.values}
			/>
		);

		switch (props.category) {
			case CATEGORY_INFO.SCHOOL:
			case CATEGORY_INFO.CASTING_TIME:
			case CATEGORY_INFO.RANGE:
			case CATEGORY_INFO.TARGET:
				return singleInput;
				break;
			case CATEGORY_INFO.LEVEL:
				return (
					<>
						<LevelRitualToggle />
						{singleInput}
					</>
				);
				break;
			case CATEGORY_INFO.COMPONENTS:
				return <ComponentsSelection />;
				break;
			default:
				return <></>;
		}
	}

	return (
		<div className={styles.root}>
			<h4>{props.category.name}</h4>
			{getUniqueItems(props)}
			{recommendations.length == 0 ? null : (
				<RecommendationBox
					recommendations={recommendations}
					setRecommendations={setRecommendations}
					setInputValue={setInputValue}
				/>
			)}
		</div>
	);
};

export default TurnCell;
