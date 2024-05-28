import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";
import { getUserDataFromAPIResponse } from "../../utils/dataHandlers.ts";
import { sendToLocalStorage } from "../../auth/storage.ts";
import { attemptRegister } from "../../utils/requests.ts";
import {
	T_UserData,
	initUserInputRegister,
	T_RegisterResult,
	T_UserInput_Register,
} from "../../types";

interface IProps {
	setUserData: React.Dispatch<React.SetStateAction<T_UserData>>;
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	setValidationCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register: React.FC<IProps> = ({
	setUserData,
	setLoggedIn,
	setValidationCompleted,
}) => {
	//STATE
	const [userInput, setUserInput] = useState<T_UserInput_Register>({
		...initUserInputRegister,
	});
	const [taken, setTaken] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);

	const navigate = useNavigate();

	//INPUT HANDLER
	function inputHandler(e: React.ChangeEvent<HTMLInputElement>): void {
		setUserInput({
			...userInput,
			[e.target.name]: e.target.value,
		});
	}

	// On Register Button Click
	async function onRegisterSubmit(): Promise<void> {
		try {
			const registerResult: T_RegisterResult = {
				...(await attemptRegister(userInput)),
			};
			console.log(registerResult);

			if (registerResult.error) {
				setTaken(false);
				return setError(true);
			} else if (!registerResult.valid) {
				setError(false);
				return setTaken(true);
			} else {
				sendToLocalStorage({
					user_id: registerResult.user_data.user_id,
					session_key: registerResult.session_key,
				});
				const userData = getUserDataFromAPIResponse(registerResult);
				setUserData(userData);
				setLoggedIn(true);
				setValidationCompleted(true);

				return navigate("/");
			}
		} catch (err) {
			console.log(`ERROR: ${err}`);
		}
	}

	return (
		<div className={styles.root}>
			<div>First Name:</div>
			<input
				type="text"
				name="first_name"
				value={userInput.first_name}
				onChange={inputHandler}
				autoComplete="on"
			/>

			<div>Last Name:</div>
			<input
				type="text"
				name="last_name"
				value={userInput.last_name}
				onChange={inputHandler}
				autoComplete="on"
			/>

			<div>Username:</div>
			<input
				type="text"
				name="username"
				value={userInput.username}
				onChange={inputHandler}
				autoComplete="on"
			/>

			<div>Password:</div>
			<input
				type="password"
				name="password"
				value={userInput.password}
				onChange={inputHandler}
				autoComplete="on"
			/>

			<div>Confirm Password:</div>
			<input
				type="password"
				name="password2"
				value={userInput.password2}
				onChange={inputHandler}
				autoComplete="on"
			/>

			{taken && (
				<div>
					<div>Username Taken</div>
					<br />
				</div>
			)}

			{error && (
				<div>
					<div>Error, please try again</div>
					<br />
				</div>
			)}

			<br />
			<button className="btn btn-primary" onClick={onRegisterSubmit}>
				Register
			</button>
		</div>
	);
};

export default Register;
