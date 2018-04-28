import StoresUtils from "../../StoresUtils";
import {iGet, iSet} from "../../../utils/Utils";
import SubFeatureStore from "../../../stores/SubFeatureStore";
import eveningPageStore from "../EveningPageStore";
import {EveningSelectorActionTypes} from "./EveningSelectorActions";

const {Map} = require('immutable');

class EveningSelectorStore extends SubFeatureStore {

    constructor() {
        super(eveningPageStore, "eveningSelector");
        let date = new Date();
        this.month = date.getMonth();
        this.year = date.getFullYear();
    }

    getState() {
        return Map({
            month: this.month,
            year: this.year
        })
    }

    getActions() {
        return Object.values(EveningSelectorActionTypes);
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case EveningSelectorActionTypes.CONFIRM_MONTH:
                this.month = action.body;
                break;
            case EveningSelectorActionTypes.CONFIRM_YEAR:
                this.year = action.body;
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

}

const eveningSelectorStore = new EveningSelectorStore();
export default eveningSelectorStore;