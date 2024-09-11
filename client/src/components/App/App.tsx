import styles from "./App.module.scss";
import Navbar from "../Navbar/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import ContentBox from "../ContentBox/ContentBox";
import Game from "../Game/Game";
import Login from "../Login/Login";
import Register from "../Register/Register";

const App: React.FC = () => {
	const [showingPostGame, setShowingPostGame] = useState<boolean>(false);
	const [gameComponent, setGameComponent] = useState<JSX.Element>(<Loading />);

	const { isFetching, isFetched, isSuccess, error, data } = useQuery({
		queryKey: [QUERY_KEYS.USER_DATA],
		queryFn: getAuthStatus,
		retry: false,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
	});

	// if auth invalid, send to login &&
	// set gameComponent base on role
	const navigate = useNavigate();
	useEffect(() => {
		if (!isFetching && isFetched) {
			if (!data || !data.valid || error) {
				clearTokensFromLocalStorage();
				navigate("/login");
			} else if (isSuccess) {
				if (data.user_data.role === USER_ROLES.USER) {
					setGameComponent(
						<UserApp
							showingPostGame={showingPostGame}
							setShowingPostGame={setShowingPostGame}
						/>,
					);
				} else {
					setGameComponent(
						<AdminApp
							showingPostGame={showingPostGame}
							setShowingPostGame={setShowingPostGame}
						/>,
					);
				}
			}
		}
	}, [isSuccess, isFetched, isFetching, showingPostGame]);

	return (
		<div className={styles.root}>
			<Navbar data={data} />
			<ContentBox showingPostGame={showingPostGame}>
				<Routes>
					<Route path="/" element={gameComponent} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</ContentBox>
		</div>
	);
};

export default App;
