import styles from "./LevelRitualToggle.module.scss";

const LevelRitualToggle = () => {
	return (
		<div className={styles.root}>
			<label htmlFor="ritual_toggle">Ritual</label>
			<input type="checkbox" name="ritual_toggle" id="ritual_toggle" />
		</div>
	);
};

export default LevelRitualToggle;
