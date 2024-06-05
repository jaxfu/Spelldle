import React from "react";
import styles from "./Navbar.module.scss";
import { type T_USERDATA_STATE } from "../../types";
import { logoutUser } from "../../utils/methods";

interface IProps {
	userData: T_USERDATA_STATE;
	setUserData: React.Dispatch<React.SetStateAction<T_USERDATA_STATE>>;
	userIsLoggedIn: boolean;
	setUserIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
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
				onClick={() => logoutUser(props.setUserIsLoggedIn, props.setUserData)}
			>
				Logout
			</button>
		</div>
	);
};

export default Navbar;
