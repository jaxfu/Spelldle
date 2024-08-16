import React, { useState } from "react";
import styles from "./Register.module.scss";
import { sendTokensToLocalStorage } from "../../utils/methods.tsx";
import { apiRequestRegister } from "../../types/requests.ts";
import {
	INIT_USERINPUT_REGISTER,
	T_USERINPUT_REGISTER,
	type T_APIRESULT_REGISTER,
} from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { QUERY_KEYS } from "../../utils/consts.ts";

const Register: React.FC = () => {
	const [userInput, setUserInput] = useState<T_USERINPUT_REGISTER>({
		...INIT_USERINPUT_REGISTER,
	});
	const [taken, setTaken] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);

	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: (
			userInput: T_USERINPUT_REGISTER,
		): Promise<AxiosResponse<T_APIRESULT_REGISTER>> => {
			return apiRequestRegister(userInput);
		},
		onError(err) {
			console.log(err);
		},
		onSuccess(data) {
			sendTokensToLocalStorage(data.data.tokens);
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.userData] });
		},
	});

	//INPUT HANDLER
	function inputHandler(e: React.ChangeEvent<HTMLInputElement>): void {
		setUserInput({
			...userInput,
			[e.target.name]: e.target.value,
		});
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
			<button
				className="btn btn-primary"
				onClick={() => mutation.mutate(userInput)}
			>
				Register
			</button>
		</div>
	);
};

export default Register;
