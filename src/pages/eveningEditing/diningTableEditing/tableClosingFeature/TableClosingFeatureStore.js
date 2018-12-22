import DiningTablesUtils from "../../tables/DiningTablesUtils";
import OrdinationsUtils from "../../OrdinationsUtils";
import AbstractStore from "../../../../stores/AbstractStore";
import CRUDStatus from "../../../../utils/CRUDStatus";
import dataStore from "../../../../stores/DataStore";
import DiningTablesClosingActions from "./DiningTablesClosingActions";
import diningTableEditingStore from "../DiningTableEditorStore";
import OrdersEditorActions from "../ordinationsEditing/OrdersEditorActions";

const EVT_DINING_TABLE_CLOSING_WIZARD_STORE_CHANGED = "EVT_DINING_TABLE_CLOSING_WIZARD_STORE_CHANGED";

export const DiningTableClosingWizardPages = {
    FIX_PAGE: "FIX_PAGE",
    MODE_PAGE: "MODE_PAGE",
    SPLIT_PAGE: "SPLIT_PAGE",
    CUSTOMER_PAGE: "CUSTOMER_PAGE",
    REVIEW_PAGE: "REVIEW_PAGE",
};

const EVT_CLOSING_CHANGED = "EVT_CLOSING_CHANGED";

class TableClosingFeatureStore extends AbstractStore {

    constructor() {
        super("tableClosingFeature", EVT_CLOSING_CHANGED, dataStore);
        this.init();
        this.crudStatus = CRUDStatus.RETRIEVE;
    }

    init() {
        this.currentBill = null;
        this.options = null;

        this.billPage = 0;
        this.deletingBill = false;
        this.lockingTable = false;

        this.customer = null;
        this.customerPage = 0;
        this.resetClosingWizard();
        this.resetPrintWizard();
    }

    getActionsClass() {
        return DiningTablesClosingActions;
    }

    buildState() {
        return {
            crudStatus: this.crudStatus,

            currentBill: this.currentBill,
            options: this.options,

            lockingTable: this.lockingTable,
            deletingBill: this.deletingBill,

            closingWizard: this.closingWizard,
            printWizard: this.printWizard
        };
    }

    updatePages() {
        let pages = [];
        if(diningTableEditingStore.currentTable && diningTableEditingStore.currentTable.hasZeroPrices()){
            pages.push(DiningTableClosingWizardPages.FIX_PAGE);
        }else {
            if (this.crudStatus === CRUDStatus.CREATE) {
                pages.push(DiningTableClosingWizardPages.MODE_PAGE);
            }
            if (!this.closingWizard.quick || this.crudStatus === CRUDStatus.UPDATE) {
                pages.push(DiningTableClosingWizardPages.SPLIT_PAGE);
            }
            pages.push(DiningTableClosingWizardPages.REVIEW_PAGE);
        }
        this.closingWizard.pages = pages;
    }

    getActionCompletedHandlers() {
        const handlers = {};
        this.addCRUDHandlers(handlers);
        this.addClosingHandlers(handlers);
        return handlers;
    }


    addCRUDHandlers(handlers) {

        handlers[DiningTablesClosingActions.SHOW_OPTIONS] = (billUuid) => this.options = billUuid;
        handlers[DiningTablesClosingActions.HIDE_OPTIONS] = () => this.options = null;

        handlers[DiningTablesClosingActions.CRUD.BEGIN_CREATION] = (billDTO) => {
            this.currentBill = dataStore.getEntity(billDTO.uuid);
            this.crudStatus = CRUDStatus.CREATE;
            this.resetClosingWizard();
            this.closeAllOrders();
            this.closeAllCoverCharges();
            this.updateFinalTotal();
            this.closingWizard.visible = true;
        };

        handlers[DiningTablesClosingActions.CRUD.UPDATE] = () => {
            this.currentBill = null;
            this.crudStatus = CRUDStatus.RETRIEVE;
            this.closingWizard.visible = false;
        };

        handlers[DiningTablesClosingActions.CRUD.ABORT_CREATION] = () => {
            this.currentBill = null;
            this.crudStatus = CRUDStatus.RETRIEVE;
            this.closingWizard.visible = false;
        };

        handlers[DiningTablesClosingActions.CRUD.CREATE] = () => {
            this.currentBill = null;
            this.crudStatus = CRUDStatus.RETRIEVE;
            // this.currentBill = dataStore.getEntity(data.result.uuid);
            // this.crudStatus = CRUDStatus.UPDATE;
            this.closingWizard.visible = false;
        };

        handlers[DiningTablesClosingActions.QUICK_BILL] = () => {
            this.crudStatus = CRUDStatus.RETRIEVE;
            this.closingWizard.visible = false;
        };

        handlers[DiningTablesClosingActions.CRUD.SELECT] = (bill) => {
            this.currentBill = bill;
            this.crudStatus = CRUDStatus.UPDATE;
            this.closingWizard.visible = true;
        };

        handlers[DiningTablesClosingActions.CRUD.DESELECT] = () => {
            this.currentBill = null;
            this.crudStatus = CRUDStatus.RETRIEVE;
            this.closingWizard.visible = false;
        };


        handlers[DiningTablesClosingActions.CRUD.BEGIN_DELETION] = (bill) => {
            this.crudStatus = CRUDStatus.DELETE;
            this.currentBill = bill;
            this.options = null;
        };

        handlers[DiningTablesClosingActions.CRUD.ABORT_DELETION] = () => {
            this.currentBill = null;
            this.crudStatus = CRUDStatus.RETRIEVE;
        };

        handlers[DiningTablesClosingActions.CRUD.DELETE] = () => {
            this.currentBill = null;
            this.crudStatus = CRUDStatus.RETRIEVE;
        };
    }

