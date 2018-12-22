import dispatcher from "../../../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../../../actions/RequestBuilder";
import ActionsFactory from "../../../../utils/ActionsFactory";
import {DataActions} from "../../../../actions/DataActions";

export default class DiningTablesClosingActions {

    static CRUD = {
        BEGIN_CREATION: ActionsFactory.next(),
        ABORT_CREATION: ActionsFactory.next(),
        CREATE: ActionsFactory.next(),
        SELECT: ActionsFactory.next(),
        DESELECT: ActionsFactory.next(),
        BEGIN_DELETION: ActionsFactory.next(),
        ABORT_DELETION: ActionsFactory.next(),
        DELETE: ActionsFactory.next(),
        UPDATE: ActionsFactory.next()
    };

    static QUICK_BILL = ActionsFactory.next();

    static SHOW_OPTIONS = ActionsFactory.next();
    static HIDE_OPTIONS = ActionsFactory.next();

    static BEGIN_BILL_PRINTING = "BEGIN_BILL_PRINTING";
    static SELECT_PRINT_WIZARD_PAGE = "SELECT_PRINT_WIZARD_PAGE";
    static SELECT_BILL_TYPE = "SELECT_BILL_TYPE";
    static SELECT_PRINT_MODE = "SELECT_PRINT_MODE";
    static SELECT_CUSTOMER = "SELECT_CUSTOMER";
    static SELECT_CUSTOMER_PAGE = "SELECT_CUSTOMER_PAGE";
    static ABORT_BILL_PRINTING = "ABORT_BILL_PRINTING";
    static PRINT_BILL = "PRINT_BILL";

    static BEGIN_BILL_SOFT_PRINTING = "BEGIN_BILL_SOFT_PRINTING";
    static PRINT_SOFT_BILL = "PRINT_SOFT_BILL";

    static BACKWARD = "BACKWARD";
    static FORWARD = "FORWARD";

    static SET_SPLIT = "SET_SPLIT";
    static SET_FINAL_TOTAL = "SET_FINAL_TOTAL";
    static SET_PERCENT = "SET_PERCENT";

    static SET_QUICK = "SET_QUICK";

    static CLOSE_COVER_CHARGES = "CLOSE_COVER_CHARGES";
    static OPEN_COVER_CHARGES = "OPEN_COVER_CHARGES";
    static CLOSE_ALL_COVER_CHARGES = "CLOSE_ALL_COVER_CHARGES";
    static OPEN_ALL_COVER_CHARGES = "OPEN_ALL_COVER_CHARGES";

    static CLOSE_ORDERS = "CLOSE_ORDERS";
    static OPEN_ORDERS = "OPEN_ORDERS";
    static CLOSE_ALL_ORDERS = "CLOSE_ALL_ORDERS";
    static OPEN_ALL_ORDERS = "OPEN_ALL_ORDERS";

    static BEGIN_TABLE_LOCKING = "BEGIN_TABLE_LOCKING";
    static LOCK_TABLE = "LOCK_TABLE";
    static ABORT_TABLE_LOCKING = "ABORT_TABLE_LOCKING";

    static beginCreation(billDTO) {
        dispatcher.fireEnd(this.CRUD.BEGIN_CREATION, billDTO);
    }

    static quickBill(table) {
        asyncActionBuilder.post(
            DiningTablesClosingActions.QUICK_BILL,
            'bills/quick?table=' + table.uuid)
            .then(() => DataActions.loadDiningTables());
    }

    static abortCreation(bill) {
        dispatcher.fireEnd(this.CRUD.ABORT_CREATION, bill);
    }

    static showOptions(bill) {
        dispatcher.fireEnd(this.SHOW_OPTIONS, bill.uuid);
    }

    static hideOptions() {
        dispatcher.fireEnd(this.HIDE_OPTIONS);
    }

    static select(bill) {
        dispatcher.fireEnd(this.CRUD.SELECT, bill);
    }

    static deselect() {
        dispatcher.fireEnd(this.CRUD.DESELECT);
    }

    static backward() {
        dispatcher.fireEnd(this.BACKWARD);
    }

    static forward() {
        dispatcher.fireEnd(this.FORWARD);
    }

    static create(bill) {
        asyncActionBuilder.post(
            DiningTablesClosingActions.CRUD.CREATE,
            'bills?table=' + bill.table.uuid, bill.toDto())
            .then(() => DataActions.loadDiningTables());
    }

