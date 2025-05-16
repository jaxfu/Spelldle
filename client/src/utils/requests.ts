import axios, { AxiosResponse } from "axios";
import {
	type T_APIRESULT_LOGIN,
	type T_USERINPUT_LOGIN,
	type T_APIRESULT_REGISTER,
	type T_USERINPUT_REGISTER,
	type T_APIRESULT_VALIDATE_ACCESS_TOKEN,
} from "../types";
import {
	type T_GUESS_CATEGORIES_IDS_MAP,
	type T_PAST_GUESS_CATEGORIES_MAP,
	type T_PAST_GUESS_SPELLS,
} from "../types/guesses";
import { type T_TOKENS } from "../types";
import type { T_GAME_SESSION } from "../types/gameSession";
import type { T_Spell } from "../types/spells";

// Routes
const ROUTE_PREFIX: string = import.meta.env.DEV ? "http://localhost:5000" : "";
const API_ROUTES = {
	LOGIN: ROUTE_PREFIX + "/api/login",
	REGISTER: ROUTE_PREFIX + "/api/register",
	VALIDATE: ROUTE_PREFIX + "/api/validateSession",
	MAKE_GUESS_CATEGORY: ROUTE_PREFIX + "/api/makeGuess/category",
	MAKE_GUESS_SPELL: ROUTE_PREFIX + "/api/makeGuess/spell",
	GET_GAME_SESSION_INFO: ROUTE_PREFIX + "/api/getGameSessionInfo",
	SPAWN_NEW_GAME_SESSION: ROUTE_PREFIX + "/api/spawnNewGameSession",
	GET_CORRECT_SPELL_INFO: ROUTE_PREFIX + "/api/getCorrectSpellInfo",
	GET_SPELL_LIST: ROUTE_PREFIX + "/api/getSpellList",
};

export async function apiRequestLogin(
	userInput: T_USERINPUT_LOGIN,
): Promise<AxiosResponse<T_APIRESULT_LOGIN>> {
	return await axios<T_APIRESULT_LOGIN>({
		method: "POST",
		url: API_ROUTES.LOGIN,
		data: {
			...userInput,
		},
	});
}

export async function apiRequestRegister(
	userInput: T_USERINPUT_REGISTER,
): Promise<AxiosResponse<T_APIRESULT_REGISTER>> {
	return await axios<T_APIRESULT_REGISTER>({
		method: "POST",
		url: API_ROUTES.REGISTER,
		data: {
			username: userInput.username,
			password: userInput.password,
			first_name: userInput.first_name,
			last_name: userInput.last_name,
		},
	});
}

export async function apiRequestValidateSession(
	userDataTokens: T_TOKENS,
): Promise<AxiosResponse<T_APIRESULT_VALIDATE_ACCESS_TOKEN>> {
	console.log("Running apiRequestValidateSession");
	return await axios<T_APIRESULT_VALIDATE_ACCESS_TOKEN>({
		method: "POST",
		url: API_ROUTES.VALIDATE,
		headers: {
			Authorization: `Bearer ${userDataTokens.access_token}`,
		},
	});
}

interface T_ARG_APIREQUEST_MAKE_GUESS_CATEGORY {
	accessToken: string;
	guessData: T_GUESS_CATEGORIES_IDS_MAP;
}

export async function apiRequestMakeGuessCategory(
	paramObject: T_ARG_APIREQUEST_MAKE_GUESS_CATEGORY,
): Promise<AxiosResponse<string>> {
	console.log(paramObject.guessData);
	// TODO: temp fix
	const obj = {
		...Object.fromEntries(paramObject.guessData),
		effects: [0],
		target: 0,
	};
	console.log(obj);
	// Todo: temp fix
	return await axios<string>({
		method: "POST",
		url: API_ROUTES.MAKE_GUESS_CATEGORY,
		data: {
			...obj,
		},
		headers: {
			Authorization: `Bearer ${paramObject.accessToken}`,
		},
	});
}

interface T_ARG_APIREQUEST_MAKE_GUESS_SPELL {
	accessToken: string;
	spell_id: number;
}

type T_APIRESPONSE_MAKE_GUESS_SPELL = {
	correct: boolean;
};

export async function apiRequestMakeGuessSpell(
	paramObject: T_ARG_APIREQUEST_MAKE_GUESS_SPELL,
): Promise<AxiosResponse<T_APIRESPONSE_MAKE_GUESS_SPELL>> {
	return await axios<T_APIRESPONSE_MAKE_GUESS_SPELL>({
		method: "POST",
		url: API_ROUTES.MAKE_GUESS_SPELL,
		data: {
			spell_id: paramObject.spell_id,
		},
		headers: {
			Authorization: `Bearer ${paramObject.accessToken}`,
		},
	});
}

export async function apiRequestGetGameSessionInfo(
	accessToken: string,
): Promise<T_GAME_SESSION> {
	const res = await axios<T_GAME_SESSION>({
		method: "POST",
		url: API_ROUTES.GET_GAME_SESSION_INFO,
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	let guessCategories: T_PAST_GUESS_CATEGORIES_MAP[] = [];
	let guessSpells: T_PAST_GUESS_SPELLS = [];
	let spells: string[] = [];

	if (res.data.guesses.categories.length > 0) {
		guessCategories = res.data.guesses.categories.map((guess) => {
			return new Map(Object.entries(guess));
		});
	}

	if (res.data.guesses.spells.length > 0) {
		guessSpells = res.data.guesses.spells;
	}
	return {
		guesses: {
			categories: guessCategories,
			spells: guessSpells,
			correct: res.data.guesses.correct,
		},
	};
}

export async function apiRequestGetSpellList(
	accessToken: string,
): Promise<AxiosResponse<string[]>> {
	console.log("running apiRequestGetSpellList");
	return await axios<string[]>({
		method: "POST",
		url: API_ROUTES.GET_SPELL_LIST,
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
}

export async function apiRequestSpawnNewGameSession(
	accessToken: string,
): Promise<AxiosResponse<any>> {
	return await axios<any>({
		method: "POST",
		url: API_ROUTES.SPAWN_NEW_GAME_SESSION,
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
}

export async function apiRequestGetCorrectSpellInfo(
	accessToken: string,
): Promise<T_Spell> {
	console.log("running apiRequestGetCorrectSpellInfo");
	const res = await axios<T_Spell>({
		method: "POST",
		url: API_ROUTES.GET_CORRECT_SPELL_INFO,
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const spell: T_Spell = { ...res.data };
	spell.categories = new Map(Object.entries(spell.categories));

	return spell;
}
