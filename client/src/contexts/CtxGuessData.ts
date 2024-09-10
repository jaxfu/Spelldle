import { createContext } from "react";
import { T_GUESS_CATEGORIES_IDS_MAP } from "../types/guesses";

export interface IGuessDataCtx {
	guessData: T_GUESS_CATEGORIES_IDS_MAP;
	setGuessData: React.Dispatch<
		React.SetStateAction<T_GUESS_CATEGORIES_IDS_MAP | undefined>
	>;
}

const CtxGuessData = createContext<IGuessDataCtx | null>(null);

export default CtxGuessData;
