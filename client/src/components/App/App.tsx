import { useState } from "react";
import styles from "./App.module.scss";
import TurnBox from "../TurnBox/TurnBox";
import {
	INIT_USERDATA_TOKENS,
	INIT_APIRESULT_VALIDATE_SESSION,
	T_SPELL_INFO,
	type T_USERDATA_TOKENS,
	type T_APIRESULT_VALIDATE_SESSION,
} from "../../types";
import * as methods from "../../utils/methods";
import Navbar from "../Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import { T_USERDATA_ACCOUNT, INIT_USERDATA_ACCOUNT } from "../../types";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useQuery } from "@tanstack/react-query";
import { requestValidateSession } from "../../utils/requests";

const App: React.FC = () => {
	const [userData, setUserData] = useState<T_USERDATA_ACCOUNT>(
		methods.deepCopyObject(INIT_USERDATA_ACCOUNT)
	);
	const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(false);
	const [allCurrentGuessInfo, setAllCurrentGuessInfo] = useState<T_SPELL_INFO>(
		methods.createNewSpellInfoMap()
	);

	const { isPending, error, data } = useQuery({
		queryKey: ["userData"],
		queryFn: () => {
			console.log("RUNNING QUERYFN");
			const userSessionData: T_USERDATA_TOKENS =
				methods.deepCopyObject(INIT_USERDATA_TOKENS);
			try {
				return requestValidateSession(methods.getUserSessionDataFromStorage());
			} catch (e: any) {
				if (e instanceof Error) {
					console.log(`ERROR: ${e.message}`);
				}
			}
		},
		enabled: methods.isSessionIdInLocalStorage(),
	});

	if (isPending) console.log("PENDING...");
	else if (error) console.log(`ERROR: ${error.message}`);
	else console.log(data);

	return (
		<div className={styles.root}>
			<ReactQueryDevtools initialIsOpen={false} />
			<Navbar isLoggedIn={userIsLoggedIn} />
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
							setIsLoggedIn={setUserIsLoggedIn}
						/>
					}
				/>
				<Route
					path="/login"
					element={
						<Login
							setUserData={setUserData}
							setIsLoggedIn={setUserIsLoggedIn}
						/>
					}
				/>
			</Routes>
		</div>
	);
};

export default App;
