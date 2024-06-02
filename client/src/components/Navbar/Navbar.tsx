import React from "react";
import styles from "./Navbar.module.scss";
import type { T_APIRESULT_VALIDATE_SESSION, T_USERDATA_ALL } from "../../types";

interface IProps {
	userData: T_APIRESULT_VALIDATE_SESSION;
	isLoggedIn: boolean;
}

const Navbar: React.FC<IProps> = (props) => {
	return (
		<div className={styles.root}>
			<span>
				{props.isLoggedIn
					? props.userData.user_data_account.username
					: "NOT LOGGED IN"}
			</span>
		</div>
	);
};

export default Navbar;
