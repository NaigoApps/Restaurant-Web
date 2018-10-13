import dispatcher from "../dispatcher/SimpleDispatcher";

export default class ErrorActions{
    static CLEAR_ERROR_MESSAGES = "CLEAR_ERROR_MESSAGES";

    static clearErrorMessages(){
        dispatcher.fireEnd(this.CLEAR_ERROR_MESSAGES);
    }
}