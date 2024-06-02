import { useState, useEffect } from "react";
import styles from "./App.module.scss";
import TurnBox from "../TurnBox/TurnBox";
import {
	type T_SPELL_INFO,
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
import { apiRequestValidateSession } from "../../utils/requests";
import { QUERY_KEYS } from "../../utils/consts";
import { AxiosResponse } from "axios";

const App: React.FC = () => {
	const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(false);
	const [allCurrentGuessInfo, setAllCurrentGuessInfo] = useState<T_SPELL_INFO>(
		methods.createNewSpellInfoMap()
	);
	const [toggleToCheckTokens, setToggleToCheckTokens] =
		useState<boolean>(false);
	const [enableQueryFn, setEnableQueryFn] = useState<boolean>(false);

	useEffect(() => {
		console.log("RUNNING USEEFFECT");
		const tokensInStorage = methods.AreTokensInLocalStorage();
		setEnableQueryFn((current) => {
			if (current !== tokensInStorage) return tokensInStorage;
			return current;
		});
	}, [toggleToCheckTokens]);

	const { isPending, isSuccess, error, data, fetchStatus } = useQuery({
		queryKey: [QUERY_KEYS.userData],
		queryFn: (): Promise<AxiosResponse<T_APIRESULT_VALIDATE_SESSION>> => {
			console.log("RUNNING QUERYFN");
			return apiRequestValidateSession(methods.getUserSessionDataFromStorage());
		},
		enabled: enableQueryFn,
	});

	if (isPending) console.log("PENDING");
	if (error) console.log(error);
	if (isSuccess) {
		console.log(JSON.stringify(data.data));
		if (data.data.valid) {
			if (!userIsLoggedIn) setUserIsLoggedIn(true);
		}
	}

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
					element={<Register setToggleToCheckTokens={setToggleToCheckTokens} />}
				/>
				<Route
					path="/login"
					element={<Login setToggleToCheckTokens={setToggleToCheckTokens} />}
				/>
			</Routes>
		</div>
	);
};

export default App;
