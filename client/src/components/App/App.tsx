import styles from "./App.module.scss";

// COMPONENTS
import TurnBox from "./children/TurnBox/TurnBox";

function App() {
	return (
		<div className={styles.root}>
			<TurnBox />
		</div>
	);
}

export default App;
