import React from "react";
import { Routes, Route } from "react-router-dom";
import ContentBox from "../../../ContentBox/ContentBox";
import Game from "../../../Game/Game";
import Login from "../../../Login/Login";
import Register from "../../../Register/Register";

interface IProps {
	isFetching: boolean;
	isSuccess: boolean;
	showingPostGame: boolean;
	setShowingPostGame: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserApp: React.FC<IProps> = (props) => {
	return (
		<>
			<ContentBox showingPostGame={props.showingPostGame}>
				<Routes>
					<Route
						path="/"
						element={
							<Game
								showingPostGame={props.showingPostGame}
								setShowingPostGame={props.setShowingPostGame}
							/>
						}
					/>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</ContentBox>
		</>
	);
};

export default UserApp;
