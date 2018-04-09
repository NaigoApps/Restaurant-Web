import {ACT_DESELECT_EVENING} from "../../../../actions/ActionTypes";
import SubFeatureStore from "../../../../stores/SubFeatureStore";
import eveningPageStore from "../../EveningPageStore";
import {EditorStatus} from "../../../StoresUtils";
import eveningStore from "../../../../stores/EveningStore";
import diningTablesEditingStore from "../DiningTableEditorStore";
import {findByUuid} from "../../../../utils/Utils";
import {EntitiesUtils} from "../../../../utils/EntitiesUtils";
import {OrdinationsActionTypes} from "./OrdinationsCreatorActions";

const {Map, List, fromJS} = require('immutable');

class OrdinationEditingStore extends SubFeatureStore {
    constructor() {
        super(eveningPageStore, "ordinationEditing");
        this.status = EditorStatus.SURFING;
        this.ordination = null;
        this.ordinationEditor = this.resetOrdinationEditor();
    }

    getState() {
        return Map({
            status: this.status,
            ordination: this.getSelectedOrdination(),
            ordinationEditor: this.ordinationEditor
        })
    }

    getActions() {
        return Object.values(OrdinationsActionTypes).concat([ACT_DESELECT_EVENING]);
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case OrdinationsActionTypes.BEGIN_ORDINATION_CREATION:
                this.status = EditorStatus.CREATING;
                this.ordination = EntitiesUtils.newOrdination();
                this.ordinationEditor = this.initOrdinationEditor(this.ordination);
                break;
            case OrdinationsActionTypes.ABORT_ORDINATION_CREATION:
                this.status = EditorStatus.SURFING;
                break;
                //FIXME
            case ACT_DESELECT_EVENING:
                this.status = EditorStatus.SURFING;
                this.ordination = null;
                this.ordinationEditor = this.resetOrdinationEditor();
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    resetOrdinationEditor(){
        return this.initOrdinationEditor().set('visible', false);
    }

    initOrdinationEditor(ordination){
        return Map({
            orders: ordination ? ordination.get('orders') : List(),
            visible: true
        })
    }

    getSelectedOrdination(){
        if(this.status === EditorStatus.EDITING){
            let evening = eveningStore.getEvening().getPayload();
            if(evening){
                let table = diningTablesEditingStore.getState().get('diningTable');
                if(table){
                    return findByUuid(table.get('ordinations'), this.ordination);
                }
            }
        }else if(this.status === EditorStatus.CREATING){
            return this.ordination;
        }
        return null;
    }
}

const ordinationEditingStore = new OrdinationEditingStore();
export default ordinationEditingStore;