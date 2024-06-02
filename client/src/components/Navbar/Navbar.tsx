import React from "react";
import styles from "./Navbar.module.scss";
import {
	INIT_APIRESULT_VALIDATE_SESSION,
	type T_APIRESULT_VALIDATE_SESSION,
} from "../../types";
import * as methods from "../../utils/methods";

interface IProps {
	userData: T_APIRESULT_VALIDATE_SESSION;
	setUserData: React.Dispatch<
		React.SetStateAction<T_APIRESULT_VALIDATE_SESSION>
	>;
	setEnableQueryFn: React.Dispatch<React.SetStateAction<boolean>>;
	userIsLoggedIn: boolean;
}

const Navbar: React.FC<IProps> = (props) => {
	return (
		<div className={styles.root}>
			<span>
				{props.userIsLoggedIn
					? props.userData.user_data_account.username
					: "NOT LOGGED IN"}
			</span>
			<button
				onClick={() => {
					methods.clearTokensFromLocalStorage();
					props.setEnableQueryFn(false);
					props.setUserData(
						methods.deepCopyObject(INIT_APIRESULT_VALIDATE_SESSION)
					);
				}}
			>
				Logout
			</button>
		</div>
	);
};

export default Navbar;
