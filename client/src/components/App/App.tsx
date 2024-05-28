import { useState } from "react";
import styles from "./App.module.scss";
import TurnBox from "../TurnBox/TurnBox";
import { T_SPELL_INFO } from "../../types";
import * as methods from "../../utils/methods";
import Navbar from "../Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import { T_UserData, initUserData } from "../../types";
import Register from "../Register/Register";

function App() {
	const [userData, setUserData] = useState<T_UserData>(
		methods.deepCopyObject(initUserData)
	);
	const [allCurrentGuessInfo, setAllCurrentGuessInfo] = useState<T_SPELL_INFO>(
		methods.createNewSpellInfoMap()
	);

	return (
		<div className={styles.root}>
			<Navbar />
			<Routes>
				<Route
					path="/game"
					element={
						<TurnBox
							allCurrentGuessInfo={allCurrentGuessInfo}
							setAllCurrentGuessInfo={setAllCurrentGuessInfo}
						/>
					}
				/>
				<Route path="/register" element={<Register />} />
			</Routes>
		</div>
	);
}

export default App;
