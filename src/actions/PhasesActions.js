import requestBuilder from "./RequestBuilder";
import {DataActionTypes} from "./DataActions";

class PhasesActions {

    retrievePhases() {
        requestBuilder.get(DataActionTypes.LOAD_PHASES, 'phases');
    }

}

const phasesActions = new PhasesActions();
export default phasesActions;