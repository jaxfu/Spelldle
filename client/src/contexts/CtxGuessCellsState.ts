import { createContext } from "react";
import { T_GUESS_CELLS_STATE } from "../types/guesses";

export interface I_CTX_GUESS_CELLS_STATE {
	state: T_GUESS_CELLS_STATE;
	setState: React.Dispatch<React.SetStateAction<T_GUESS_CELLS_STATE>>;
}

const CtxGuessCellsState = createContext<I_CTX_GUESS_CELLS_STATE | null>(null);

export default CtxGuessCellsState;
