const initialState = {
    username:"",
    newpassword: "",
    confirmpassword: ""
};
const forgotuserdetails = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGEFORGOTUSER": return {
            ...state,
            username: action.payloadOne,
            newpassword: action.payloadTwo,
            confirmpassword: action.payloadThree

        };
        default: return state;
    }
}
export default forgotuserdetails;