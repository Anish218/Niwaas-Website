import changeLoginStatus from "./changeLoginStatus";
import { combineReducers } from "redux";
import changebookingid from "./changebookingid";
import changewhichbookingtodisplay from "./changewhichbookingtodisplay"
import forgotuserdetails from "./forgotuserdetail";
import changeotpstatus from "./changeotpstatus";
const rootReducers = combineReducers({
    changeLoginStatus: changeLoginStatus,
    changebookingid: changebookingid,
    changewhichbookingtodisplay: changewhichbookingtodisplay,
    forgotuserdetails: forgotuserdetails,
    changeotpstatus: changeotpstatus
});
export default rootReducers;