import {NavigateFunction} from "react-router-dom";

function protectPage(validationCompleted: boolean, loggedIn: boolean, navigate: NavigateFunction): void {
    if (validationCompleted && !loggedIn) navigate("/login")
}

export default protectPage;