import React from "react";
import { Routes, Route } from "react-router-dom";
import ContentBox from "../../../ContentBox/ContentBox";
import Game from "../../../Game/Game";
import Login from "../../../Login/Login";
import Register from "../../../Register/Register";

interface IProps {
	showingPostGame: boolean;
	setShowingPostGame: React.Dispatch<React.SetStateAction<boolean>>;
	showingInfoPopup: boolean;
	setShowingInfoPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserApp: React.FC<IProps> = (props) => {
	return (
		<>
			<Game
				showingPostGame={props.showingPostGame}
				setShowingPostGame={props.setShowingPostGame}
				showingInfoPopup={props.showingInfoPopup}
				setShowingInfoPopup={props.setShowingInfoPopup}
			/>
		</>
	);
};

export default UserApp;
