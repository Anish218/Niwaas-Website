export const validUserName = new RegExp(
	'^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$'
);
export const validEmail = new RegExp(
	'^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$'
);
export const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');