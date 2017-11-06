import AbstractStore from "../../../stores/AbstractStore";
import {ACT_RESET_WIZARD, ACT_WIZARD_NEXT_STEP, ACT_WIZARD_PREVIOUS_STEP} from "./WizardActions";

const EVT_WIZARD_CHANGED = "EVT_WIZARD_CHANGED";

class WizardStore extends AbstractStore {

    constructor() {
        super();
        this.wizardData = {
            step: 0,
            data: []
        }
    }

    getWizardData() {
        return this.wizardData;
    }

    resetWizard() {
        return {
            step: 0,
            data: []
        }
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case ACT_WIZARD_NEXT_STEP: {
                this.wizardData.data.push(action.body);
                this.wizardData.step++;
                break;
            }
            case ACT_WIZARD_PREVIOUS_STEP: {
                this.wizardData.data.splice(this.wizardData.data.length - 1, 1);
                this.wizardData.step--;
                break;
            }
            case ACT_RESET_WIZARD: {
                this.wizardData = this.resetWizard(action.body);
                break;
            }
            default:
                changed = false;
                break;
        }
        return changed;
    }

    getChangeEvent() {
        return EVT_WIZARD_CHANGED;
    }
}

const wizardStore = new WizardStore();

export default wizardStore;