import GuessBox from "./children/GuessBox/GuessBox";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/consts";
import { getUserSessionDataFromStorage } from "../../utils/methods";
import { apiRequestGetPastGuesses } from "../../types/requests";
import { useMemo, useRef, useState } from "react";
import GuessInfoButton from "../DEBUG/GuessInfoButton/GuessInfoButton";
import {
  E_CATEGORY_COMPONENT_TYPE,
  type T_CATEGORY_INFO,
  type T_CATEGORY_INFO_SEED_JSON,
  generateCategoryInfoFromSeedJSON,
  generateGuessesStateFromJSON,
} from "../../types/categories";
import CATEGORY_INFO_JSON from "../../data/CATEGORY_INFO.json";
import GuessDataContext from "../../contexts/GuessDataContext";
import GuessCellsStateContext from "../../contexts/GuessCellsStateContext";
import ResultBox from "./children/ResultBox/ResultBox";
import { E_RESULT_OPTIONS, T_GUESSES_AS_IDS } from "../../types/guesses";
import { I_GUESS_CELL_STATE } from "./children/GuessBox/children/GuessCell/GuessCell";

const Game: React.FC = () => {
  const { data, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.pastGuesses],
    queryFn: () =>
      apiRequestGetPastGuesses(getUserSessionDataFromStorage().access_token),
  });

  if (isSuccess) {
    console.log(JSON.stringify(data.data));
  }

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
  const guessCellsState = useRef<
    Map<string, I_GUESS_CELL_STATE>
  >(initGuessCellsStateMap(CATEGORY_INFO_JSON as T_CATEGORY_INFO_SEED_JSON));

  function initGuessCellsStateMap(
    categoryInfoJson: T_CATEGORY_INFO_SEED_JSON,
  ): Map<string, I_GUESS_CELL_STATE> {
    const map = new Map();

    for (const { id, component_type } of categoryInfoJson) {
      let guessCellState: I_GUESS_CELL_STATE;

      switch (component_type) {
        case E_CATEGORY_COMPONENT_TYPE.SINGLE_TEXT:
          guessCellState = {
            input: "",
            result: E_RESULT_OPTIONS.UNINITIALIZED,
          };
          break;
        case E_CATEGORY_COMPONENT_TYPE.MULTI_TEXT:
        case E_CATEGORY_COMPONENT_TYPE.COMPONENTS:
          guessCellState = {
            input: [],
            result: E_RESULT_OPTIONS.UNINITIALIZED,
          };
          break;
        case E_CATEGORY_COMPONENT_TYPE.LEVEL:
          guessCellState = {
            input: { level: "", is_ritual: false },
            result: E_RESULT_OPTIONS.UNINITIALIZED,
          };
          break;
      }

      map.set(id, guessCellState);
    }

    return map;
  }

  return (
    <>
      <GuessCellsStateContext.Provider value={guessCellsState}>
        <GuessDataContext.Provider value={currentGuessInfo}>
          <GuessInfoButton />
          {data != undefined && data.data.guesses.length > 0 && (
            <ResultBox
              pastGuesses={data.data.guesses}
              categoriesInfoArr={categoriesInfo}
            />
          )}
          <GuessBox
            categoriesInfoArr={categoriesInfo}
          />
        </GuessDataContext.Provider>
      </GuessCellsStateContext.Provider >
    </>
  );
};

export default Game;
