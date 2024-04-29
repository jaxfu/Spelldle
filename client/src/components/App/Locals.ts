import { LOCAL_STORAGE_KEYS } from "../../utils/consts";

const Locals = {
	checkAndSetShowingInfoPopup: function (
		setShowing: React.Dispatch<React.SetStateAction<boolean>>,
	): void {
		const status = localStorage.getItem(LOCAL_STORAGE_KEYS.show_info_popup);
		if (status !== "false") {
			setShowing(true);
		}
	},
};

export default Locals;
