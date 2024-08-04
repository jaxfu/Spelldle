import styles from "./GuessInfoButton.module.scss";
import { type T_GUESS_CATEGORIES } from "../../../methods/guesses";
import { createRequestObjectFromCurrentGuessInfo } from "../../../utils/methods";
import { type T_CATEGORY_INFO } from "../../../methods/categories";
import { useContext } from "react";
import GuessDataContext from "../../../Contexts/GuessDataContext";

// interface IProps {
// 	allCurrentGuessInfo: T_GUESS_CATEGORIES;
// 	categoryInfo: T_CATEGORY_INFO[];
// }

const GuessInfoButton: React.FC = () => {
  const currentGuessInfo = useContext(GuessDataContext);

  return (
    <div
      className={styles.root}
      onClick={() => {
        console.log("CURRENT GUESSINFO: ");
        currentGuessInfo && console.log(currentGuessInfo?.current);
      }}
    >
      <h1>GI</h1>
    </div>
  );
};

export default GuessInfoButton;
