import styles from "./Register.module.scss";
import React, { useState } from "react";
import { sendTokensToLocalStorage } from "../../utils/methods.tsx";
import { apiRequestRegister } from "../../utils/requests.ts";
import {
	INIT_USERINPUT_REGISTER,
	type T_USERINPUT_REGISTER,
	type T_APIRESULT_REGISTER,
	E_REGISTER_RESULT,
} from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { QUERY_KEYS } from "../../utils/consts.ts";
import { useNavigate } from "react-router-dom";
import { useForm } from "@tanstack/react-form";

function isAlpha(input: string): boolean {
	let regex = /^[a-zA-Z]+$/;
	return regex.test(input);
}

const Register: React.FC = () => {
	const [userInput, setUserInput] = useState<T_USERINPUT_REGISTER>({
		...INIT_USERINPUT_REGISTER,
	});
	const [passwordsDifferent, setPasswordsDifferent] = useState<boolean>(false);
	const [errMessage, setErrMessage] = useState<string>("");

	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { data, isSuccess, mutate } = useMutation({
		mutationFn: (
			userInput: T_USERINPUT_REGISTER,
		): Promise<AxiosResponse<T_APIRESULT_REGISTER>> => {
			return apiRequestRegister(userInput);
		},
		onError(err) {
			console.log(err);
			alert("Error, please refresh and try again");
		},
		onSuccess(data) {
			switch (data.data.result) {
				case E_REGISTER_RESULT.VALID:
					sendTokensToLocalStorage(data.data.tokens);
					queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_DATA] });
					queryClient.invalidateQueries({
						queryKey: [QUERY_KEYS.GAME_SESSION_INFO],
					});
					navigate("/");
					break;
				case E_REGISTER_RESULT.USERNAME_EXISTS:
					setErrMessage(
						`Username '${form.getFieldValue("username")}' already exists`,
					);
			}
		},
	});

	const form = useForm<T_USERINPUT_REGISTER>({
		defaultValues: {
			first_name: "",
			last_name: "",
			username: "",
			password: "",
			confirm_password: "",
		},
		onSubmit: ({ value }) => {
			mutate({
				first_name: value.first_name.trim(),
				last_name: value.last_name.trim(),
				username: value.username.trim(),
				password: value.password.trim(),
				confirm_password: value.password.trim(),
			});
		},
	});

	return (
		<form
			className={styles.root}
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<form.Field
				name="first_name"
				children={(field) => (
					<>
						<h2>First Name</h2>
						<input
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							className={field.state.meta.errors.length > 0 ? styles.err : ""}
						/>
						{field.state.meta.errors ? (
							<div className={styles.err}>
								{field.state.meta.errors.join(", ")}
							</div>
						) : null}
					</>
				)}
				validators={{
					onChange: ({ value }) => {
						if (!isAlpha(value) && value !== "") {
							return "Names can only contain letters";
						}

						return undefined;
					},
					onSubmit: ({ value }) => {
						return value === "" ? "Cannot be empty" : undefined;
					},
				}}
			/>
			<form.Field
				name="last_name"
				children={(field) => (
					<>
						<h2>Last Name</h2>
						<input
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							className={field.state.meta.errors.length > 0 ? styles.err : ""}
						/>
						{field.state.meta.errors ? (
							<div className={styles.err}>
								{field.state.meta.errors.join(", ")}
							</div>
						) : null}
					</>
				)}
				validators={{
					onChange: ({ value }) => {
						if (!isAlpha(value) && value !== "") {
							return "Names can only contain letters";
						}

						return undefined;
					},
					onSubmit: ({ value }) => {
						return value === "" ? "Cannot be empty" : undefined;
					},
				}}
			/>
			<form.Field
				name="username"
				children={(field) => (
					<>
						<h2>Username</h2>
						<input
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							className={field.state.meta.errors.length > 0 ? styles.err : ""}
						/>
						{field.state.meta.errors ? (
							<div className={styles.err}>
								{field.state.meta.errors.join(", ")}
							</div>
						) : null}
					</>
				)}
				validators={{
					onChange: ({ value }) => {
						if (value.includes(" ")) {
							return "Username cannot contain spaces";
						} else if (!isAlpha(value) && value !== "") {
							return "Username can only contain letters";
						}

						return undefined;
					},
					onSubmit: ({ value }) => {
						return value === "" ? "Cannot be empty" : undefined;
					},
				}}
			/>
			<form.Field
				name="password"
				children={(field) => (
					<>
						<h2>Password</h2>
						<input
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							className={field.state.meta.errors.length > 0 ? styles.err : ""}
							type="password"
						/>
						{field.state.meta.errors ? (
							<div className={styles.err}>
								{field.state.meta.errors.join(", ")}
							</div>
						) : null}
					</>
				)}
				validators={{
					onChange: ({ value }) => {
						return value.includes(" ")
							? "Password cannot contain spaces"
							: undefined;
					},
					onSubmit: ({ value }) => {
						return value === "" ? "Cannot be empty" : undefined;
					},
				}}
			/>
			<form.Field
				name="confirm_password"
				children={(field) => (
					<>
						<h2>Confirm Password</h2>
						<input
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							className={field.state.meta.errors.length > 0 ? styles.err : ""}
							type="password"
						/>
						{field.state.meta.errors ? (
							<div className={styles.err}>
								{field.state.meta.errors.join(", ")}
							</div>
						) : null}
					</>
				)}
				validators={{
					onChange: ({ value }) => {
						if (value.includes(" ")) {
							return "Password cannot contain spaces";
						}

						return undefined;
					},
					onSubmit: ({ value, fieldApi }) => {
						if (value === "") {
							return "Cannot be empty";
						} else if (value !== fieldApi.form.getFieldValue("password")) {
							return "Passwords must match";
						}

						return undefined;
					},
				}}
			/>
			{<div className={styles.err}>{errMessage}</div>}
			<button type="submit">Register</button>
		</form>
	);
};

export default Register;
