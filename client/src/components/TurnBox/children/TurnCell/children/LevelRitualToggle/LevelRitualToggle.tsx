import styles from "./LevelRitualToggle.module.scss";
import { type T_SPELL_INFO } from "../../../../../../types";

interface IProps {
	allCurrentGuessInfo: React.MutableRefObject<T_SPELL_INFO>;
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
					const LEVEL_IDENTIFIER: string = "Level";
					const levelState: any =
						props.allCurrentGuessInfo.current.get(LEVEL_IDENTIFIER);
					if (levelState) levelState[1] = e.target.checked;
					props.allCurrentGuessInfo.current.set(LEVEL_IDENTIFIER, levelState);
				}}
			/>
		</div>
	);
};

export default LevelRitualToggle;
