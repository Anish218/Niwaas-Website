
const initialState = {
    otpstatus:false
};
const changeotpstatus = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGEOTPACESSSTATUS": return {
            ...state,
            otpstatus: action.payloadOne
        };
        default: return state;
    }
}
export default changeotpstatus;