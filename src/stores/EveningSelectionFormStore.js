import {ACT_UPDATE_EVENING_DATE} from "../actions/ActionTypes";
import AbstractStore from "./AbstractStore";
import {formatDate} from "../components/widgets/inputs/DateInput";

export const EVT_EVENING_SELECTION_STORE_CHANGED = "EVT_EVENING_SELECTION_STORE_CHANGED";

class EveningSelectionFormStore extends AbstractStore {

    constructor() {
        super();
        this.date = formatDate(new Date());
    }

    setDate(value){
        this.date = value;
    }

    getDate(){
        return this.date;
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case ACT_UPDATE_EVENING_DATE:
                this.setDate(action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    getChangeEvent() {
        return EVT_EVENING_SELECTION_STORE_CHANGED;
    }

}

const eveningSelectionFormStore = new EveningSelectionFormStore();
export default eveningSelectionFormStore;