import { useRef } from "react";
import styles from "./App.module.scss";
import Game from "../Game/Game";
import {
  type T_ALL_CURRENT_GUESS_INFO,
  type T_ALL_POSSIBLE_CATEGORIES_INFO,
} from "../../types";
import Navbar from "../Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/consts";
import {
  createNewSpellInfoMap,
  getAllCategoriesInfo,
  clearTokensFromLocalStorage,
  getAuthStatus,
} from "../../utils/methods";
import GuessInfoButton from "../DEBUG/GuessInfoButton/GuessInfoButton";
import ContentBox from "../ContentBox/ContentBox";
import Register from "../Register/Register";

const App: React.FC = () => {
  const allCurrentGuessInfo = useRef<T_ALL_CURRENT_GUESS_INFO>(
    createNewSpellInfoMap(),
  );
  const allCategoriesInfo = useRef<T_ALL_POSSIBLE_CATEGORIES_INFO>(
    getAllCategoriesInfo(),
  );

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
      <GuessInfoButton
        allCurrentGuessInfo={allCurrentGuessInfo.current}
        categoryInfo={allCategoriesInfo.current}
      />
      {/* CORE */}
      <Navbar />
      <ContentBox>
        <Routes>
          {isSuccess && data.valid ? (
            <Route
              path="/"
              element={
                <Game
                  allCategoriesInfo={allCategoriesInfo}
                  allCurrentGuessInfo={allCurrentGuessInfo}
                />
              }
            />
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