    addClosingHandlers(handlers) {
        handlers[DiningTablesClosingActions.BACKWARD] = () => {
            this.closingWizard.page = Math.max(0, this.closingWizard.page - 1);
        };
        handlers[DiningTablesClosingActions.FORWARD] = () => {
            this.closingWizard.page = Math.min(this.closingWizard.pages.length - 1, this.closingWizard.page + 1)
        };
        handlers[OrdersEditorActions.CRUD.UPDATE.REMOTE.PRICE] = () => {
            this.updatePages();
            this.updateFinalTotal();
        };
        handlers[DiningTablesClosingActions.SET_SPLIT] = (split) => {
            this.closingWizard.split = split;
            this.updateFinalTotal();
        };
        handlers[DiningTablesClosingActions.SET_FINAL_TOTAL] = (total) => {
            this.currentBill.total = total;
        };
        handlers[DiningTablesClosingActions.SET_PERCENT] = (percent) => {
            this.closingWizard.percent = percent;
            this.updateFinalTotal();
        };
        handlers[DiningTablesClosingActions.SET_QUICK] = (quick) => {
            this.closingWizard.quick = quick;
            if(quick) {
                this.closeAllCoverCharges();
                this.closeAllOrders();
            }else{
                this.openAllCoverCharges();
                this.openAllOrders();
            }
            this.updatePages();
        };
        handlers[DiningTablesClosingActions.CLOSE_ORDERS] = (data) => {
            this.closeOrders(data.order, data.quantity);
            this.updateFinalTotal();
        };

        handlers[DiningTablesClosingActions.OPEN_ORDERS] = (data) => {
            this.openOrders(data.order, data.quantity);
            this.updateFinalTotal();
        };

        handlers[DiningTablesClosingActions.CLOSE_ALL_ORDERS] = () => {
            this.closeAllOrders();
            this.updateFinalTotal();
        };

        handlers[DiningTablesClosingActions.OPEN_ALL_ORDERS] = () => {
            this.openAllOrders();
            this.updateFinalTotal();
        };

        handlers[DiningTablesClosingActions.CLOSE_ALL_COVER_CHARGES] = () => {
            this.closeAllCoverCharges();
            this.updateFinalTotal();

        };
        handlers[DiningTablesClosingActions.OPEN_ALL_COVER_CHARGES] = () => {
            this.openAllCoverCharges();
            this.updateFinalTotal();

        };
        handlers[DiningTablesClosingActions.CLOSE_COVER_CHARGES] = (ccs) => {
            this.currentBill.coverCharges = this.currentBill.coverCharges + ccs;
            this.updateFinalTotal();

        };
        handlers[DiningTablesClosingActions.OPEN_COVER_CHARGES] = (ccs) => {
            this.currentBill.coverCharges = this.currentBill.coverCharges - ccs;
            this.updateFinalTotal();
        };

        handlers[DiningTablesClosingActions.BEGIN_TABLE_LOCKING] = () => this.lockingTable = true;
        handlers[DiningTablesClosingActions.ABORT_TABLE_LOCKING] = () => this.lockingTable = false;
        handlers[DiningTablesClosingActions.LOCK_TABLE] = () => this.lockingTable = false;

        this.addPrintHandlers(handlers);
    }

