import { createContext } from "react";
import { T_GUESS_CELLS_STATE } from "../types/guesses";

const GuessCellsStateContext =
	createContext<React.MutableRefObject<T_GUESS_CELLS_STATE> | null>(null);

export default GuessCellsStateContext;
