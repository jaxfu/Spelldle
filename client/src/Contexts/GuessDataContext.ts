import { createContext } from "react";
import { type T_GUESS_CATEGORIES } from "../methods/guesses";

const GuessDataContext =
	createContext<React.MutableRefObject<T_GUESS_CATEGORIES> | null>(null);

export default GuessDataContext;
