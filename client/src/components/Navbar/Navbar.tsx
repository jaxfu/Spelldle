import React from "react";
import styles from "./Navbar.module.scss";
import {
	clearTokensFromLocalStorage,
	getAuthStatus,
} from "../../utils/methods";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/consts";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
	const queryClient = useQueryClient();

	const { data, isSuccess } = useQuery({
		queryKey: [QUERY_KEYS.userData],
		queryFn: getAuthStatus,
	});

	return (
		<div className={styles.root}>
			{isSuccess && data.valid ? (
				<>
					<span>{data.user_data.username}</span>
					<button
						onClick={() => {
							clearTokensFromLocalStorage();
							queryClient.invalidateQueries({
								queryKey: [QUERY_KEYS.userData],
							});
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
			)}
		</div>
	);
};

export default Navbar;