    addPrintHandlers(handlers){

        handlers[DiningTablesClosingActions.BEGIN_BILL_PRINTING] = (bill) => {
            this.currentBill = bill;
            this.options = null;
            this.resetPrintWizard();
            this.printWizard.visible = true;
        };

        handlers[DiningTablesClosingActions.BEGIN_BILL_SOFT_PRINTING] = (bill) => {
            this.currentBill = bill;
            this.options = null;
            this.resetPrintWizard();
            this.printWizard.soft = true;
            this.printWizard.visible = true;
        };

        handlers[DiningTablesClosingActions.SELECT_BILL_TYPE] = invoice => {
            this.printWizard.isInvoice = invoice;
            if(!invoice){
                this.printWizard.customer = null;
            }
        };

        handlers[DiningTablesClosingActions.SELECT_PRINT_MODE] = generic => {
            this.printWizard.generic = generic;
        };

        handlers[DiningTablesClosingActions.SELECT_PRINT_WIZARD_PAGE] = page => {
            this.printWizard.page = page;
        };

        handlers[DiningTablesClosingActions.SELECT_CUSTOMER] = customer => {
            this.printWizard.customer = customer;
        };

        handlers[DiningTablesClosingActions.PRINT_BILL] = () => {
            this.resetPrintWizard();
            this.currentBill = null;
            this.crudStatus = CRUDStatus.RETRIEVE;
        };

        handlers[DiningTablesClosingActions.PRINT_SOFT_BILL] = () => {
            this.resetPrintWizard();
            this.currentBill = null;
            this.crudStatus = CRUDStatus.RETRIEVE;
        };

        handlers[DiningTablesClosingActions.ABORT_BILL_PRINTING] = () => {
            this.resetPrintWizard();
            this.currentBill = null;
            this.crudStatus = CRUDStatus.RETRIEVE;
        };
    }

    resetPrintWizard() {
        this.printWizard = {
            visible: false,
            page: 0,
            customerPage: 0,
            isInvoice: false,
            generic: true,
            customer: null,
            soft: false
        };
    }

    resetClosingWizard() {
        this.closingWizard = {
            page: 0,
            visible: false,
            quick: true,
            split: 1,
            percent: 0,
            pages: []
        };
        this.updatePages();
    }

    closeAllCoverCharges() {
        let currentTable = diningTableEditingStore.currentTable;
        this.currentBill.coverCharges += DiningTablesUtils.findTableOpenedCoverCharges(currentTable);
    }

    openAllCoverCharges() {
        this.currentBill.coverCharges = 0;
    }

    updateFinalTotal() {
        let currentTable = diningTableEditingStore.currentTable;
        let orders = currentTable.listOrders();
        if (orders) {
            const percent = this.closingWizard.percent;
            const split = this.closingWizard.split;
            let billOrders = this.currentBill.orders;
            let billCcs = this.currentBill.coverCharges;

            orders = orders.filter(order => billOrders.includes(order));
            let total = OrdinationsUtils.total(orders);
            total += currentTable.evening.coverCharge * billCcs;
            total = total - percent * total / 100;
            total = split > 0 ? Math.floor(total * 100 / split) * split / 100 : total;

            this.currentBill.total = total;
        }
    }

    closeOrders(sample, n) {
        let currentTable = diningTableEditingStore.currentTable;
        let openedOrders = DiningTablesUtils.findTableOpenedOrders(currentTable, this.currentBill);
        openedOrders = openedOrders.filter(order => !this.currentBill.orders.includes(order));
        openedOrders = DiningTablesUtils.findSimilarTo(openedOrders, sample);

        for (let i = 0; i < openedOrders.length && i < n; i++) {
            this.currentBill.addOrder(openedOrders[i]);
        }
    }

    openOrders(sample, n) {
        let currentTable = diningTableEditingStore.currentTable;

        let ordersPool = currentTable.listOrders()
            .filter(order => this.currentBill.orders.includes(order));

        ordersPool = DiningTablesUtils.findSimilarTo(ordersPool, sample);
        for (let i = 0; i < n; i++) {
            this.currentBill.removeOrder(ordersPool[i]);
        }
    }

    closeAllOrders() {
        let currentTable = diningTableEditingStore.currentTable;
        let openedOrders = DiningTablesUtils.findTableOpenedOrders(currentTable, this.currentBill);
        openedOrders = openedOrders.filter(order => !this.currentBill.orders.includes(order));

        for (let i = 0; i < openedOrders.length; i++) {
            this.currentBill.addOrder(openedOrders[i]);
        }
    }

    openAllOrders() {
        this.currentBill.removeOrders();
    }

}

const tableClosingFeatureStore = new TableClosingFeatureStore();
export default tableClosingFeatureStore;