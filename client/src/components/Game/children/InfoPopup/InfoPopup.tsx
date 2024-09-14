import styles from "./InfoPopup.module.scss";
import Popup from "../Popup/Popup";
import { LIMITS, LOCAL_STORAGE_KEYS } from "../../../../utils/consts";

interface IProps {
	setShowing: React.Dispatch<React.SetStateAction<boolean>>;
}

const InfoPopup: React.FC<IProps> = (props) => {
	return (
		<Popup>
			<div className={styles.content}>
				<h2>Welcome to Spelldle!</h2>
				<h3>Rules:</h3>
				<ul className={styles.rules}>
					<li>
						You have {LIMITS.CATEGORY.toString()} chances to guess the
						categories of the spell. You must enter a value in every category
						before you can submit.
					</li>
					<li>
						You have {LIMITS.SPELL.toString()} chances to guess the spell itself
					</li>
					<li>You may use each type of guess in any order</li>
					<li id={styles.colors}>
						After a category guess, the color of each category's box will tell
						you the status of your guess
						<ul>
							<li>Green: Correct</li>
							<li>Yellow (categories with multiple inputs): Some incorrect</li>
							<li>Red: Incorrect</li>
						</ul>
					</li>
					<li>
						After your 5th category guess, you can't make any more but may still
						make spell guesses
					</li>
					<li>After your 3rd incorrect spell guess, the game is over</li>
				</ul>
				<div id={styles.about}>
					<span>
						Created by Jackson Furr
						<i>
							<span id={styles.copyright}>&copy;</span>2024
						</i>
					</span>
					<span>
						Site:{" "}
						<a href="https://www.jacksonfurr.dev/" target="_blank">
							jacksonfurr.dev
						</a>
					</span>
					<span>
						Email:{" "}
						<a href="mailto: jacksonfurrdev@gmail.com">
							jacksonfurrdev@gmail.com
						</a>
					</span>
					<i>
						This is still a work in progress, please report any bugs, incorrect
						information, or ideas for improvements to{" "}
						<a href="mailto: jacksonfurrdev@gmail.com">support@spelldle.app</a>
					</i>
				</div>
				<div className={styles.buttons}>
					<button onClick={() => props.setShowing(false)}>Ok</button>
					<button
						onClick={() => {
							props.setShowing(false);
							localStorage.setItem(LOCAL_STORAGE_KEYS.show_info_popup, "false");
						}}
					>
						Don't Show Again
					</button>
				</div>
			</div>
		</Popup>
	);
};

export default InfoPopup;
