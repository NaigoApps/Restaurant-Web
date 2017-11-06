import requestBuilder from "./RequestBuilder";
import {ACT_RETRIEVE_PHASES} from "./ActionTypes";


class PhasesActions {

    retrievePhases() {
        requestBuilder.get(ACT_RETRIEVE_PHASES, 'phases');
    }

}

const phasesActions = new PhasesActions();
export default phasesActions;