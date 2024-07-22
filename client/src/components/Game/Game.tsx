import GuessBox from "./children/GuessBox/GuessBox";
import {
  type T_ALL_POSSIBLE_CATEGORIES_INFO,
  type T_ALL_CURRENT_GUESS_INFO,
} from "../../types";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/consts";
import {
  getUserSessionDataFromStorage,
} from "../../utils/methods";
import {
  apiRequestGetPastGuesses,
} from "../../utils/requests";

interface IProps {
  allCategoriesInfo: React.MutableRefObject<T_ALL_POSSIBLE_CATEGORIES_INFO>;
  allCurrentGuessInfo: React.MutableRefObject<T_ALL_CURRENT_GUESS_INFO>;
}

const Game: React.FC<IProps> = (props) => {
  const { data, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.pastGuesses],
    queryFn: () =>
      apiRequestGetPastGuesses(getUserSessionDataFromStorage().access_token),
  });

  if (isSuccess) {
    for (const guess of data.data) {
      console.log(`guess ${guess.round}: ${JSON.stringify(guess)}`);
    }
  }

  return (
    <>
      <GuessBox
        allCategoriesInfo={props.allCategoriesInfo}
        allCurrentGuessInfo={props.allCurrentGuessInfo}
      />
    </>
  );
};

export default Game;
