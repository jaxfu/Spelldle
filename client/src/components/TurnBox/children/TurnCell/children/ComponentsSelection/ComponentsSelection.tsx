import styles from "./ComponentsSelection.module.scss";
import { T_SPELL_INFO } from "../../../../../../types";
import { useState } from "react";

interface IProps {
	setAllCurrentGuessInfo: React.Dispatch<React.SetStateAction<T_SPELL_INFO>>;
}

const ComponentsSelection: React.FC<IProps> = (props) => {
	function componentSelectionCheckboxStateHandler(
		e: React.ChangeEvent<HTMLInputElement>,
		component: string,
		setAllCurrentGuessInfo: React.Dispatch<React.SetStateAction<T_SPELL_INFO>>
	) {
		setAllCurrentGuessInfo((current) => {
			const COMPONENENTS_IDENTIFIER: string = "Components";
			const newMap = new Map(current);
			let currentComponentState: any = newMap.get(COMPONENENTS_IDENTIFIER);
			if (e.target.checked) currentComponentState.push(component);
			else {
				currentComponentState = currentComponentState.filter(
					(c: string) => c !== component
				);
			}
			newMap.set(COMPONENENTS_IDENTIFIER, currentComponentState);
			return newMap;
		});
	}

	return (
		<div className={styles.root}>
			<div className={styles.checkbox_root}>
				<span>
					<label htmlFor="v">V</label>
					<input
						type="checkbox"
						name="v"
						id="v"
						onChange={(e) => {
							componentSelectionCheckboxStateHandler(
								e,
								"v",
								props.setAllCurrentGuessInfo
							);
						}}
					/>
				</span>
				<span>
					<label htmlFor="s">S</label>
					<input
						type="checkbox"
						name="s"
						id="s"
						onChange={(e) => {
							componentSelectionCheckboxStateHandler(
								e,
								"s",
								props.setAllCurrentGuessInfo
							);
						}}
					/>
				</span>
				<span>
					<label htmlFor="m">M</label>
					<input
						type="checkbox"
						name="m"
						id="m"
						onChange={(e) => {
							componentSelectionCheckboxStateHandler(
								e,
								"m",
								props.setAllCurrentGuessInfo
							);
						}}
					/>
				</span>
			</div>
		</div>
	);
};

export default ComponentsSelection;
