import styles from "./Level.module.scss";
import { T_CATEGORY_INFO } from "../../../../../../../../methods/categories";
import SingleText from "../SingleText/SingleText";

interface IProps {
	categoryInfo: T_CATEGORY_INFO;
}

const Level: React.FC<IProps> = (props) => {
	return (
		<div className={styles.root}>
			<SingleText {...props} />
			<div className={styles.toggle}>
				<label htmlFor="ritual_toggle">Ritual</label>
				<input type="checkbox" name="ritual_toggle" id="ritual_toggle" />
			</div>
		</div>
	);
};

export default Level;
