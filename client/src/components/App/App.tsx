import styles from "./App.module.scss";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS, USER_ROLES } from "../../utils/consts";
import {
	clearTokensFromLocalStorage,
	getAuthStatus,
} from "../../utils/methods";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import AdminApp from "./children/AdminApp/AdminApp";
import UserApp from "./children/UserApp/UserApp";

const App: React.FC = () => {
	const [showingPostGame, setShowingPostGame] = useState<boolean>(false);

	const { isFetching, isSuccess, error, data } = useQuery({
		queryKey: [QUERY_KEYS.USER_DATA],
		queryFn: getAuthStatus,
		retry: false,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
	});
	if (error) {
		console.log(`GET_AUTH_STATUS ERROR: ${error}`);
		clearTokensFromLocalStorage();
	}

	const navigate = useNavigate();

	// if auth invalid, send to login
	useEffect(() => {
		if (isSuccess && !isFetching) {
			if (!data || !data.valid) navigate("/login");
			else navigate("/");
		}
	}, [isFetching, isSuccess]);

	if (isSuccess) {
		switch (data.user_data.role) {
			case USER_ROLES.ADMIN:
				return (
					<div className={styles.root}>
						<Navbar data={data} />
						<AdminApp
							isFetching={isFetching}
							isSuccess={isSuccess}
							showingPostGame={showingPostGame}
							setShowingPostGame={setShowingPostGame}
						/>
					</div>
				);
			case USER_ROLES.USER:
				return (
					<div className={styles.root}>
						<Navbar data={data} />
						<UserApp
							isFetching={isFetching}
							isSuccess={isSuccess}
							showingPostGame={showingPostGame}
							setShowingPostGame={setShowingPostGame}
						/>
					</div>
				);
		}
	} else if (isFetching) {
		return (
			<div className={styles.root}>
				<Navbar data={undefined} />
				<Loading />
			</div>
		);
	}
};

export default App;
