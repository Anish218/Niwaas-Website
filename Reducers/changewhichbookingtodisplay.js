
const initialState = {
    bookingid: -1
};
const changewhichbookingtodisplay = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGEWHICHBOOKINGID": return {
            ...state,
            bookingid: action.payloadOne
        };
        default: return state;
    }
}
export default changewhichbookingtodisplay;