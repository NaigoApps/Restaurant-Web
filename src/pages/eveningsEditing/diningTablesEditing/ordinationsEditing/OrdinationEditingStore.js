import SubFeatureStore from "../../../../stores/SubFeatureStore";
import eveningPageStore from "../../EveningPageStore";
import {EditorStatus} from "../../../StoresUtils";
import eveningStore from "../../../../stores/EveningStore";
import diningTablesEditingStore from "../DiningTableEditorStore";
import {findByUuid} from "../../../../utils/Utils";
import {EntitiesUtils} from "../../../../utils/EntitiesUtils";
import {OrdinationCreatorActionTypes} from "./OrdinationsCreatorActions";
import {OrdinationEditorActionTypes} from "./OrdinationsEditorActions";
import {OrdersActions, OrdersActionTypes} from "./ordersEditing/OrdersActions";
import {DiningTablesEditorActionTypes} from "../DiningTablesEditorActions";

const {Map, List, fromJS} = require('immutable');

class OrdinationEditingStore extends SubFeatureStore {
    constructor() {
        super(eveningPageStore, "ordinationEditing");
        this.init();
    }

    init(){
        this.page = 0;
        this.status = EditorStatus.SURFING;
        this.ordination = null;
        this.ordinationEditor = this.resetOrdinationEditor();
        this.deletingOrdination = false;
    }

    getState() {
        return Map({
            status: this.status,
            page: this.page,
            ordination: this.getSelectedOrdination(),
            ordinationEditor: this.ordinationEditor,
            deletingOrdination: this.deletingOrdination
        })
    }

    getActions() {
        return Object.values(OrdinationCreatorActionTypes)
            .concat(Object.values(OrdinationEditorActionTypes));
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case DiningTablesEditorActionTypes.SELECT_DINING_TABLE:
                this.init();
                break;
            case OrdinationEditorActionTypes.SELECT_ORDINATION_PAGE:
                this.page = action.body;
                break;
            case OrdersActionTypes.BEGIN_ORDERS_EDITING:
                this.ordinationEditor = this.initOrdinationEditor(this.getSelectedOrdination());
                break;
            case OrdinationCreatorActionTypes.BEGIN_ORDINATION_CREATION:
                this.status = EditorStatus.CREATING;
                this.ordination = EntitiesUtils.newOrdination();
                this.ordinationEditor = this.initOrdinationEditor(this.getSelectedOrdination());
                break;
            case OrdinationCreatorActionTypes.CREATE_ORDINATION:
            case OrdinationEditorActionTypes.UPDATE_ORDERS:
                this.status = EditorStatus.EDITING;
                this.ordination = action.body.get('uuid');
                this.ordinationEditor = this.resetOrdinationEditor();
                break;
            case OrdinationEditorActionTypes.BEGIN_ORDINATION_EDITING:
                this.status = EditorStatus.EDITING;
                this.ordination = action.body;
                this.ordinationEditor = this.resetOrdinationEditor();
                break;
            case OrdinationEditorActionTypes.BEGIN_ORDINATION_DELETION:
                this.deletingOrdination = true;
                break;
            case OrdinationEditorActionTypes.ABORT_ORDINATION_DELETION:
                this.deletingOrdination = false;
                break;
                //FIXME
            // case ACT_DESELECT_EVENING:
            case OrdinationEditorActionTypes.DELETE_ORDINATION:
            case OrdinationEditorActionTypes.ABORT_ORDINATION_EDITING:
            case OrdinationCreatorActionTypes.ABORT_ORDINATION_CREATION:
                this.deletingOrdination = false;
                this.status = EditorStatus.SURFING;
                this.ordination = null;
                this.ordinationEditor = this.resetOrdinationEditor();
                break;
            case OrdinationEditorActionTypes.ABORT_ORDERS_EDITING:
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