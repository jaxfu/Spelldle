import { useState, useEffect } from "react";
import styles from "./App.module.scss";
import TurnBox from "../TurnBox/TurnBox";
import {
	type T_SPELL_INFO,
	type T_APIRESULT_VALIDATE_ACCESS_TOKEN,
	type T_USERDATA_STATE,
	INIT_USERDATA_STATE,
} from "../../types";
import Navbar from "../Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useQuery } from "@tanstack/react-query";
import { apiRequestValidateSession } from "../../utils/requests";
import { QUERY_KEYS } from "../../utils/consts";
import { AxiosResponse } from "axios";
import {
	deepCopyObject,
	createNewSpellInfoMap,
	areTokensInLocalStorage,
	getUserSessionDataFromStorage,
	setUserDataFromAPIResult,
} from "../../utils/methods";

const App: React.FC = () => {
	const [userData, setUserData] = useState<T_USERDATA_STATE>(
		deepCopyObject(INIT_USERDATA_STATE)
	);
	const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(false);
	const [allCurrentGuessInfo, setAllCurrentGuessInfo] = useState<T_SPELL_INFO>(
		createNewSpellInfoMap()
	);
	const [enableInitialQueryFn, setEnableInitialQueryFn] =
		useState<boolean>(false);

	useEffect(() => {
		const tokensAreInStorage = areTokensInLocalStorage();
		if (!tokensAreInStorage) {
			console.log("NO TOKENS DETECTED");
		} else {
			console.log("TOKENS DETECTED");
			setEnableInitialQueryFn(true);
		}
	}, []);

	const { isSuccess, error, data } = useQuery({
		queryKey: [QUERY_KEYS.userData],
		queryFn: (): Promise<AxiosResponse<T_APIRESULT_VALIDATE_ACCESS_TOKEN>> => {
			console.log("RUNNING QUERYFN");
			return apiRequestValidateSession(getUserSessionDataFromStorage());
		},
		enabled: enableInitialQueryFn,
	});

	if (error) console.log(error);

	useEffect(() => {
		if (isSuccess) {
			console.log(`ISSUCCESS USEEFFECT: ${JSON.stringify(data.data)}`);
			setUserDataFromAPIResult(
				data.data,
				setUserData,
				setUserIsLoggedIn,
				setEnableInitialQueryFn
			);
		}
	}, [isSuccess]);

	return (
		<div className={styles.root}>
			<ReactQueryDevtools initialIsOpen={false} />
			<Navbar
				userData={userData}
				setUserData={setUserData}
				userIsLoggedIn={userIsLoggedIn}
				setUserIsLoggedIn={setUserIsLoggedIn}
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
						/>
					}
				/>
			</Routes>
		</div>
	);
};

export default App;
