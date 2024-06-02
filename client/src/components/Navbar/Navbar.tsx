import React from "react";
import styles from "./Navbar.module.scss";
import {
	INIT_APIRESULT_VALIDATE_SESSION,
	INIT_USERDATA_STATE,
	type T_APIRESULT_VALIDATE_SESSION,
	type T_USERDATA_STATE,
} from "../../types";
import * as methods from "../../utils/methods";

interface IProps {
	userData: T_USERDATA_STATE;
	setUserData: React.Dispatch<React.SetStateAction<T_USERDATA_STATE>>;
	userIsLoggedIn: boolean;
	setUserIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	setEnableQueryFn: React.Dispatch<React.SetStateAction<boolean>>;
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
					props.setEnableQueryFn(false);
					methods.clearTokensFromLocalStorage();
					props.setUserData(methods.deepCopyObject(INIT_USERDATA_STATE));
					props.setUserIsLoggedIn(false);
				}}
			>
				Logout
			</button>
		</div>
	);
};

export default Navbar;
