import styles from "./ComponentsSelection.module.scss";
import { type T_SPELL_INFO } from "../../../../../../types";

interface IProps {
	allCurrentGuessInfo: React.MutableRefObject<T_SPELL_INFO>;
}

const ComponentsSelection: React.FC<IProps> = (props) => {
	function componentSelectionCheckboxStateHandler(
		e: React.ChangeEvent<HTMLInputElement>,
		component: string,
		allCurrentGuessInfo: React.MutableRefObject<T_SPELL_INFO>
	) {
		const COMPONENENTS_IDENTIFIER: string = "Components";
		let currentComponentState: any = allCurrentGuessInfo.current.get(
			COMPONENENTS_IDENTIFIER
		);
		if (e.target.checked) currentComponentState.push(component);
		else {
			currentComponentState = currentComponentState.filter(
				(c: string) => c !== component
			);
		}
		allCurrentGuessInfo.current.set(
			COMPONENENTS_IDENTIFIER,
			currentComponentState
		);
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
								props.allCurrentGuessInfo
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
								props.allCurrentGuessInfo
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
								props.allCurrentGuessInfo
							);
						}}
					/>
				</span>
			</div>
		</div>
	);
};

export default ComponentsSelection;
