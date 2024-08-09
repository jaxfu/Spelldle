import { T_GUESS_CATEGORIES } from "../../../methods/guesses";

export const TEST_GUESS_CORRECT: T_GUESS_CATEGORIES = {
	school: 0,
	level: { level: 1, is_ritual: false },
	casting_time: 1,
	range: 2,
	target: 3,
	duration: 4,
	components: [1, 2],
	class: [3, 4, 5],
	effects: [6, 7, 8, 9],
};

export const TEST_GUESS_INCORRECT: T_GUESS_CATEGORIES = {
	school: 1,
	level: { level: 0, is_ritual: true },
	casting_time: 2,
	range: 4,
	target: 5,
	duration: 6,
	components: [3, 4],
	class: [7, 8, 9],
	effects: [1, 2, 3, 4],
};

export const TEST_GUESS_SOME_CORRECT: T_GUESS_CATEGORIES = {
	school: 1,
	level: { level: 1, is_ritual: true },
	casting_time: 1,
	range: 2,
	target: 3,
	duration: 4,
	components: [1, 3],
	class: [3, 6, 7],
	effects: [6, 7, 1, 2],
};
