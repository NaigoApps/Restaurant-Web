import requestBuilder from "../../../actions/RequestBuilder";
import dispatcher from "../../../dispatcher/SimpleDispatcher";
import ActionsFactory from "../../../utils/ActionsFactory";
import {DataActions} from "../../../actions/DataActions";

console.log("DiningTablesEditorActions start " + ActionsFactory.actionId);

export default class DiningTablesEditorActions {
    static CRUD = {
        BEGIN_CREATION: ActionsFactory.next(),
        ABORT_CREATION: ActionsFactory.next(),
        CREATE: ActionsFactory.next(),
        SELECT: ActionsFactory.next(),
        DESELECT: ActionsFactory.next(),
        BEGIN_DELETION: ActionsFactory.next(),
        ABORT_DELETION: ActionsFactory.next(),
        DELETE: ActionsFactory.next(),
        UPDATE: {
            LOCAL: {
                CCS: ActionsFactory.next(),
                WAITER: ActionsFactory.next(),
                TABLE: ActionsFactory.next()
            },
            REMOTE: {
                CCS: ActionsFactory.next(),
                WAITER: ActionsFactory.next(),
                TABLE: ActionsFactory.next()
            }
        }
    };

    static MERGE = {
        BEGIN: ActionsFactory.next(),
        ABORT: ActionsFactory.next(),
        SELECT_TARGET: ActionsFactory.next(),
        SELECT_PAGE: ActionsFactory.next(),
        CONFIRM: ActionsFactory.next(),
    };

    static SHOW_ADVANCED = ActionsFactory.next();
    static HIDE_ADVANCED = ActionsFactory.next();

    static SELECT_PAGE = ActionsFactory.next();
    static SELECT_DINING_TABLE_TAB = "SELECT_DINING_TABLE_TAB";
    static PRINT_PARTIAL_BILL = "PRINT_PARTIAL_BILL";

    static beginCreation() {
        dispatcher.fireEnd(this.CRUD.BEGIN_CREATION);
    }

    static setEditorCoverCharges(ccs) {
        dispatcher.fireEnd(this.CRUD.UPDATE.LOCAL.CCS, ccs);
    }

    static setEditorWaiter(waiter) {
        dispatcher.fireEnd(this.CRUD.UPDATE.LOCAL.WAITER, waiter);
    }

    static setEditorTable(table) {
        dispatcher.fireEnd(this.CRUD.UPDATE.LOCAL.TABLE, table);
    }

    static abortCreation() {
        dispatcher.fireEnd(this.CRUD.ABORT_CREATION);
    }

    static selectPage(page) {
        dispatcher.fireEnd(this.SELECT_PAGE, page);
    }

    static select(table) {
        dispatcher.fireEnd(this.CRUD.SELECT, table);
        DataActions.loadOrdinations(table);
        DataActions.loadBills(table);
    }

    static updateCoverCharges(table, value) {
        requestBuilder.put(
            this.CRUD.UPDATE.REMOTE.CCS,
            'dining-tables/' + table.uuid + '/cover-charges',
            value.toString()
        );
    }

    static updateWaiter(uuid, waiter) {
        requestBuilder.put(
            this.CRUD.UPDATE.REMOTE.WAITER,
            'dining-tables/' + uuid + '/waiter',
            waiter
        );
    }

    static updateTable(uuid, table) {
        requestBuilder.put(
            this.CRUD.UPDATE.REMOTE.TABLE,
            'dining-tables/' + uuid + '/table',
            table
        );
    }

    static deselect() {
        dispatcher.fireEnd(this.CRUD.DESELECT);
    }

    static doCreate(table) {
        requestBuilder.post(this.CRUD.CREATE, 'dining-tables', table.toDto());
    }

    static beginDeletion() {
        dispatcher.fireEnd(this.CRUD.BEGIN_DELETION);
    }

    static abortDeletion() {
        dispatcher.fireEnd(this.CRUD.ABORT_DELETION);
    }

    static doDelete(table) {
        requestBuilder.remove(this.CRUD.DELETE, 'dining-tables/' + table.uuid)
            .then(DataActions.loadDiningTables());
    }

    static showAdvanced() {
        dispatcher.fireEnd(this.SHOW_ADVANCED);
    }

    static hideAdvanced() {
        dispatcher.fireEnd(this.HIDE_ADVANCED);
    }

    static beginMerge() {
        dispatcher.fireEnd(this.MERGE.BEGIN);
    }

    static selectMergeTarget(table) {
        dispatcher.fireEnd(this.MERGE.SELECT_TARGET, table);
    }

    static selectMergePage(page) {
        dispatcher.fireEnd(this.MERGE.SELECT_PAGE, page);
    }

    static abortMerge() {
        dispatcher.fireEnd(this.MERGE.ABORT);
    }

    static confirmMerge(src, dest) {
        requestBuilder.post(
            this.MERGE.CONFIRM,
            'dining-tables/' + src.uuid + '/merge/' + dest.uuid,
            src.toDto()
        ).then(() => {
            DataActions.loadOrdinations(dest);
            DataActions.loadBills(dest);
        });
    }


    static selectTab(tab) {
        dispatcher.fireEnd(this.SELECT_DINING_TABLE_TAB, tab);
    }

    //BILLS
    static printPartialBill(uuid) {
        requestBuilder.post(
            this.PRINT_PARTIAL_BILL,
            'dining-tables/print-partial-bill',
            uuid);
    }
};

console.log("DiningTablesEditorActions end " + ActionsFactory.actionId);