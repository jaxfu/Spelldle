import styles from "./ResultCategory.module.scss";
import {
  E_GUESS_RESULT_OPTIONS,
  T_CATEGORY_GUESS_STATE_VALUES,
  T_GUESS_CATEGORIES_LEVEL,
  type T_CATEGORY_GUESS_STATE,
  type T_GUESS_CATEGORIES,
} from "../../../../../../../../methods/guesses";
import { E_CATEGORY_COMPONENT_TYPE } from "../../../../../../../../methods/categories";
import { useMemo } from "react";

export interface IProps {
  name: string;
  value: T_CATEGORY_GUESS_STATE_VALUES;
  result: number;
  categoryType: E_CATEGORY_COMPONENT_TYPE;
  values: string[];
}

const ResultCategory: React.FC<IProps> = (props) => {
  function translateValuesToStrings(): string[] {
    switch (props.categoryType) {
      case E_CATEGORY_COMPONENT_TYPE.SINGLE_TEXT:
        return [props.values[props.value as number]];
      case E_CATEGORY_COMPONENT_TYPE.MULTI_TEXT:
      case E_CATEGORY_COMPONENT_TYPE.COMPONENTS:
        if (Array.isArray(props.value)) {
          return props.value.map((v) => {
            return props.values[v];
          });
        }
        break;
      case E_CATEGORY_COMPONENT_TYPE.LEVEL:
        const v = { ...(props.value as T_GUESS_CATEGORIES_LEVEL) };
        return [props.values[v.level], v.is_ritual.toString()];
    }
    return [];
  }

  const colorClass: string = useMemo((): string => {
    switch (props.result) {
      case E_GUESS_RESULT_OPTIONS.INCORRECT:
        return "red";
      case E_GUESS_RESULT_OPTIONS.SLIGHTLY_CORRECT:
        return "orange"
      case E_GUESS_RESULT_OPTIONS.CORRECT:
        return "green"
    }
    return ""
  }, [props.result])

  return (
    <span className={styles.root} style={{ background: colorClass }}>
      <b>{props.name}</b>
      {/* <br /> */}
      {/* {translateValuesToStrings().map((value) => { */}
      {/*   return <span>{value}</span> */}
      {/* })} */}
    </span>
  );
};

export default ResultCategory;
