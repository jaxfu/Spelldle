import styles from "./ComponentsSelection.module.scss";

const ComponentsSelection = () => {
	return (
		<div className={styles.root}>
			<div className={styles.checkbox_root}>
				<span>
					<label htmlFor="v">V</label>
					<input type="checkbox" name="v" id="v" />
				</span>
				<span>
					<label htmlFor="s">S</label>
					<input type="checkbox" name="s" id="s" />
				</span>
				<span>
					<label htmlFor="m">M</label>
					<input type="checkbox" name="m" id="m" />
				</span>
			</div>
		</div>
	);
};

export default ComponentsSelection;
