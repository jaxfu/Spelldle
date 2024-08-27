import { createContext } from "react";
import { T_GUESS_MAP_IDS } from "../types/guesses";

const CtxGuessData =
	createContext<React.MutableRefObject<T_GUESS_MAP_IDS> | null>(null);

export default CtxGuessData;
