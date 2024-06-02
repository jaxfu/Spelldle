import React, { useState } from "react";
import { useNavigate, NavigateFunction, Link } from "react-router-dom";
import styles from "./Login.module.scss";
import { getUserDataFromAPIResponse } from "../../utils/dataHandlers.ts";
import { apiRequestLogin } from "../../utils/requests.ts";
import { sendToLocalStorage } from "../../utils/methods.tsx";
import {
	INIT_USERINPUT_LOGIN,
	T_APIRESULT_LOGIN,
	T_USERINPUT_LOGIN,
	T_USERDATA_ACCOUNT,
	INIT_USERDATA_ACCOUNT,
} from "../../types";
import { togglePasswordLogin } from "../../utils/uiHandlers.ts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as methods from "../../utils/methods.tsx";

interface IProps {
	setUserData: React.Dispatch<React.SetStateAction<T_USERDATA_ACCOUNT>>;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	//setValidationCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<IProps> = (props) => {
	// Init State
	const [userInput, setUserInuput] =
		useState<T_USERINPUT_LOGIN>(INIT_USERINPUT_LOGIN);
	const [error, setError] = useState<boolean>(false);
	const [incorrectInfo, setIncorrectInfo] = useState<boolean>(false);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (userInput: T_USERINPUT_LOGIN) => {
			return apiRequestLogin(userInput);
		},
		onSuccess: (data) => {
			queryClient.setQueryData(["userData"], data);
		},
	});

	//const navigate: NavigateFunction = useNavigate();

	// On Login
	// async function onLoginSubmit(): Promise<void> {
	// 	try {
	// 		const loginResult: T_APIRESULT_LOGIN = await attemptLogin(userInput);
	// 		console.log(loginResult);

	// 		if (loginResult.error) {
	// 			setIncorrectInfo(false);
	// 			return setError(true);
	// 		}
	// 		if (!loginResult.valid) {
	// 			setError(false);
	// 			return setIncorrectInfo(true);
	// 		}

	// 		sendToLocalStorage({
	// 			user_id: loginResult.user_data.user_id,
	// 			session_key: loginResult.session_key,
	// 		});
	// 		const userData = getUserDataFromAPIResponse(loginResult);
	// 		props.setUserData(userData);
	// 		props.setIsLoggedIn(true);
	// 		//setValidationCompleted(true);

	// 		//return navigate("/");
	// 	} catch (err) {
	// 		console.log(`Error: ${err}`);
	// 	}
	// }

	// INPUT HANDLER
	const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setUserInuput({
			...userInput,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className={styles.root}>
			<div>Username:</div>
			<input
				type="text"
				name="username"
				value={userInput.username}
				onChange={inputHandler}
				autoComplete="on"
			/>
			<br />
			<div className={styles.passwordBox}>
				<div>Password:</div>
				<input
					type="password"
					name="password"
					id="passwordBox"
					value={userInput.password}
					onChange={inputHandler}
					autoComplete="on"
				/>
				<i
					className={`fa-solid fa-eye fa-eye-slash ${styles.eye}`}
					id={"eye"}
					onClick={togglePasswordLogin}
				/>
			</div>
			<br />
			{incorrectInfo && (
				<div>
					<div>Incorrect Login Information, Please Try Again</div>
					<br />
				</div>
			)}
			{error && (
				<div>
					<div>Error, Please Try Again</div>
					<br />
				</div>
			)}
			<button
				onClick={() => {
					mutation.mutate(userInput);
				}}
			>
				Login
			</button>
			<Link to={"/register"}>
				<button>Register</button>
			</Link>
		</div>
	);
};

export default Login;
