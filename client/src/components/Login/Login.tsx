import React, { useState } from "react";
import { useNavigate, NavigateFunction, Link } from "react-router-dom";
import styles from "./Login.module.scss";
import { getUserDataFromAPIResponse } from "../../utils/dataHandlers.ts";
import { attemptLogin } from "../../utils/requests.ts";
import { sendToLocalStorage } from "../../auth/storage.ts";
import {
	initUserInputLogin,
	T_LoginResult,
	T_UserInput_Login,
	T_UserData,
} from "../../types";
import { togglePasswordLogin } from "../../utils/uiHandlers.ts";

interface IProps {
	setUserData: React.Dispatch<React.SetStateAction<T_UserData>>;
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	setValidationCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPage: React.FC<IProps> = ({
	setUserData,
	setLoggedIn,
	setValidationCompleted,
}) => {
	// Init State
	const [userInput, setUserInuput] =
		useState<T_UserInput_Login>(initUserInputLogin);
	const [error, setError] = useState<boolean>(false);
	const [incorrectInfo, setIncorrectInfo] = useState<boolean>(false);

	const navigate: NavigateFunction = useNavigate();

	// On Login
	async function onLoginSubmit(): Promise<void> {
		try {
			const loginResult: T_LoginResult = await attemptLogin(userInput);
			console.log(loginResult);

			if (loginResult.error) {
				setIncorrectInfo(false);
				return setError(true);
			}
			if (!loginResult.valid) {
				setError(false);
				return setIncorrectInfo(true);
			}

			sendToLocalStorage({
				user_id: loginResult.user_data.user_id,
				session_key: loginResult.session_key,
			});
			const userData = getUserDataFromAPIResponse(loginResult);
			setUserData(userData);
			setLoggedIn(true);
			setValidationCompleted(true);

			return navigate("/");
		} catch (err) {
			console.log(`Error: ${err}`);
		}
	}

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
			<button onClick={onLoginSubmit}>Login</button>
			<Link to={"/register"}>
				<button>Register</button>
			</Link>
		</div>
	);
};

export default LoginPage;
