import styles from "./Result.module.scss";
import { type T_PAST_GUESS } from "../../../../../../types/guesses";
import ResultCategory from "./children/ResultCategory/ResultCategory";
import { useMemo } from "react";
import { type T_CATEGORY_INFO } from "../../../../../../types/categories";

interface IProps {
	guess: T_PAST_GUESS;
	categoriesInfoArr: T_CATEGORY_INFO[];
	round: number;
}

const Result: React.FC<IProps> = (props) => {
	const categoryMap = new Map(Object.entries(props.guess));

	const resultCategories = props.categoriesInfoArr.map(
		({ id, display_name, component_type, values }) => {
			const categoryInfo = categoryMap.get(id);

			if (categoryInfo !== undefined) {
				return (
					<ResultCategory
						key={`${props.round}-${id}`}
						round={props.round}
						id={id}
						display_name={display_name}
						result={categoryInfo.result}
						guessAsIds={categoryInfo.value}
						categoryType={component_type}
						values={values}
					/>
				);
			}
		},
	);

	// const categoryMap: Map<string, T_GUESS_AND_RESULT_VALUE> = useMemo(() => {
	//   const map: Map<string, T_GUESS_AND_RESULT_VALUE> = new Map();

	//   for (const [key, value] of Object.entries(props.guess)) {
	//     if (key === "round") {
	//       continue;
	//     } else if (key === "casting_time") {
	//       map.set("casting time", value as T_GUESS_AND_RESULT_VALUE);
	//     } else {
	//       map.set(key, value as T_GUESS_AND_RESULT_VALUE);
	//     }
	//   }

	//   return map;
	// }, []);

	// const resultCategories = props.categoriesInfoArr.map(
	//   ({ name, component_type, values }) => {
	//     const categoryInfo = categoryMap.get(name.toLowerCase());

	//     if (categoryInfo !== undefined) {
	//       return (
	//         <ResultCategory
	//           key={name}
	//           name={name}
	//           result={categoryInfo.result}
	//           value={categoryInfo.value}
	//           categoryType={component_type}
	//           values={values}
	//         />
	//       );
	//     }
	//   },
	// );

	return (
		<div className={styles.root}>
			<span className={styles.round}>
				<b>{props.round}</b>
			</span>
			{resultCategories}
			{/* {props.categoriesInfoArr.map((category) => {
        return (
          <span className={styles.cell} key={category.id}><b>{category.display_name}</b></span>
        )
      })} */}
		</div>
	);
};

export default Result;
