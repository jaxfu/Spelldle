import styles from "./GuessInfoButton.module.scss";
import {
  type T_ALL_CURRENT_GUESS_INFO,
  type T_ALL_POSSIBLE_CATEGORIES_INFO,
} from "../../../types";
import { createRequestObjectFromCurrentGuessInfo } from "../../../utils/methods";

interface IProps {
  allCurrentGuessInfo: T_ALL_CURRENT_GUESS_INFO;
  categoryInfo: T_ALL_POSSIBLE_CATEGORIES_INFO;
}

const GuessInfoButton: React.FC<IProps> = (props) => {
  return (
    <div
      className={styles.root}
      onClick={() => {
        console.log("CURRENT GUESSINFO: {");
        props.allCurrentGuessInfo.forEach((value: any, key: any) => {
          console.log(`${key}: ${value}`);
        });
        console.log("}");

        createRequestObjectFromCurrentGuessInfo(
          props.allCurrentGuessInfo,
          props.categoryInfo,
        );
      }}
    >
      <h1>GI</h1>
    </div>
  );
};

export default GuessInfoButton;
