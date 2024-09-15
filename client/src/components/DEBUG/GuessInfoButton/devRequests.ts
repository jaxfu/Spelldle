import axios from "axios";

interface IParamObject {
	accessToken: string;
	category_info: any;
	name: string;
}

const ROUTE: string = import.meta.env.DEV
	? "http://localhost:5000/api/addSpell"
	: "/api/addSpell";

const devRequests = {
	addSpell: async function (paramObject: IParamObject) {
		return await axios({
			method: "POST",
			url: ROUTE,
			data: {
				name: paramObject.name,
				...paramObject.category_info,
			},
			headers: {
				Authorization: `Bearer ${paramObject.accessToken}`,
			},
		});
	},
};

export default devRequests;
