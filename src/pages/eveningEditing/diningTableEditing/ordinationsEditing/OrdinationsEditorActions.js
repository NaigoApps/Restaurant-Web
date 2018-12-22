import dispatcher from "../../../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../../../actions/RequestBuilder";
import ActionsFactory from "../../../../utils/ActionsFactory";
import {DataActions} from "../../../../actions/DataActions";

export const OrdinationEditorActionTypes = {};

export default class OrdinationsEditorActions {

    static CRUD = {
        BEGIN_CREATION: ActionsFactory.next(),
        ABORT_CREATION: ActionsFactory.next(),
        CREATE: ActionsFactory.next(),
        SELECT: ActionsFactory.next(),
        DESELECT: ActionsFactory.next(),
        BEGIN_DELETION: ActionsFactory.next(),
        DELETE: ActionsFactory.next(),
        ABORT_DELETION: ActionsFactory.next(),
        BEGIN_ABORTION: ActionsFactory.next(),
        ABORT: ActionsFactory.next(),
        ABORT_ABORTION: ActionsFactory.next(),
        UPDATE: ActionsFactory.next()
    };

    static WIZARD = {
        SELECT_CATEGORY_PAGE: ActionsFactory.next(),
        SELECT_DISH_PAGE: ActionsFactory.next(),
        SELECT_DISH: ActionsFactory.next(),
        SELECT_CATEGORY: ActionsFactory.next(),
        DESELECT_CATEGORY: ActionsFactory.next(),
        SET_QUANTITY: ActionsFactory.next(),
        SET_PHASE: ActionsFactory.next(),
    };

    static SHOW_OPTIONS = ActionsFactory.next();
    static HIDE_OPTIONS = ActionsFactory.next();

    static PRINT_ORDINATION = "PRINT_ORDINATION";


    static beginCreation(dto) {
        dispatcher.fireEnd(OrdinationsEditorActions.CRUD.BEGIN_CREATION, dto);
    }

    static abortOrdinationCreation(ordination) {
        dispatcher.fireEnd(OrdinationsEditorActions.CRUD.ABORT_CREATION, ordination);
    }

    static createOrdination(table, ordination) {
        asyncActionBuilder.post(
            OrdinationsEditorActions.CRUD.CREATE,
            'ordinations?table=' + table.uuid, ordination.toDto())
            .then(() => DataActions.loadDiningTables());
    }

    static showOptions(ordination) {
        dispatcher.fireEnd(this.SHOW_OPTIONS, ordination.uuid);
    }

    static hideOptions() {
        dispatcher.fireEnd(this.HIDE_OPTIONS);
    }

    static selectOrdination(ordination) {
        dispatcher.fireEnd(this.CRUD.SELECT, ordination);
    }

    static updateOrdination(ordination) {
        asyncActionBuilder.put(this.CRUD.UPDATE, 'ordinations/' + ordination.uuid, ordination.toDto())
            .then(() => DataActions.loadDiningTables());
    }

    static deselectOrdination(ordination) {
        dispatcher.fireEnd(this.CRUD.DESELECT, ordination);
    }

    static printOrdination(ordination) {
        asyncActionBuilder.post(
            OrdinationsEditorActions.PRINT_ORDINATION,
            'printers/print',
            ordination.uuid
        );
    }

    static beginOrdinationDeletion(ordination) {
        dispatcher.fireEnd(this.CRUD.BEGIN_DELETION, ordination);
    }

    static abortOrdinationDeletion() {
        dispatcher.fireEnd(this.CRUD.ABORT_DELETION);
    }

    static beginOrdinationAbortion(ordination) {
        dispatcher.fireEnd(this.CRUD.BEGIN_ABORTION, ordination);
    }

    static abortOrdination(ordination) {
        asyncActionBuilder.put(
            this.CRUD.ABORT,
            'ordinations/' + ordination.uuid + "/abort"
        );
    }

    static abortOrdinationAbortion() {
        dispatcher.fireEnd(this.CRUD.ABORT_ABORTION);
    }

    static deleteOrdination(ordination) {
        asyncActionBuilder.remove(
            this.CRUD.DELETE,
            'ordinations/' + ordination.uuid
        ).then((table) => {
            DataActions.loadDiningTables();
            DataActions.loadOrdinations(table);
            DataActions.loadBills(table);
        })
    }

    //Creation wizard

    static selectWizardCategoryPage(page) {
        dispatcher.fireEnd(OrdinationsEditorActions.WIZARD.SELECT_CATEGORY_PAGE, page);
    }

    static selectWizardDishPage(page) {
        dispatcher.fireEnd(OrdinationsEditorActions.WIZARD.SELECT_DISH_PAGE, page);
    }

    static selectWizardDish(dish, ordination, quantity, phase) {
        dispatcher.fireEnd(OrdinationsEditorActions.WIZARD.SELECT_DISH, {
            dish: dish,
            ordination: ordination,
            quantity: quantity,
            phase: phase
        });
    }

    static selectWizardCategory(cat) {
        dispatcher.fireEnd(OrdinationsEditorActions.WIZARD.SELECT_CATEGORY, cat);
    }

    static deselectWizardCategory() {
        dispatcher.fireEnd(OrdinationsEditorActions.WIZARD.DESELECT_CATEGORY);
    }

    static setWizardQuantity(quantity) {
        dispatcher.fireEnd(OrdinationsEditorActions.WIZARD.SET_QUANTITY, quantity);
    }

    static setWizardPhase(phase) {
        dispatcher.fireEnd(OrdinationsEditorActions.WIZARD.SET_PHASE, phase);
    }
};