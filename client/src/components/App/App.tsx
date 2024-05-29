import { useState } from "react";
import styles from "./App.module.scss";
import TurnBox from "../TurnBox/TurnBox";
import { T_SPELL_INFO } from "../../types";
import * as methods from "../../utils/methods";
import Navbar from "../Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import { T_UserData, initUserData } from "../../types";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const App: React.FC = () => {
	const [userData, setUserData] = useState<T_UserData>(
		methods.deepCopyObject(initUserData)
	);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [allCurrentGuessInfo, setAllCurrentGuessInfo] = useState<T_SPELL_INFO>(
		methods.createNewSpellInfoMap()
	);

	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<div className={styles.root}>
				<Navbar isLoggedIn={isLoggedIn} />
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
					<Route
						path="/register"
						element={
							<Register
								setUserData={setUserData}
								setIsLoggedIn={setIsLoggedIn}
							/>
						}
					/>
					<Route
						path="/login"
						element={
							<Login setUserData={setUserData} setIsLoggedIn={setIsLoggedIn} />
						}
					/>
				</Routes>
			</div>
		</QueryClientProvider>
	);
};

export default App;
