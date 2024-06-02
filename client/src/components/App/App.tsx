import { useState } from "react";
import styles from "./App.module.scss";
import TurnBox from "../TurnBox/TurnBox";
import {
	type T_SPELL_INFO,
	type T_APIRESULT_VALIDATE_SESSION,
	INIT_APIRESULT_VALIDATE_SESSION,
	type T_USERDATA_STATE,
	INIT_USERDATA_STATE,
} from "../../types";
import * as methods from "../../utils/methods";
import Navbar from "../Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import { T_USERDATA_ACCOUNT, INIT_USERDATA_ACCOUNT } from "../../types";
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
	const [enableQueryFn, setEnableQueryFn] = useState<boolean>(true);
	const [allCurrentGuessInfo, setAllCurrentGuessInfo] = useState<T_SPELL_INFO>(
		methods.createNewSpellInfoMap()
	);

	const { isPending, isSuccess, error, data, fetchStatus } = useQuery({
		queryKey: [QUERY_KEYS.userData],
		queryFn: (): Promise<AxiosResponse<T_APIRESULT_VALIDATE_SESSION>> => {
			console.log("RUNNING QUERYFN");
			return apiRequestValidateSession(methods.getUserSessionDataFromStorage());
		},
		enabled: methods.AreTokensInLocalStorage() && enableQueryFn,
	});

	if (isPending) {
		if (fetchStatus === "fetching") console.log("FETCHING");
	}
	if (error) console.log(error);
	if (isSuccess) {
		console.log(JSON.stringify(data.data));
	}

	return (
		<div className={styles.root}>
			<ReactQueryDevtools initialIsOpen={false} />
			<Navbar
				userData={userData}
				setUserData={setUserData}
				userIsLoggedIn={userIsLoggedIn}
				setUserIsLoggedIn={setUserIsLoggedIn}
				setEnableQueryFn={setEnableQueryFn}
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
							setEnableQueryFn={setEnableQueryFn}
							setUserIsLoggedIn={setUserIsLoggedIn}
						/>
					}
				/>
			</Routes>
		</div>
	);
};

export default App;
