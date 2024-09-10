import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Routes, Route } from "react-router-dom";
import ContentBox from "../../../ContentBox/ContentBox";
import Game from "../../../Game/Game";
import Login from "../../../Login/Login";
import Register from "../../../Register/Register";
import GuessInfoButton from "../../../DEBUG/GuessInfoButton/GuessInfoButton";

interface IProps {
	showingPostGame: boolean;
	setShowingPostGame: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminApp: React.FC<IProps> = (props) => {
	return (
		<>
			<ReactQueryDevtools initialIsOpen={false} />
			<GuessInfoButton />

			<Game
				showingPostGame={props.showingPostGame}
				setShowingPostGame={props.setShowingPostGame}
			/>
		</>
	);
};

export default AdminApp;
