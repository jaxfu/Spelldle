import styles from "./App.module.scss";

// COMPONENTS
import GameBox from "./components/GameBox/GameBox";

function App() {
	return (
		<div className={styles.root}>
			<GameBox />
		</div>
	);
}

export default App;
