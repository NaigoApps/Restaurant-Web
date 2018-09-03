import SubFeatureStore from "../../../../stores/SubFeatureStore";
import eveningPageStore from "../../EveningPageStore";
import eveningStore from "../../../../stores/EveningStore";
import diningTableEditingStore from "../DiningTableEditorStore";
import {findByUuid} from "../../../../utils/Utils";
import {EntitiesUtils} from "../../../../utils/EntitiesUtils";
import {OrdinationCreatorActionTypes} from "./OrdinationsCreatorActions";
import {OrdinationEditorActionTypes} from "./OrdinationsEditorActions";
import {OrdersActionTypes} from "./ordersEditing/OrdersActions";
import {DiningTablesEditorActionTypes} from "../DiningTablesEditorActions";
import {EveningEditingActionTypes} from "../../EveningEditorActions";
import EditorMode from "../../../../utils/EditorMode";

const {Map, List, fromJS} = require('immutable');

class OrdinationEditingStore extends SubFeatureStore {
    constructor() {
        super(eveningPageStore, "ordinationEditing");
        this.init();
    }

    init(){
        this.page = 0;
        this.status = EditorMode.SURFING;
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
            case DiningTablesEditorActionTypes.DESELECT_DINING_TABLE:
            case DiningTablesEditorActionTypes.SELECT_DINING_TABLE:
            case EveningEditingActionTypes.DESELECT:
                this.init();
                break;
            case DiningTablesEditorActionTypes.BEGIN_ORDINATIONS_EDITING:
            case DiningTablesEditorActionTypes.BEGIN_DATA_EDITING:
            case DiningTablesEditorActionTypes.BEGIN_BILLS_EDITING:
                this.status = EditorMode.SURFING;
                this.ordination = null;
                break;
            case OrdinationEditorActionTypes.SELECT_ORDINATION_PAGE:
                this.page = action.body;
                break;
            case OrdersActionTypes.BEGIN_ORDERS_EDITING:
                this.ordinationEditor = this.initOrdinationEditor(this.getSelectedOrdination());
                break;
            case OrdinationCreatorActionTypes.BEGIN_ORDINATION_CREATION:
                this.status = EditorMode.CREATING;
                this.ordination = EntitiesUtils.newOrdination();
                this.ordinationEditor = this.initOrdinationEditor(this.getSelectedOrdination());
                break;
            case OrdinationCreatorActionTypes.CREATE_ORDINATION:
                this.status = EditorMode.EDITING;
                this.ordination = action.body.get('uuid');
                this.ordinationEditor = this.resetOrdinationEditor();
                break;
            case OrdinationEditorActionTypes.UPDATE_ORDERS:
                this.ordinationEditor = this.resetOrdinationEditor();
                break;
            case OrdinationEditorActionTypes.BEGIN_ORDINATION_EDITING:
                this.status = EditorMode.EDITING;
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
                this.status = EditorMode.SURFING;
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
        if(this.status === EditorMode.EDITING){
            let evening = eveningStore.getEvening().getPayload();
            if(evening){
                let table = diningTableEditingStore.getState().get('diningTable');
                if(table){
                    return findByUuid(table.get('ordinations'), this.ordination);
                }
            }
        }else if(this.status === EditorMode.CREATING){
            return this.ordination;
        }
        return null;
    }
}

const ordinationEditingStore = new OrdinationEditingStore();
export default ordinationEditingStore;