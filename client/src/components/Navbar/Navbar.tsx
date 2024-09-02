import React from "react";
import styles from "./Navbar.module.scss";
import {
	clearTokensFromLocalStorage,
	getAuthStatus,
} from "../../utils/methods";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/consts";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
	const queryClient = useQueryClient();
	const { data, isSuccess } = useQuery({
		queryKey: [QUERY_KEYS.userData],
		queryFn: getAuthStatus,
		retry: false,
	});

	const navigate = useNavigate();

	return (
		<div className={styles.root}>
			<span className={styles.title}>
				<h1>Spelldle</h1>
			</span>
			<span className={styles.username}>
				{isSuccess && data.valid && <h2>{data.user_data.username}</h2>}
			</span>
			<span className={styles.buttons}>
				{isSuccess && data.valid ? (
					<button
						onClick={() => {
							clearTokensFromLocalStorage();
							queryClient.invalidateQueries({
								queryKey: [QUERY_KEYS.userData],
							});
							navigate("/login");
						}}
					>
						Logout
					</button>
				) : (
					<>
						<Link to={"/login"}>
							<button>Login</button>
						</Link>
						<Link to={"/register"}>
							<button>Register</button>
						</Link>
					</>
				)}
			</span>

			{/* {isSuccess && data.valid ? (
				<>
					<h2>{data.user_data.username}</h2>
					<button
						onClick={() => {
							clearTokensFromLocalStorage();
							queryClient.invalidateQueries({
								queryKey: [QUERY_KEYS.userData],
							});
							navigate("/login");
						}}
					>
						Logout
					</button>
				</>
			) : (
				<>
					<Link to={"/login"}>
						<button>Login</button>
					</Link>
					<Link to={"/register"}>
						<button>Register</button>
					</Link>
				</>
			)} */}
		</div>
	);
};

export default Navbar;
