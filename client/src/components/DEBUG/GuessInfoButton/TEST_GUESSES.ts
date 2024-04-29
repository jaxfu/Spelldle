export const TEST_GUESS_CORRECT: any = {
	school: 0,
	casting_time: 1,
	range: 2,
	target: 3,
	duration: [0, 0],
	level: [1, 1],
	components: [1, 2],
	class: [3, 4, 5],
	effects: [6, 7, 8, 9],
};

export const TEST_GUESS_INCORRECT: any = {
	school: 1,
	casting_time: 2,
	range: 1,
	target: 1,
	duration: [0, 0],
	level: [0, 0],
	components: [0],
	class: [0, 1],
	effects: [1, 2, 3, 4],
};

export const TEST_GUESS_SOME_CORRECT: any = {
	school: 1,
	casting_time: 1,
	range: 2,
	target: 3,
	duration: [0, 1],
	level: [0, 1],
	components: [0, 1],
	class: [3, 6, 7],
	effects: [6, 7, 1, 2],
};
