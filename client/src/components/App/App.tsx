import styles from "./App.module.scss";
import Game from "../Game/Game";
import Navbar from "../Navbar/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/consts";
import {
	clearTokensFromLocalStorage,
	getAuthStatus,
} from "../../utils/methods";
import ContentBox from "../ContentBox/ContentBox";
import Register from "../Register/Register";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";

const App: React.FC = () => {
	const [showingPostGame, setShowingPostGame] = useState<boolean>(false);

	const { isFetching, isSuccess, error, data } = useQuery({
		queryKey: [QUERY_KEYS.userData],
		queryFn: getAuthStatus,
		retry: false,
	});
	if (error) {
		console.log(`GET_AUTH_STATUS ERROR: ${error}`);
		clearTokensFromLocalStorage();
	}

	const navigate = useNavigate();

	// if auth invalid, send to login
	useEffect(() => {
		if (isSuccess) {
			if (!data || !data.valid) navigate("/login");
			else navigate("/");
		}
	}, [isFetching, isSuccess]);

	return (
		<div className={styles.root}>
			{/* DEBUG */}
			<ReactQueryDevtools initialIsOpen={false} />

			{/* CORE */}
			<Navbar />
			<ContentBox showingPostGame={showingPostGame}>
				<Routes>
					<Route
						path="/"
						element={
							isFetching && !isSuccess ? (
								<Loading />
							) : (
								<Game
									showingPostGame={showingPostGame}
									setShowingPostGame={setShowingPostGame}
								/>
							)
						}
					/>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</ContentBox>
		</div>
	);
};

export default App;
