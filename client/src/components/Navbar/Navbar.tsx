import React from "react";
import styles from "./Navbar.module.scss";
import { INIT_USERDATA_STATE, type T_USERDATA_STATE } from "../../types";
import * as methods from "../../utils/methods";

interface IProps {
	userData: T_USERDATA_STATE;
	setUserData: React.Dispatch<React.SetStateAction<T_USERDATA_STATE>>;
	userIsLoggedIn: boolean;
	setUserIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	allowSetUserData: React.MutableRefObject<boolean>;
}

const Navbar: React.FC<IProps> = (props) => {
	function logoutUser(
		setUserIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
		setUserData: React.Dispatch<React.SetStateAction<T_USERDATA_STATE>>
	): void {
		methods.clearTokensFromLocalStorage();
		setUserIsLoggedIn(false);
		setUserData(methods.deepCopyObject(INIT_USERDATA_STATE));
	}

	return (
		<div className={styles.root}>
			<span>
				{props.userIsLoggedIn
					? props.userData.user_data_account.username
					: "NOT LOGGED IN"}
			</span>
			<button
				onClick={() => logoutUser(props.setUserIsLoggedIn, props.setUserData)}
			>
				Logout
			</button>
		</div>
	);
};

export default Navbar;
