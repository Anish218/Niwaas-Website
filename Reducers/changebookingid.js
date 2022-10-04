
const initialState = {
    bookingidtopay: -1
};
const changebookingid = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGEBOOKINGID": return {
            ...state,
            bookingidtopay:action.payloadOne
        };
        default: return state;
    }
}
export default changebookingid;