import React from "react";
import styles from "./Navbar.module.scss";

interface IProps {
	isLoggedIn: boolean;
}

const Navbar: React.FC<IProps> = (props) => {
	return (
		<div className={styles.root}>
			{props.isLoggedIn ? "Logged In" : "Not logged in"}
		</div>
	);
};

export default Navbar;
