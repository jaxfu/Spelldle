import { useState, useEffect } from "react";
import styles from "./App.module.scss";
import TurnBox from "../TurnBox/TurnBox";
import {
	type T_SPELL_INFO,
	type T_APIRESULT_VALIDATE_SESSION,
	INIT_APIRESULT_VALIDATE_SESSION,
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
	const [userData, setUserData] = useState<T_APIRESULT_VALIDATE_SESSION>(
		methods.deepCopyObject(INIT_APIRESULT_VALIDATE_SESSION)
	);
	const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(false);
	const [allCurrentGuessInfo, setAllCurrentGuessInfo] = useState<T_SPELL_INFO>(
		methods.createNewSpellInfoMap()
	);
	const [enableQueryFn, setEnableQueryFn] = useState<boolean>(false);

	useEffect(() => {
		console.log("RUNNING USEEFFECT IN APP");
		setEnableQueryFn(methods.AreTokensInLocalStorage());
	}, []);

	const { isPending, isSuccess, error, data, fetchStatus } = useQuery({
		queryKey: [QUERY_KEYS.userData],
		queryFn: (): Promise<AxiosResponse<T_APIRESULT_VALIDATE_SESSION>> => {
			console.log("RUNNING QUERYFN");
			return apiRequestValidateSession(methods.getUserSessionDataFromStorage());
		},
		enabled: enableQueryFn,
	});

	if (isPending) {
		if (fetchStatus === "fetching") console.log("PENDING");
	}
	if (error) console.log(error);
	if (isSuccess) {
		console.log(JSON.stringify(data.data));
		if (data.data.valid) {
			if (!userIsLoggedIn) setUserIsLoggedIn(true);
			if (userData != data.data) setUserData(data.data);
		} else {
			if (userData != INIT_APIRESULT_VALIDATE_SESSION)
				setUserData(methods.deepCopyObject(INIT_APIRESULT_VALIDATE_SESSION));
		}
	}

	return (
		<div className={styles.root}>
			<ReactQueryDevtools initialIsOpen={false} />
			<Navbar
				userData={userData}
				setUserData={setUserData}
				setEnableQueryFn={setEnableQueryFn}
				userIsLoggedIn={userIsLoggedIn}
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
				<Route
					path="/register"
					element={<Register setEnableQueryFn={setEnableQueryFn} />}
				/>
				<Route
					path="/login"
					element={<Login setEnableQueryFn={setEnableQueryFn} />}
				/>
			</Routes>
		</div>
	);
};

export default App;
