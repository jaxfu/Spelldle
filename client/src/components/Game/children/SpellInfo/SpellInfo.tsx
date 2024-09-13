import styles from "./SpellInfo.module.scss";
import type { T_CATEGORY_INFO } from "../../../../types/categories";
import {
	translateIdsToDisplay,
	type T_GUESS_CATEGORIES_IDS_MAP,
} from "../../../../types/guesses";
import type { T_Spell } from "../../../../types/spells";

interface IProps {
	spellInfo: T_Spell;
	categoryInfo: T_CATEGORY_INFO[];
}

function generateCells(
	categories: T_GUESS_CATEGORIES_IDS_MAP,
	categoryInfo: T_CATEGORY_INFO[],
): JSX.Element[] {
	const els: JSX.Element[] = categoryInfo.map((category) => {
		const ids = categories.get(category.id);
		if (ids !== undefined) {
			return (
				<div key={`spellInfo-${category.id}`} className={styles.cell}>
					<div className={styles.header}>{category.display_name}</div>
					<div className={styles.content}>
						<div className={styles.wrapper}>
							{translateIdsToDisplay(ids, category).map((value, i) => (
								<div key={`spellInfo-${category.id}-${i}`}>{value}</div>
							))}
						</div>
					</div>
				</div>
			);
		} else {
			console.log(
				`error in generateCells(), category key ${category.id} not found`,
			);
			return <div></div>;
		}
	});

	return els;
}

const SpellInfo: React.FC<IProps> = (props) => {
	return (
		<div className={styles.root}>
			{generateCells(props.spellInfo.categories, props.categoryInfo)}
		</div>
	);
};

export default SpellInfo;
