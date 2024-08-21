import { createContext } from "react";
import { T_GUESSES_AS_IDS } from "../types/guesses";

const CtxGuessData =
	createContext<React.MutableRefObject<T_GUESSES_AS_IDS> | null>(null);

export default CtxGuessData;
