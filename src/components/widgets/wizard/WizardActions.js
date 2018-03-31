import dispatcher from "../../../dispatcher/SimpleDispatcher";
import {
    ACT_DESTROY_WIZARD,
    ACT_INIT_WIZARD, ACT_WIZARD_ABORT,
    ACT_WIZARD_BACKWARD, ACT_WIZARD_CONFIRM,
    ACT_WIZARD_FORWARD,
    ACT_WIZARD_SET_DATA
} from "../../../actions/ActionTypes";

const {fromJS, Map} = require('immutable');

class WizardActions {

    // abort(uuid) {
    //     dispatcher.fireEnd(ACT_WIZARD_ABORT, fromJS({uuid: uuid}));
    // }

    backward(uuid) {
        dispatcher.fireEnd(ACT_WIZARD_BACKWARD, Map({uuid: uuid}));
    }

    forward(uuid) {
        dispatcher.fireEnd(ACT_WIZARD_FORWARD, Map({uuid: uuid}));
    }

    // confirm(uuid) {
    //     dispatcher.fireEnd(ACT_WIZARD_CONFIRM, fromJS({uuid: uuid}));
    // }

    setWizardData(uuid, pageData) {
        dispatcher.fireEnd(ACT_WIZARD_SET_DATA, fromJS({
            uuid: uuid,
            data: pageData
        }));
    }

    init(uuid, pages) {
        dispatcher.fireEnd(ACT_INIT_WIZARD, fromJS({
            uuid: uuid,
            pages: pages
        }));
    }

    destroy(uuid) {
        dispatcher.fireEnd(ACT_DESTROY_WIZARD, fromJS({
            uuid: uuid
        }));
    }

}

const wizardActions = new WizardActions();
export default wizardActions;