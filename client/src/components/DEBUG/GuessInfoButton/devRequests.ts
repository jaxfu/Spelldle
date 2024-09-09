import axios from "axios";

interface IParamObject {
	accessToken: string;
	category_info: any;
	name: string;
}

const devRequests = {
	addSpell: async function (paramObject: IParamObject) {
		return await axios({
			method: "POST",
			url: "http://localhost:5000/api/addSpell",
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
