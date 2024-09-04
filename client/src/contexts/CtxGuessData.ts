import { createContext } from "react";
import { T_GUESS_CATEGORIES_IDS_MAP } from "../types/guesses";

const CtxGuessData =
	createContext<React.MutableRefObject<T_GUESS_CATEGORIES_IDS_MAP> | null>(null);

export default CtxGuessData;
