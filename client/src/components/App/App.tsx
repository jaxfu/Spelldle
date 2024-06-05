import { useState, useEffect, useRef } from "react";
import styles from "./App.module.scss";
import TurnBox from "../TurnBox/TurnBox";
import {
	type T_SPELL_INFO,
	type T_APIRESULT_VALIDATE_ACCESS_TOKEN,
	type T_USERDATA_STATE,
	INIT_USERDATA_STATE,
} from "../../types";
import * as methods from "../../utils/methods";
import Navbar from "../Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useQuery } from "@tanstack/react-query";
import { apiRequestValidateSession } from "../../utils/requests";
import { QUERY_KEYS } from "../../utils/consts";
import { AxiosResponse } from "axios";

const App: React.FC = () => {
	const [userData, setUserData] = useState<T_USERDATA_STATE>(
		methods.deepCopyObject(INIT_USERDATA_STATE)
	);
	const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(false);
	const [allCurrentGuessInfo, setAllCurrentGuessInfo] = useState<T_SPELL_INFO>(
		methods.createNewSpellInfoMap()
	);
	const [enableInitialQueryFn, setEnableInitialQueryFn] =
		useState<boolean>(false);
	const allowSetUserData = useRef<boolean>(true);

	// useEffect(() => {
	// 	const tokensAreInStorage = methods.AreTokensInLocalStorage();
	// 	if (!tokensAreInStorage) {
	// 		console.log("NO TOKENS DETECTED");
	// 	} else {
	// 		console.log("TOKENS DETECTED");
	// 		allowSetUserData.current = true;
	// 		setEnableInitialQueryFn(true);
	// 	}
	// }, []);

	const { isPending, isSuccess, error, data, fetchStatus } = useQuery({
		queryKey: [QUERY_KEYS.userData],
		queryFn: (): Promise<AxiosResponse<T_APIRESULT_VALIDATE_ACCESS_TOKEN>> => {
			console.log("RUNNING QUERYFN");
			return apiRequestValidateSession(methods.getUserSessionDataFromStorage());
		},
		//enabled: enableInitialQueryFn,
	});

	if (isPending) {
		if (fetchStatus === "fetching") console.log("FETCHING");
	}
	if (error) console.log(error);
	if (isSuccess) {
		console.log("FETCH SUCCESSFUL");
		console.log(data.data);
		//setUserIsLoggedIn(true);
		//allowSetUserData.current = false;
		// methods.setUserDataFromAPIResult(
		// 	data.data,
		// 	setUserData,
		// 	setUserIsLoggedIn,
		// 	setEnableInitialQueryFn,
		// 	allowSetUserData
		// );
	}

	useEffect(() => {}, []);

	return (
		<div className={styles.root}>
			<ReactQueryDevtools initialIsOpen={false} />
			<Navbar
				userData={userData}
				setUserData={setUserData}
				userIsLoggedIn={userIsLoggedIn}
				setUserIsLoggedIn={setUserIsLoggedIn}
				allowSetUserData={allowSetUserData}
			/>
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
				<Route
					path="/login"
					element={
						<Login
							setUserData={setUserData}
							setUserIsLoggedIn={setUserIsLoggedIn}
							setEnableQueryFn={setEnableInitialQueryFn}
							allowSetUserData={allowSetUserData}
						/>
					}
				/>
			</Routes>
		</div>
	);
};

export default App;
