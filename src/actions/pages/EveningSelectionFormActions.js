import {ACT_SELECT_EVENING, ACT_UPDATE_EVENING_DATE} from "../ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../RequestBuilder";
import diningTablesActions from "../../pages/evening/DiningTablesActions";

class EveningSelectionFormActions {

    updateEveningDate(date){
        dispatcher.fireEnd(ACT_UPDATE_EVENING_DATE, date);
    }

    chooseEvening(date) {
        asyncActionBuilder.get(ACT_SELECT_EVENING, 'evenings', {date: date})
            .then(diningTablesActions.retrieveDiningTables);
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