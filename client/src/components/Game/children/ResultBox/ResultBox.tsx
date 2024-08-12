import { type T_GUESS_AND_RESULT } from "../../../../methods/guesses";
import { type T_CATEGORY_INFO } from "../../../../methods/categories";
import Result from "./children/Result/Result";
import styles from "./ResultBox.module.scss";

interface IProps {
  pastGuesses: T_GUESS_AND_RESULT[];
  categoriesInfoArr: T_CATEGORY_INFO[];
}

const ResultBox: React.FC<IProps> = (props) => {
  return (
    <div className={styles.root}>
      <div className={styles.row}>
        <span className={styles.cell}><b>Round</b></span>

        {props.categoriesInfoArr.map((category) => {
          return (
            <span className={styles.cell} key={category.name}><b>{category.name}</b></span>
          )
        })}
      </div>
      {props.pastGuesses.map((guess) => {
        return (
          <Result
            guess={guess}
            key={guess.round}
            categoriesInfoArr={props.categoriesInfoArr}
          />
        );
      })}
    </div>
  );
};

export default ResultBox;
