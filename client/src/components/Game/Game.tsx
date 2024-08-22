import GuessBox from "./children/GuessBox/GuessBox";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/consts";
import { getUserSessionDataFromStorage } from "../../utils/methods";
import { apiRequestGetPastGuesses } from "../../types/requests";
import { useMemo, useRef } from "react";
import GuessInfoButton from "../DEBUG/GuessInfoButton/GuessInfoButton";
import {
  type T_CATEGORY_INFO,
  type T_CATEGORY_INFO_SEED_JSON,
  generateCategoryInfoFromSeedJSON,
  generateGuessesStateFromJSON,
} from "../../types/categories";
import CATEGORY_INFO_JSON from "../../data/CATEGORY_INFO.json";
import CtxGuessData from "../../contexts/CtxGuessData";
import ResultBox from "./children/ResultBox/ResultBox";
import { T_GUESSES_AS_IDS } from "../../types/guesses";
import Loading from "../Loading/Loading";

const Game: React.FC = () => {
  const categoriesInfo: T_CATEGORY_INFO[] = useMemo(() => {
    return generateCategoryInfoFromSeedJSON(
      CATEGORY_INFO_JSON as T_CATEGORY_INFO_SEED_JSON,
    );
  }, []);
  const currentGuessInfo = useRef<T_GUESSES_AS_IDS>(
    generateGuessesStateFromJSON(
      CATEGORY_INFO_JSON as T_CATEGORY_INFO_SEED_JSON,
    ),
  );

  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.pastGuesses],
    queryFn: () =>
      apiRequestGetPastGuesses(getUserSessionDataFromStorage().access_token),
  });

  if (isFetching) {
    return <Loading />;
  } else {
    return (
      <>
        <CtxGuessData.Provider value={currentGuessInfo}>
          <GuessInfoButton />
          {data != undefined && data.data.guesses !== null && (
            <ResultBox
              pastGuesses={data.data.guesses}
              categoriesInfoArr={categoriesInfo}
            />
          )}
          <GuessBox
            categoriesInfoArr={categoriesInfo}
            mostRecentGuess={
              data !== undefined && data.data.guesses !== null
                ? //TODO: create map on fetch
                new Map(
                  Object.entries(
                    data.data.guesses[data.data.guesses.length - 1],
                  ),
                )
                : null
            }
          />
        </CtxGuessData.Provider>
      </>
    );
  }
};

export default Game;
