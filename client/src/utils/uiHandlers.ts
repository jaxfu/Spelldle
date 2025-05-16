export const togglePasswordLogin = (
	e: React.MouseEvent<HTMLButtonElement>,
): void => {
	const passwordBox = document.querySelector("#passwordBox");
	if (passwordBox) {
		const type =
			passwordBox.getAttribute("type") === "password" ? "text" : "password";
		passwordBox.setAttribute("type", type);
	}

	const eye3 = document.querySelector("#eye");
	if (eye3) {
		if (eye3.classList.contains("fa-eye-slash")) {
			eye3.classList.remove("fa-eye-slash");
		} else {
			eye3.classList.toggle("fa-eye-slash");
		}
	}
};

export const togglePasswordRegister1 = (
	e: React.MouseEvent<HTMLButtonElement>,
): void => {
	const password1 = document.querySelector("#password1");
	if (password1) {
		const type =
			password1.getAttribute("type") === "password" ? "text" : "password";
		password1.setAttribute("type", type);
	}
	const eye1 = document.querySelector("#eye1");
	if (eye1) {
		if (eye1.classList.contains("fa-eye-slash")) {
			eye1.classList.remove("fa-eye-slash");
		} else {
			eye1.classList.toggle("fa-eye-slash");
		}
	}
};

export const togglePasswordRegister2 = (
	e: React.MouseEvent<HTMLButtonElement>,
): void => {
	const password2 = document.querySelector("#password2");
	if (password2) {
		const type =
			password2.getAttribute("type") === "password" ? "text" : "password";
		password2.setAttribute("type", type);
	}
	const eye2 = document.querySelector("#eye2");
	if (eye2) {
		if (eye2.classList.contains("fa-eye-slash")) {
			eye2.classList.remove("fa-eye-slash");
		} else {
			eye2.classList.toggle("fa-eye-slash");
		}
	}
};