    static updateBill(bill) {
        asyncActionBuilder.put(this.CRUD.UPDATE, 'bills/' + bill.uuid, bill);
    }

    static setSplit(value) {
        dispatcher.fireEnd(this.SET_SPLIT, value);
    }

    static setFinalTotal(value) {
        dispatcher.fireEnd(this.SET_FINAL_TOTAL, value);
    }

    static setQuick(value) {
        dispatcher.fireEnd(this.SET_QUICK, value);
    }

    static setPercent(value) {
        dispatcher.fireEnd(this.SET_PERCENT, value);
    }

    static closeCoverCharges(quantity) {
        dispatcher.fireEnd(this.CLOSE_COVER_CHARGES, quantity);
    }

    static openCoverCharges(quantity) {
        dispatcher.fireEnd(this.OPEN_COVER_CHARGES, quantity);
    }

    static closeAllCoverCharges() {
        dispatcher.fireEnd(this.CLOSE_ALL_COVER_CHARGES);
    }

    static openAllCoverCharges() {
        dispatcher.fireEnd(this.OPEN_ALL_COVER_CHARGES);
    }

    static closeOrders(order, quantity) {
        dispatcher.fireEnd(this.CLOSE_ORDERS, {
            order: order,
            quantity: quantity
        });
    }

    static openOrders(order, quantity) {
        dispatcher.fireEnd(this.OPEN_ORDERS, {
            order: order,
            quantity: quantity
        });
    }

    static closeAllOrders() {
        dispatcher.fireEnd(this.CLOSE_ALL_ORDERS);
    }

    static openAllOrders() {
        dispatcher.fireEnd(this.OPEN_ALL_ORDERS);
    }

    static openAll() {
        this.openAllOrders();
        this.openAllCoverCharges();
    }

    static closeAll() {
        this.closeAllOrders();
        this.closeAllCoverCharges();
    }

    static beginBillPrinting(bill) {
        dispatcher.fireEnd(this.BEGIN_BILL_PRINTING, bill);
    }

    static selectPrintWizardBillType(value) {
        dispatcher.fireEnd(this.SELECT_BILL_TYPE, value);
    }

    static selectPrintWizardPrintMode(value) {
        dispatcher.fireEnd(this.SELECT_PRINT_MODE, value);
    }

    static setPrintWizardPage(page) {
        dispatcher.fireEnd(this.SELECT_PRINT_WIZARD_PAGE, page);
    }

    static selectInvoiceCustomer(customer) {
        dispatcher.fireEnd(this.SELECT_CUSTOMER, customer);
    }

    static selectInvoiceCustomerPage(page) {
        dispatcher.fireEnd(this.SELECT_CUSTOMER_PAGE, page);
    }

    static abortBillPrinting() {
        dispatcher.fireEnd(this.ABORT_BILL_PRINTING);
    }

    static printBill(bill, customer, generic) {
        asyncActionBuilder.post(
            this.PRINT_BILL,
            'bills/' + bill.uuid + '/print?generic=' + generic, customer ? customer.uuid : undefined)
            .then(() => DataActions.loadDiningTables());
    }


    static beginBillSoftPrinting(bill) {
        dispatcher.fireEnd(this.BEGIN_BILL_SOFT_PRINTING, bill);
    }

    static printSoftBill(bill, generic) {
        asyncActionBuilder.post(
            this.PRINT_SOFT_BILL,
            'bills/' + bill.uuid + '/soft-print?generic=' + generic);
    }

    static beginBillDeletion(bill) {
        dispatcher.fireEnd(this.CRUD.BEGIN_DELETION, bill);
    }

    static deleteBill(bill) {
        asyncActionBuilder.remove(
            this.CRUD.DELETE,
            'bills/' + bill.uuid)
            .then(() => DataActions.loadDiningTables());
    }

    static abortBillDeletion() {
        dispatcher.fireEnd(this.CRUD.ABORT_DELETION);
    }

    static beginLocking() {
        dispatcher.fireEnd(this.BEGIN_TABLE_LOCKING);
    }

    static lockTable(table) {
        asyncActionBuilder.post(
            this.LOCK_TABLE,
            'dining-tables/' + table.uuid + "/lock"
        ).then(DataActions.loadDiningTables());
    }

    static abortLocking() {
        dispatcher.fireEnd(this.ABORT_TABLE_LOCKING);
    }
};