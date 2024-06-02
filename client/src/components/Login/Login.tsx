import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import { apiRequestLogin } from "../../utils/requests.ts";
import { sendToLocalStorage } from "../../utils/methods.tsx";
import {
	INIT_USERINPUT_LOGIN,
	T_APIRESULT_LOGIN,
	T_USERINPUT_LOGIN,
} from "../../types";
import { togglePasswordLogin } from "../../utils/uiHandlers.ts";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { QUERY_KEYS } from "../../utils/consts.ts";

interface IProps {
	setToggleToCheckTokens: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<IProps> = (props) => {
	// Init State
	const [userInput, setUserInuput] =
		useState<T_USERINPUT_LOGIN>(INIT_USERINPUT_LOGIN);
	const [error, setError] = useState<boolean>(false);
	const [incorrectInfo, setIncorrectInfo] = useState<boolean>(false);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (
			userInput: T_USERINPUT_LOGIN
		): Promise<AxiosResponse<T_APIRESULT_LOGIN>> => {
			return apiRequestLogin(userInput);
		},
		onError(err) {
			console.log(err);
		},
		onSuccess(data) {
			if (data.data.valid) {
				sendToLocalStorage(data.data.user_data_tokens);
				props.setToggleToCheckTokens((current) => !current);
				queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.userData] });
			}
		},
	});

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
