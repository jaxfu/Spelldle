import styles from "./ResultCategory.module.scss";
import {
  T_CATEGORY_GUESS_STATE_VALUES,
} from "../../../../../../../../methods/guesses";

export interface IProps {
  name: string;
  value: T_CATEGORY_GUESS_STATE_VALUES;
  result: number;
}

const ResultCategory: React.FC<IProps> = (props) => {
  console.log(props.name)
  return (
    <div className={styles.root}>
      {props.name}: {props.result}
      <br />
      {JSON.stringify(props.value)}
    </div>
  );
};

export default ResultCategory;
