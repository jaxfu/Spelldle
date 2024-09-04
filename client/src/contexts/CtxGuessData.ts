import { createContext } from "react";
import { T_GUESS_CATEGORIES_IDS_MAP } from "../types/guesses";
import { T_GAME_SESSION } from "../types/gameSession";

const CtxGameSession =
	createContext<React.MutableRefObject<T_GAME_SESSION> | null>(
		null,
	);

export default CtxGameSession;
