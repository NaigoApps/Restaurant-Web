import {EntitiesUtils} from "../../../../utils/EntitiesUtils";
import OrdinationsEditorActions from "./OrdinationsEditorActions";
import {OrdersActionTypes} from "./ordersEditing/OrdersActions";
import DiningTablesEditorActions from "../DiningTablesEditorActions";
import EveningEditorActions from "../../EveningEditorActions";
import EditorMode from "../../../../utils/EditorMode";
import AbstractStore from "../../../../stores/AbstractStore";
import StoresUtils from "../../../StoresUtils";
import EveningSelectorActions from "../../eveningSelection/EveningSelectorActions";

const EVT_ORDINATION_EDITOR_CHANGED = "EVT_ORDINATION_EDITOR_CHANGED";

class OrdinationEditingStore extends AbstractStore {
    constructor() {
        super("ordinationEditing", EVT_ORDINATION_EDITOR_CHANGED);
        this.init();
    }

    init() {
        this.page = 0;
        this.editor = StoresUtils.initEditor();
        this.deletingOrdination = false;
        this.ordinationEditor = this.resetOrdinationEditor();
    }

    buildState() {
        return {
            editor: this.editor,
            page: this.page,
            ordinationEditor: this.ordinationEditor,
            deletingOrdination: this.deletingOrdination
        }
    }

    getActionsClass() {
        return OrdinationsEditorActions;
    }

    getActionCompletedHandlers() {
        const handlers = {};

        AbstractStore.assign(handlers, [
            EveningEditorActions.GET_SELECTED,
            EveningEditorActions.DESELECT_EVENING,
            EveningEditorActions.SHOW_EVENING_REVIEW,
            EveningSelectorActions.CHOOSE,
            DiningTablesEditorActions.SELECT_DINING_TABLE,
        ], () => this.init());

        return handlers;
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case OrdinationsEditorActions.SELECT_ORDINATION_PAGE:
                this.page = action.body;
                break;
            case OrdersActionTypes.BEGIN_ORDERS_EDITING:
                this.ordinationEditor = this.initOrdinationEditor(this.getSelectedOrdination());
                break;
            case OrdinationsEditorActions.BEGIN_ORDINATION_CREATION:
                this.status = EditorMode.CREATING;
                this.ordination = EntitiesUtils.newOrdination();
                this.ordinationEditor = this.initOrdinationEditor(this.getSelectedOrdination());
                break;
            case OrdinationsEditorActions.CREATE_ORDINATION:
                this.status = EditorMode.EDITING;
                this.ordination = action.body.get('uuid');
                this.ordinationEditor = this.resetOrdinationEditor();
                break;
            case OrdinationsEditorActions.UPDATE_ORDERS:
                this.ordinationEditor = this.resetOrdinationEditor();
                break;
            case OrdinationsEditorActions.BEGIN_ORDINATION_EDITING:
                this.status = EditorMode.EDITING;
                this.ordination = action.body;
                this.ordinationEditor = this.resetOrdinationEditor();
                break;
            case OrdinationsEditorActions.BEGIN_ORDINATION_DELETION:
                this.deletingOrdination = true;
                break;
            case OrdinationsEditorActions.ABORT_ORDINATION_DELETION:
                this.deletingOrdination = false;
                break;
            //FIXME
            // case ACT_DESELECT_EVENING:
            case OrdinationsEditorActions.DELETE_ORDINATION:
            case OrdinationsEditorActions.ABORT_ORDINATION_EDITING:
            case OrdinationsEditorActions.ABORT_ORDINATION_CREATION:
                this.deletingOrdination = false;
                this.status = EditorMode.SURFING;
                this.ordination = null;
                this.ordinationEditor = this.resetOrdinationEditor();
                break;
            case OrdinationsEditorActions.ABORT_ORDERS_EDITING:
                this.ordinationEditor = this.resetOrdinationEditor();
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    resetOrdinationEditor() {
        const editor = this.initOrdinationEditor();
        editor.visible = false;
        return editor;
    }

    initOrdinationEditor(ordination) {
        return {
            orders: ordination ? ordination.get('orders') : [],
            visible: true
        }
    }

    getSelectedOrdination() {
        if (this.status === EditorMode.EDITING) {
            // let evening = eveningStore.getEvening().getPayload();
            // if (evening) {
            //     let table = diningTableEditingStore.getState().get('diningTable');
            //     if (table) {
            //         return findByUuid(table.get('ordinations'), this.ordination);
            //     }
            // }
        } else if (this.status === EditorMode.CREATING) {
            return this.ordination;
        }
        return null;
    }
}

const ordinationEditingStore = new OrdinationEditingStore();
export default ordinationEditingStore;