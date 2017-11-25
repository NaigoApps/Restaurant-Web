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

    getState(){
        return this.wizardData;
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case ACT_GRAPH_WIZARD_SET_DATA: {
                if(action.body.page) {
                    this.wizardData.data[action.body.page] = action.body.data;
                }else{
                    this.wizardData.data = action.body.data;
                }
                break;
            }
            case ACT_GRAPH_WIZARD_MOVE_PAGE: {
                this.wizardData.page = action.body;
                break;
            }
            case ACT_RESET_GRAPH_WIZARD: {
                this.wizardData.data = action.body.initialData;
                this.wizardData.page = action.body.initialPage;
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