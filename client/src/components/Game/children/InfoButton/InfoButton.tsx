import styles from "./InfoButton.module.scss";
import { FaQuestionCircle } from "react-icons/fa";

interface IProps {
	setShowingInfoPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const InfoButton: React.FC<IProps> = (props) => {
	return (
		<span
			className={styles.info_btn}
			onClick={() => props.setShowingInfoPopup((current) => !current)}
		>
			<FaQuestionCircle />
		</span>
	);
};

export default InfoButton;
