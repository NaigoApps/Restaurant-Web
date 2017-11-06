import AbstractStore from "../../../stores/AbstractStore";
import {ACT_GRAPH_WIZARD_MOVE_PAGE, ACT_GRAPH_WIZARD_SET_DATA, ACT_RESET_GRAPH_WIZARD} from "./GraphWizardActions";

const EVT_GRAPH_WIZARD_CHANGED = "EVT_GRAPH_WIZARD_CHANGED";

class GraphWizardStore extends AbstractStore {

    constructor() {
        super();
        this.wizardData = {
            page: null,
            data: {}
        };
    }

    getWizardData() {
        return this.wizardData;
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case ACT_GRAPH_WIZARD_SET_DATA: {
                this.wizardData.data = action.body;
                break;
            }
            case ACT_GRAPH_WIZARD_MOVE_PAGE: {
                let target = this.pagesData.find(page => page.identifier === action.body);
                if(!target.canEnter || target.canEnter(this.wizardData.data)) {
                    this.wizardData.page = action.body;
                }
                break;
            }
            case ACT_RESET_GRAPH_WIZARD: {
                this.pagesData = action.body.pagesData;
                this.wizardData.data = action.body.initialData;
                this.wizardData.page = 0;
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