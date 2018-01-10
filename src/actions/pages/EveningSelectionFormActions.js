import {ACT_DESELECT_EVENING, ACT_SELECT_EVENING, ACT_UPDATE_EVENING_DATE} from "../ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../RequestBuilder";

class EveningSelectionFormActions {

    updateEveningDate(date){
        dispatcher.fireEnd(ACT_UPDATE_EVENING_DATE, date);
    }

    chooseEvening(date) {
        asyncActionBuilder.get(ACT_SELECT_EVENING, 'evenings', {date: date});
    }

    deselectEvening(){
        dispatcher.fireEnd(ACT_DESELECT_EVENING);
    }

    printTest(){
        asyncActionBuilder.get(
            "foo",
            "evenings/print",
            {text : "test"}
        )
    }

}

const eveningSelectionFormActions = new EveningSelectionFormActions();

export default eveningSelectionFormActions;