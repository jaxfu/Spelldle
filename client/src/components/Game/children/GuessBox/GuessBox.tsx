import GuessCell from "./children/GuessCell/GuessCell";
import styles from "./GuessBox.module.scss";
import {
  type T_GUESS_ALL,
  type T_ALL_CURRENT_GUESS_INFO,
  type T_ALL_POSSIBLE_CATEGORIES_INFO,
} from "../../../../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  apiRequestGetPastGuesses,
  apiRequestMakeGuess,
  apiRequestValidateSession,
} from "../../../../utils/requests";
import { QUERY_KEYS } from "../../../../utils/consts";
import { getUserSessionDataFromStorage } from "../../../../utils/methods";
import { AxiosResponse } from "axios";

interface IProps {
  allCategoriesInfo: React.MutableRefObject<T_ALL_POSSIBLE_CATEGORIES_INFO>;
  allCurrentGuessInfo: React.MutableRefObject<T_ALL_CURRENT_GUESS_INFO>;
}

const GuessBox: React.FC<IProps> = (props) => {
  const queryClient = useQueryClient();

  const { data, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.pastGuesses],
    queryFn: (): Promise<AxiosResponse<T_GUESS_ALL[]>> =>
      apiRequestGetPastGuesses(getUserSessionDataFromStorage().access_token),
  });

  const mutation = useMutation({
    mutationFn: apiRequestMakeGuess,
    onSuccess: (data) => {
      console.log("SUCCESFUL MAKE_GUESS: " + data.data.toString());
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.pastGuesses] });
    },
  });

  {
    if (isSuccess) {
      console.log(`pastGuesses: ${JSON.stringify(data.data)}`)
      return (
        <div className={styles.root}>
          <GuessCell
            category_name={props.allCategoriesInfo.current.SCHOOL.name}
            category_values={props.allCategoriesInfo.current.SCHOOL.values}
            allCurrentGuessInfo={props.allCurrentGuessInfo}
          />
          <GuessCell
            category_name={props.allCategoriesInfo.current.LEVEL.name}
            category_values={props.allCategoriesInfo.current.LEVEL.values}
            allCurrentGuessInfo={props.allCurrentGuessInfo}
          />
          <GuessCell
            category_name={props.allCategoriesInfo.current.CASTING_TIME.name}
            category_values={
              props.allCategoriesInfo.current.CASTING_TIME.values
            }
            allCurrentGuessInfo={props.allCurrentGuessInfo}
          />
          <GuessCell
            category_name={props.allCategoriesInfo.current.RANGE.name}
            category_values={props.allCategoriesInfo.current.RANGE.values}
            allCurrentGuessInfo={props.allCurrentGuessInfo}
          />
          <GuessCell
            category_name={props.allCategoriesInfo.current.TARGET.name}
            category_values={props.allCategoriesInfo.current.TARGET.values}
            allCurrentGuessInfo={props.allCurrentGuessInfo}
          />
          <GuessCell
            category_name={props.allCategoriesInfo.current.DURATION.name}
            category_values={props.allCategoriesInfo.current.DURATION.values}
            allCurrentGuessInfo={props.allCurrentGuessInfo}
          />
          <GuessCell
            category_name={props.allCategoriesInfo.current.COMPONENTS.name}
            category_values={props.allCategoriesInfo.current.COMPONENTS.values}
            allCurrentGuessInfo={props.allCurrentGuessInfo}
          />
          <GuessCell
            category_name={props.allCategoriesInfo.current.CLASS.name}
            category_values={props.allCategoriesInfo.current.CLASS.values}
            allCurrentGuessInfo={props.allCurrentGuessInfo}
          />
          <GuessCell
            category_name={props.allCategoriesInfo.current.EFFECTS.name}
            category_values={props.allCategoriesInfo.current.EFFECTS.values}
            allCurrentGuessInfo={props.allCurrentGuessInfo}
          />
          <button
            onClick={() => {
              mutation.mutate({
                allCurrentGuessInfo: props.allCurrentGuessInfo.current,
                allCategoriesInfo: props.allCategoriesInfo.current,
                accessToken: getUserSessionDataFromStorage().access_token,
                gameSession: {
                  game_session_id: data.data[0].game_session_id,
                  current_round: data.data.length + 1,
                },
              });
            }}
          >
            Submit
          </button>
        </div>
      );
    }
  }
};

export default GuessBox;
