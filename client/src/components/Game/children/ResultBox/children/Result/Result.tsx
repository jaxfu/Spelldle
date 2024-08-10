import styles from "./Result.module.scss";
import {
  T_GUESS_AND_RESULT,
  T_GUESS_AND_RESULT_VALUE,
} from "../../../../../../methods/guesses";
import ResultCategory from "./children/ResultCategory/ResultCategory";
import { useMemo } from "react";

interface IProps {
  guess: T_GUESS_AND_RESULT;
}

const Result: React.FC<IProps> = (props) => {
  const categoryMap = useMemo((): Map<string, T_GUESS_AND_RESULT_VALUE> => {
    const map: Map<string, T_GUESS_AND_RESULT_VALUE> = new Map();

    for (const [key, value] of Object.entries(props.guess)) {
      if (key === "round") {
        continue;
      } else {
        map.set(key, value as T_GUESS_AND_RESULT_VALUE);
      }
    }

    return map;
  }, [])

  const resultCategories = (): JSX.Element[] => {
    const resultCategories: JSX.Element[] = [];

    for (const [key, value] of categoryMap.entries()) {
      resultCategories.push(<ResultCategory key={key} name={key} result={value.result} value={value.value} />);
    }


    return resultCategories;
  }

  return (
    <div className={styles.root}>
      Round {props.guess.round}
      <div>
        {resultCategories()}
      </div>
    </div>
  );
};

export default Result;
