import styles from "./LevelRitualToggle.module.scss";
import { T_SPELL_INFO } from "../../../../../../types";

interface IProps {
	setAllCurrentGuessInfo: React.Dispatch<React.SetStateAction<T_SPELL_INFO>>;
}

const LevelRitualToggle: React.FC<IProps> = (props) => {
	return (
		<div className={styles.root}>
			<label htmlFor="ritual_toggle">Ritual</label>
			<input
				type="checkbox"
				name="ritual_toggle"
				id="ritual_toggle"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					props.setAllCurrentGuessInfo((current) => {
						const LEVEL_IDENTIFIER: string = "Level";
						const newState = new Map(current);
						const levelState: any = newState.get(LEVEL_IDENTIFIER);
						if (levelState) levelState[1] = e.target.checked;
						newState.set(LEVEL_IDENTIFIER, levelState);
						return newState;
					});
				}}
			/>
		</div>
	);
};

export default LevelRitualToggle;
