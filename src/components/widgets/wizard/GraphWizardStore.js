import AbstractStore from "../../../stores/AbstractStore";
import {
    ACT_GRAPH_WIZARD_ABORT, ACT_GRAPH_WIZARD_CLOSE,
    ACT_GRAPH_WIZARD_CONFIRM, ACT_GRAPH_WIZARD_LOCK, ACT_GRAPH_WIZARD_MOVE_PAGE, ACT_GRAPH_WIZARD_OPEN,
    ACT_GRAPH_WIZARD_SET_DATA,
    ACT_GRAPH_WIZARD_UNLOCK,
    ACT_RESET_GRAPH_WIZARD
} from "./GraphWizardActions";
import {uuid} from "../../../utils/Utils";

const EVT_GRAPH_WIZARD_CHANGED = "EVT_GRAPH_WIZARD_CHANGED";

class GraphWizardStore extends AbstractStore {

    constructor() {
        super();
        this.wizardsData = new Map();
    }

    getState() {
        return this.wizardsData;
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case ACT_GRAPH_WIZARD_SET_DATA: {
                let wizardData = this.wizardsData.get(action.body.uuid);
                if (action.body.page) {
                    wizardData.data[action.body.page] = action.body.data;
                } else {
                    wizardData.data = action.body.data;
                }
                break;
            }
            case ACT_GRAPH_WIZARD_MOVE_PAGE: {
                let wizardData = this.wizardsData.get(action.body.uuid);
                wizardData.page = action.body.page;
                break;
            }
            case ACT_RESET_GRAPH_WIZARD: {
                this.wizardsData.set(action.body.uuid, {
                    uuid: action.body.uuid,
                    page: action.body.initialPage,
                    data: action.body.initialData,
                    confirmed: false,
                    open: false
                });
                break;
            }
            case ACT_GRAPH_WIZARD_CONFIRM: {
                let wizardData = this.wizardsData.get(action.body);
                wizardData.open = false;
                wizardData.confirmed = true;
                break;
            }
            case ACT_GRAPH_WIZARD_ABORT: {
                let wizardData = this.wizardsData.get(action.body);
                wizardData.open = false;
                wizardData.confirmed = false;
                break;
            }
            case ACT_GRAPH_WIZARD_OPEN: {
                let wizardData = this.wizardsData.get(action.body);
                wizardData.open = true;
                break;
            }
            case ACT_GRAPH_WIZARD_CLOSE: {
                let wizardData = this.wizardsData.get(action.body);
                wizardData.open = false;
                break;
            }
            case ACT_GRAPH_WIZARD_UNLOCK:{
                let wizardData = this.wizardsData.get(action.body);
                wizardData.locked = false;
                break;
            }
            case ACT_GRAPH_WIZARD_LOCK:{
                let wizardData = this.wizardsData.get(action.body);
                wizardData.locked = true;
                break;
            }

            default:
                changed = false;
                break;
        }
        return changed;
    }

    getChangeEvent() {
        return EVT_GRAPH_WIZARD_CHANGED;
    }
}

const graphWizardStore = new GraphWizardStore();

export default graphWizardStore;