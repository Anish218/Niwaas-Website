export const changingStatus = (userStatus,userid,username,accessToken) => {
    return {
        type: "CHANGE",
        payloadOne: userStatus,
        payloadTwo:userid,
        payloadThree: username,
        payloadFour: accessToken
    }
}
export const settingbookingid = (bookingidtopay) => {
    return {
        type: "CHANGEBOOKINGID",
        payloadOne: bookingidtopay
    }
}
export const changingwhichbookingidtodisplay = (bookingid) => {
    return {
        type: "CHANGEWHICHBOOKINGID",
        payloadOne: bookingid
    }
}
export const changeforgotuserdetails = (forgotuser) => {
    return {
        type: "CHANGEFORGOTUSER",
        payloadOne: forgotuser.username,
        payloadTwo: forgotuser.newpassword,
        payloadThree: forgotuser.confirmpassword
    }
}
export const changeotpaccessstatus = (status) => {
    return {
        type: "CHANGEOTPACESSSTATUS",
        payloadOne: status
    }
}