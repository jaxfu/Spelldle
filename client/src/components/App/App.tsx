import { useState } from "react";
import styles from "./App.module.scss";
import TurnBox from "../TurnBox/TurnBox";
import { T_SPELL_INFO } from "../../types";
import * as methods from "../../utils/methods";

function App() {
	const [allCurrentGuessInfo, setAllCurrentGuessInfo] = useState<T_SPELL_INFO>(
		methods.createNewSpellInfoMap()
	);

	return (
		<div className={styles.root}>
			<TurnBox />
		</div>
	);
}

export default App;
