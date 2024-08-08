import styles from "./Components.module.scss";
import GuessDataContext from "../../../../../../../../Contexts/GuessDataContext";
import { useContext } from "react";
import { T_CATEGORY_INFO } from "../../../../../../../../methods/categories";

interface IProps {
	categoryInfo: T_CATEGORY_INFO;
}

const Components: React.FC<IProps> = (props) => {
	const guessData = useContext(GuessDataContext);

	function updateGuessCategoriesMap(
		e: React.ChangeEvent<HTMLInputElement>,
		valueId: number,
	) {
		if (guessData !== null) {
			const currentArr = guessData.current.get(props.categoryInfo.name);
			if (currentArr !== undefined) {
				let newArr = [...(currentArr as number[])];

				if (e.target.checked) {
					newArr.push(valueId);
				} else newArr = newArr.filter((comp) => comp !== valueId);

				guessData.current.set(props.categoryInfo.name, newArr.sort());
			}
		}
	}

	return (
		<div className={styles.root}>
			<div className={styles.checkbox_root}>
				{props.categoryInfo.values.map((value) => {
					const lowerCase = value.toLowerCase();
					const valueId = props.categoryInfo.values_map.get(lowerCase);

					if (valueId !== undefined) {
						return (
							<span key={lowerCase}>
								<label htmlFor={lowerCase}>{value}</label>
								<input
									type="checkbox"
									name={lowerCase}
									id={lowerCase}
									onChange={(e) => {
										updateGuessCategoriesMap(e, valueId);
									}}
								/>
							</span>
						);
					}
				})}
				{/* <span> */}
				{/*   <label htmlFor="v">V</label> */}
				{/*   <input */}
				{/*     type="checkbox" */}
				{/*     name="v" */}
				{/*     id="v" */}
				{/*     onChange={(e) => { */}
				{/*       console.log(e.target.id) */}
				{/*     }} */}
				{/*   /> */}
				{/* </span> */}
				{/* <span> */}
				{/*   <label htmlFor="s">S</label> */}
				{/*   <input */}
				{/*     type="checkbox" */}
				{/*     name="s" */}
				{/*     id="s" */}
				{/*     onChange={(e) => { */}
				{/**/}
				{/*     }} */}
				{/*   /> */}
				{/* </span> */}
				{/* <span> */}
				{/*   <label htmlFor="m">M</label> */}
				{/*   <input */}
				{/*     type="checkbox" */}
				{/*     name="m" */}
				{/*     id="m" */}
				{/*     onChange={(e) => { */}
				{/**/}
				{/*     }} */}
				{/*   /> */}
				{/* </span> */}
			</div>
		</div>
	);
};

export default Components;
