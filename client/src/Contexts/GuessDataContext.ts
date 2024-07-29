import { createContext } from "react";
import {
	T_GUESS_CATEGORIES_MAP,
	type T_GUESS_CATEGORIES,
} from "../methods/guesses";

const GuessDataContext =
	createContext<React.MutableRefObject<T_GUESS_CATEGORIES_MAP> | null>(null);

export default GuessDataContext;
