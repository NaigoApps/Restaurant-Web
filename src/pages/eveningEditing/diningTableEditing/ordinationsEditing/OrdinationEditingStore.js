import OrdinationsEditorActions from "./OrdinationsEditorActions";
import DiningTablesEditorActions from "../DiningTablesEditorActions";
import EveningEditorActions from "../../EveningEditorActions";
import AbstractStore from "../../../../stores/AbstractStore";
import EveningSelectorActions from "../../eveningSelection/EveningSelectorActions";
import dataStore, {Topics} from "../../../../stores/DataStore";
import CRUDStatus from "../../../../utils/CRUDStatus";
import OrdersEditorActions from "./OrdersEditorActions";

const EVT_ORDINATION_EDITOR_CHANGED = "EVT_ORDINATION_EDITOR_CHANGED";

class OrdinationEditingStore extends AbstractStore {
    constructor() {
        super("ordinationEditing", EVT_ORDINATION_EDITOR_CHANGED, dataStore);
        this.init();
    }

    init() {
        this.currentOrdination = null;
        this.crudStatus = CRUDStatus.RETRIEVE;
        this.wizardData = {};
        this.aborting = false;
        this.options = null;
        this.resetWizard();
    }

    buildState() {
        return {
            currentOrdination: this.currentOrdination,
            crudStatus: this.crudStatus,
            wizardData: this.wizardData,
            aborting: this.aborting,
            options: this.options,
        };
    }

    getActionsClass() {
        return OrdinationsEditorActions;
    }

    getActionCompletedHandlers() {
        const handlers = {};

        this.addCRUDHandlers(handlers);
        this.addWizardHandlers(handlers);

        AbstractStore.assign(handlers, [
            EveningEditorActions.GET_SELECTED,
            EveningEditorActions.DESELECT_EVENING,
            EveningEditorActions.SHOW_EVENING_REVIEW,
            EveningSelectorActions.CHOOSE,
            DiningTablesEditorActions.CRUD.SELECT,
            DiningTablesEditorActions.CRUD.DESELECT,
        ], () => this.init());

        handlers[OrdersEditorActions.SET_ADDITIONS_PAGE] = (page) => {
            this.wizardData.additionsPage = page
        };

        return handlers;
    }

    addWizardHandlers(handlers) {
        handlers[OrdinationsEditorActions.WIZARD.SELECT_CATEGORY_PAGE] = (page) => this.wizardData.categoryPage = page;
        handlers[OrdinationsEditorActions.WIZARD.SELECT_DISH_PAGE] = (page) => this.wizardData.dishPage = page;
        handlers[OrdinationsEditorActions.WIZARD.SELECT_CATEGORY] = (cat) => this.wizardData.selectedCategory = cat;
        handlers[OrdinationsEditorActions.WIZARD.DESELECT_CATEGORY] = () => this.wizardData.selectedCategory = null;

        handlers[OrdinationsEditorActions.WIZARD.SET_QUANTITY] = (value) => this.wizardData.quantity = value;
        handlers[OrdinationsEditorActions.WIZARD.SET_PHASE] = (value) => this.wizardData.selectedPhase = value;

        handlers[OrdinationsEditorActions.WIZARD.SELECT_DISH] = () => {
            this.wizardData.quantity = 1;
            this.currentOrdination = dataStore.getEntity(this.currentOrdination.uuid);
        };
    }

    addCRUDHandlers(handlers) {

        handlers[OrdinationsEditorActions.CRUD.BEGIN_CREATION] = (data) => {
            this.currentOrdination = dataStore.getEntity(data.uuid);
            this.crudStatus = CRUDStatus.CREATE;
            this.resetWizard(true);
        };

        handlers[OrdinationsEditorActions.CRUD.ABORT_CREATION] = () => {
            this.currentOrdination = null;
            this.crudStatus = CRUDStatus.RETRIEVE;
            this.resetWizard(false);
        };

        handlers[OrdinationsEditorActions.CRUD.SELECT] = (ordination) => {
            this.currentOrdination = ordination;
            this.crudStatus = CRUDStatus.UPDATE;
            this.options = null;
            this.resetWizard(false);
        };

        handlers[OrdinationsEditorActions.CRUD.CREATE] = () => {
            this.currentOrdination = null;
            this.crudStatus = CRUDStatus.RETRIEVE;
            this.resetWizard(false);
        };

        handlers[OrdinationsEditorActions.SHOW_OPTIONS] = (ordinationUuid) => this.options = ordinationUuid;
        handlers[OrdinationsEditorActions.HIDE_OPTIONS] = () => this.options = false;

        handlers[OrdinationsEditorActions.PRINT_ORDINATION] = (ordination) => {
            this.currentOrdination = null;
            this.crudStatus = CRUDStatus.RETRIEVE;
            this.resetWizard(false);
            this.options = null;
        };

        handlers[OrdinationsEditorActions.CRUD.UPDATE] = () => {
            this.currentOrdination = null;
            this.crudStatus = CRUDStatus.RETRIEVE;
            this.resetWizard(false);
        };

        handlers[OrdinationsEditorActions.CRUD.DESELECT] = () => {
            this.currentOrdination = null;
            this.crudStatus = CRUDStatus.RETRIEVE;
            this.resetWizard(false);
        };

        handlers[OrdinationsEditorActions.CRUD.BEGIN_DELETION] = (ordination) => {
            this.crudStatus = CRUDStatus.DELETE;
            this.currentOrdination = ordination;
            this.options = null;
        };

        handlers[OrdinationsEditorActions.CRUD.ABORT_DELETION] = () => {
            this.currentOrdination = null;
            this.crudStatus = CRUDStatus.RETRIEVE;
        };

        handlers[OrdinationsEditorActions.CRUD.BEGIN_ABORTION] = (ordination) => {
            this.crudStatus = CRUDStatus.RETRIEVE;
            this.currentOrdination = ordination;
            this.aborting = true;
            this.options = null;
        };

        handlers[OrdinationsEditorActions.CRUD.ABORT_ABORTION] = () => {
            this.crudStatus = CRUDStatus.RETRIEVE;
            this.currentOrdination = null;
            this.aborting = false;
        };

        handlers[OrdinationsEditorActions.CRUD.ABORT] = () => {
            this.crudStatus = CRUDStatus.RETRIEVE;
            this.currentOrdination = null;
            this.aborting = false;
        };

        handlers[OrdinationsEditorActions.CRUD.DELETE] = () => {
            this.currentOrdination = null;
            this.crudStatus = CRUDStatus.RETRIEVE;
        }
    }

    resetWizard(visible) {
        this.wizardData = {
            visible: !!visible,
            selectedCategory: null,
            categoryPage: 0,
            additionsPage: 0,
            dishPage: 0,
            selectedPhase: dataStore.getEntities(Topics.PHASES)[0],
            quantity: 1
        }
    }

}

const ordinationEditingStore = new OrdinationEditingStore();
export default ordinationEditingStore;