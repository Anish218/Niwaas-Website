import changeLoginStatus from "./changeLoginStatus";
import { combineReducers } from "redux";
import changebookingid from "./changebookingid";
import changewhichbookingtodisplay from "./changewhichbookingtodisplay"
const rootReducers = combineReducers({
    changeLoginStatus: changeLoginStatus,
    changebookingid: changebookingid,
    changewhichbookingtodisplay: changewhichbookingtodisplay
});
export default rootReducers;