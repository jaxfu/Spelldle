import styles from "./App.module.scss";
import Game from "../Game/Game";
import Navbar from "../Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
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

const App: React.FC = () => {
	const { isSuccess, error, data } = useQuery({
		queryKey: [QUERY_KEYS.userData],
		queryFn: getAuthStatus,
	});

	if (error) {
		console.log(`GET_AUTH_STATUS ERROR: ${error}`);
		clearTokensFromLocalStorage();
	}

	return (
		<div className={styles.root}>
			{/* DEBUG */}
			<ReactQueryDevtools initialIsOpen={false} />

			{/* CORE */}
			<Navbar />
			<ContentBox>
				<Routes>
					{isSuccess && data.valid ? (
						<Route path="/" element={<Game />} />
					) : (
						<Route path="/" element={<div>Please Log In</div>} />
					)}
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</ContentBox>
		</div>
	);
};

// useEffect(() => {
//   if (isSuccess) {
//     console.log(`ISSUCCESS USEEFFECT: ${JSON.stringify(data.data)}`);
//     setUserDataFromAPIResult(
//       data.data,
//       setUserData,
//       setUserIsLoggedIn,
//       setEnableInitialQueryFn,
//     );
//   }
// }, [isSuccess]);

export default App;
