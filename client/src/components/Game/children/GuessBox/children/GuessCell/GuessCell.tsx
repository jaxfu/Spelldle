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
	E_RESULT_OPTIONS,
	T_GUESS_STATES_STRINGS,
} from "../../../../../../types/guesses";

export interface I_GUESS_CELL_STATE {
	input: T_GUESS_STATES_STRINGS;
	result: E_RESULT_OPTIONS;
}

interface IProps {
	categoryInfo: T_CATEGORY_INFO;
	state: I_GUESS_CELL_STATE;
}

const GuessCell: React.FC<IProps> = (props) => {
	const component = (): JSX.Element => {
		switch (props.categoryInfo.component_type) {
			case E_CATEGORY_COMPONENT_TYPE.SINGLE_TEXT:
				return <SingleText {...props} />;
			case E_CATEGORY_COMPONENT_TYPE.MULTI_TEXT:
				return <MultiText {...props} />;
			case E_CATEGORY_COMPONENT_TYPE.COMPONENTS:
				return <Components {...props} />;
			case E_CATEGORY_COMPONENT_TYPE.LEVEL:
				return <Level {...props} />;
		}
	};

	return (
		<div className={styles.root}>
			<h4>{props.categoryInfo.display_name}</h4>
			{component()}
		</div>
	);
};

export default GuessCell;
