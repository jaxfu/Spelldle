import TurnCell from "./children/TurnCell/TurnCell";
import styles from "./TurnBox.module.scss";
import CATEGORY_INFO from "../../CATEGORY_INFO";
import { useState } from "react";
import { T_SPELL_CATEGORY_INFO, NEW_SPELL_CATEGORY_INFO } from "../../types";
import * as methods from "../../utils/methods";

const TurnBox: React.FC = () => {
	const [currentGuessInfo, setCurrentGuessInfo] =
		useState<T_SPELL_CATEGORY_INFO>(
			methods.createNewObject(NEW_SPELL_CATEGORY_INFO)
		);

	function createNewGuessInfoObject(
		categoryName: string,
		newGuessInfo: any,
		currentGuessInfo: T_SPELL_CATEGORY_INFO
	): T_SPELL_CATEGORY_INFO {
		const newInfoObj: T_SPELL_CATEGORY_INFO =
			methods.createNewObject(currentGuessInfo);

		switch (categoryName) {
			case "School":
				newInfoObj.SCHOOL = newGuessInfo;
				break;
			case "Level":
				newInfoObj.LEVEL = newGuessInfo;
				break;
			case "Casting":
				newInfoObj.CASTING = newGuessInfo;
				break;
			case "Range":
				newInfoObj.RANGE = newGuessInfo;
				break;
			case "Target":
				newInfoObj.TARGET = newGuessInfo;
				break;
			case "Components":
				newInfoObj.COMPONENTS = newGuessInfo;
				break;
			case "Class":
				newInfoObj.CLASS = newGuessInfo;
				break;
			case "Effects":
				newInfoObj.EFFECTS = newGuessInfo;
				break;
		}

		return newInfoObj;
	}

	return (
		<div className={styles.root}>
			<TurnCell category={CATEGORY_INFO.SCHOOL} />
			<TurnCell category={CATEGORY_INFO.LEVEL} />
			<TurnCell category={CATEGORY_INFO.CASTING_TIME} />
			<TurnCell category={CATEGORY_INFO.RANGE} />
			<TurnCell category={CATEGORY_INFO.TARGET} />
			<TurnCell category={CATEGORY_INFO.COMPONENTS} />
			<TurnCell category={CATEGORY_INFO.CLASS} />
			<TurnCell category={CATEGORY_INFO.EFFECTS} />
		</div>
	);
};

export default TurnBox;
