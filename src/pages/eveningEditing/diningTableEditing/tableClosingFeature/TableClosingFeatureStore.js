import DiningTablesUtils from "../../tables/DiningTablesUtils";
import eveningPageStore from "../../EveningPageStore";
import OrdinationsUtils from "../../OrdinationsUtils";
import SubFeatureStore from "../../../../stores/SubFeatureStore";
import {DiningTablesClosingActionTypes} from "./DiningTablesClosingActions";
import diningTableEditingStore from "../DiningTableEditorStore";
import {findByUuid, iGet} from "../../../../utils/Utils";
import {DiningTablesEditorActionTypes} from "../DiningTablesEditorActions";
import {EntitiesUtils} from "../../../../utils/EntitiesUtils";
import EditorMode from "../../../../utils/EditorMode";

const {Map, List, fromJS} = require('immutable');

const EVT_DINING_TABLE_CLOSING_WIZARD_STORE_CHANGED = "EVT_DINING_TABLE_CLOSING_WIZARD_STORE_CHANGED";

export const DiningTableClosingWizardPages = {
    MODE_PAGE: "MODE_PAGE",
    SPLIT_PAGE: "SPLIT_PAGE",
    CUSTOMER_PAGE: "CUSTOMER_PAGE",
    REVIEW_PAGE: "REVIEW_PAGE",
};

class TableClosingFeatureStore extends SubFeatureStore {

    constructor() {
        super(eveningPageStore, "tableClosingFeature");
        this.init();
        this.editorStatus = EditorMode.SURFING;
    }

    init() {
        this.bill = null;

        this.billPage = 0;
        this.deletingBill = false;
        this.lockingTable = false;

        this.customer = null;
        this.customerPage = 0;
        this.resetClosingWizard();
        this.resetPrintWizard();
    }

    getActions() {
        return Object.values(DiningTablesClosingActionTypes);
    }

    getState() {
        return Map({
            editorStatus: this.editorStatus,

            bill: this.bill,
            billPage: this.billPage,

            lockingTable: this.lockingTable,
            deletingBill: this.deletingBill,

            closingWizard: this.closingWizard,
            printWizard: this.printWizard,

            isEditing: () => this.bill && this.editorStatus === EditorMode.EDITING,
            isCreating: () => this.bill && this.editorStatus === EditorMode.CREATING
        });
    }

    updatePages() {
        let pages = List();
        if (this.editorStatus === EditorMode.CREATING) {
            pages = pages.push(DiningTableClosingWizardPages.MODE_PAGE);
        }
        if (!this.closingWizard.get('quick') || this.editorStatus === EditorMode.EDITING) {
            pages = pages.push(DiningTableClosingWizardPages.SPLIT_PAGE);
        }
        pages = pages.push(DiningTableClosingWizardPages.REVIEW_PAGE);
        this.closingWizard = this.closingWizard.set('pages', pages);
    }

    handleCompletedAction(action) {
        let changed = true;

        switch (action.type) {
            case DiningTablesEditorActionTypes.BEGIN_ORDINATIONS_EDITING:
            case DiningTablesEditorActionTypes.BEGIN_DATA_EDITING:
            case DiningTablesEditorActionTypes.BEGIN_BILLS_EDITING:
                this.bill = null;
                this.editorStatus = EditorMode.SURFING;
                break;
            case DiningTablesClosingActionTypes.SELECT_BILL_PAGE:
                this.billPage = action.body;
                break;
            case DiningTablesClosingActionTypes.BEGIN_BILL_PRINTING:
                this.resetPrintWizard();
                this.printWizard = this.printWizard.set('visible', true);
                break;
            case DiningTablesClosingActionTypes.SELECT_BILL_TYPE:
                this.printWizard = this.printWizard.set('isInvoice', action.body);
                break;
            case DiningTablesClosingActionTypes.SELECT_PRINT_MODE:
                this.printWizard = this.printWizard.set('generic', action.body);
                break;
            case DiningTablesClosingActionTypes.SELECT_PRINT_WIZARD_PAGE:
                this.printWizard = this.printWizard.set('page', action.body);
                break;
            case DiningTablesClosingActionTypes.SELECT_CUSTOMER:
                this.printWizard = this.printWizard.set('customer', action.body);
                break;
            case DiningTablesClosingActionTypes.SELECT_CUSTOMER_PAGE:
                this.printWizard = this.printWizard.set('customerPage', action.body);
                break;
            case DiningTablesClosingActionTypes.PRINT_BILL:
                this.bill = null;
                this.editorStatus = EditorMode.SURFING;
                this.resetPrintWizard();
                break;
            case DiningTablesClosingActionTypes.ABORT_BILL_PRINTING:
                this.resetPrintWizard();
                break;
            case DiningTablesClosingActionTypes.SELECT_BILL:
                this.bill = findByUuid(iGet(diningTableEditingStore.getState(), 'diningTable.bills'), action.body);
                this.editorStatus = EditorMode.EDITING;
                break;
            case DiningTablesClosingActionTypes.DESELECT_BILL:
                this.bill = null;
                this.editorStatus = EditorMode.SURFING;
                break;
            case DiningTablesClosingActionTypes.BEGIN_BILL_DELETION:
                this.deletingBill = true;
                break;
            case DiningTablesClosingActionTypes.ABORT_BILL_DELETION:
                this.deletingBill = false;
                break;
            case DiningTablesClosingActionTypes.DELETE_BILL:
                this.editorStatus = EditorMode.SURFING;
                this.bill = null;
                this.billPage = 0;
                this.deletingBill = false;
                break;
            case DiningTablesClosingActionTypes.BEGIN_BILL_CREATION:
                this.editorStatus = EditorMode.CREATING;
                this.bill = EntitiesUtils.newBill();
                this.resetClosingWizard();
                this.closeAllOrders();
                this.closeAllCoverCharges();
                this.updateFinalTotal();
                this.closingWizard = this.closingWizard.set('visible', true);
                break;
            case DiningTablesClosingActionTypes.BEGIN_BILL_EDITING:
                this.resetClosingWizard();
                this.closingWizard = this.closingWizard.set('quick', false);
                this.closingWizard = this.closingWizard.set('visible', true);
                this.updatePages();
                break;
            case DiningTablesClosingActionTypes.BACKWARD: {
                const page = this.closingWizard.get('page');
                if (page > 0) {
                    this.closingWizard = this.closingWizard.set('page', page - 1);
                }
                break;
            }
            case DiningTablesClosingActionTypes.FORWARD: {
                const page = this.closingWizard.get('page');
                if (page < this.closingWizard.get('pages').size - 1) {
                    this.closingWizard = this.closingWizard.set('page', page + 1);
                }
                break;
            }
            case DiningTablesClosingActionTypes.SET_SPLIT: {
                this.closingWizard = this.closingWizard.set('split', action.body);
                this.updateFinalTotal();
                break;
            }
            case DiningTablesClosingActionTypes.SET_FINAL_TOTAL: {
                this.bill = this.bill.set('total', action.body);
                break;
            }
            case DiningTablesClosingActionTypes.SET_PERCENT: {
                this.closingWizard = this.closingWizard.set('percent', action.body);
                this.updateFinalTotal();
                break;
            }
            case DiningTablesClosingActionTypes.SET_QUICK: {
                this.closingWizard = this.closingWizard.set('quick', action.body);
                this.updatePages();
                break;
            }
            case DiningTablesClosingActionTypes.CLOSE_ORDERS:
                this.closeOrders(action.body.order, action.body.quantity);
                this.updateFinalTotal();
                break;
            case DiningTablesClosingActionTypes.OPEN_ORDERS:
                this.openOrders(action.body.order, action.body.quantity);
                this.updateFinalTotal();
                break;
            case DiningTablesClosingActionTypes.CLOSE_ALL_ORDERS:
                this.closeAllOrders();
                this.updateFinalTotal();
                break;
            case DiningTablesClosingActionTypes.OPEN_ALL_ORDERS:
                this.openAllOrders();
                this.updateFinalTotal();
                break;
            case DiningTablesClosingActionTypes.CLOSE_ALL_COVER_CHARGES: {
                this.closeAllCoverCharges();
                this.updateFinalTotal();
                break;
            }
            case DiningTablesClosingActionTypes.OPEN_ALL_COVER_CHARGES: {
                this.openAllCoverCharges();
                this.updateFinalTotal();
                break;
            }
            case DiningTablesClosingActionTypes.CLOSE_COVER_CHARGES: {
                this.bill = this.bill.set('coverCharges',
                    this.bill.get('coverCharges') + action.body);
                this.updateFinalTotal();
                break;
            }
            case DiningTablesClosingActionTypes.OPEN_COVER_CHARGES: {
                this.bill = this.bill.set('coverCharges',
                    this.bill.get('coverCharges') - action.body);
                this.updateFinalTotal();
                break;
            }
            case DiningTablesClosingActionTypes.CONFIRM_CLOSING:
            case DiningTablesClosingActionTypes.ABORT_CLOSING:
                this.resetClosingWizard();
                this.editorStatus = EditorMode.SURFING;
                break;
            case DiningTablesClosingActionTypes.BEGIN_TABLE_LOCKING:
                this.lockingTable = true;
                break;
            case DiningTablesClosingActionTypes.LOCK_TABLE:
            case DiningTablesClosingActionTypes.ABORT_TABLE_LOCKING:
                this.lockingTable = false;
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    resetPrintWizard() {
        this.printWizard = Map({
            visible: false,
            page: 0,
            customerPage: 0,
            isInvoice: false,
            generic: true,
            customer: null
        });
    }

    resetClosingWizard() {
        this.closingWizard = Map({
            page: 0,
            visible: false,
            quick: true,
            split: 1,
            percent: 0,
            pages: []
        });
        this.updatePages();
    }

    closeAllCoverCharges() {
        let currentTable = diningTableEditingStore.getState().get('diningTable');
        let openedCcs = DiningTablesUtils.findTableOpenedCoverCharges(currentTable, this.bill);
        this.bill = this.bill.set('coverCharges', openedCcs + this.bill.get('coverCharges'));
    }

    openAllCoverCharges() {
        this.bill = this.bill.set('coverCharges', 0);
    }

    updateFinalTotal() {
        let table = diningTableEditingStore.getState().get('diningTable');
        let orders = DiningTablesUtils.findTableOrders(table);
        if (orders) {
            const percent = this.closingWizard.get('percent');
            const split = this.closingWizard.get('split');
            let billOrders = this.bill.get('orders');
            let billCcs = this.bill.get('coverCharges');

            orders = orders.filter(order => billOrders.includes(order.get('uuid')));
            let total = OrdinationsUtils.total(orders);
            total += eveningPageStore.getState().data.get('evening').get('coverCharge') * billCcs;
            total = total - percent * total / 100;
            total = split > 0 ? Math.floor(total * 100 / split) * split / 100 : total;

            this.bill = this.bill.set('total', total);
        }
    }

    closeOrders(sample, n) {
        let table = diningTableEditingStore.getState().get('diningTable');
        let openedOrders = DiningTablesUtils.findTableOpenedOrders(table, this.bill);
        openedOrders = openedOrders.filter(order => !this.bill.get('orders').includes(order.get('uuid')));
        openedOrders = DiningTablesUtils.findSimilarTo(openedOrders, sample);

        let billOrders = this.bill.get('orders');
        for (let i = 0; i < openedOrders.size && i < n; i++) {
            billOrders = billOrders.push(openedOrders.get(i).get('uuid'));
        }
        this.bill = this.bill.set('orders', billOrders);
    }

    openOrders(sample, n) {
        let table = diningTableEditingStore.getState().get('diningTable');
        let billOrders = this.bill.get('orders');

        let ordersPool = DiningTablesUtils.findTableOrders(table)
            .filter(order => billOrders.includes(order.get('uuid')));

        ordersPool = DiningTablesUtils.findSimilarTo(ordersPool, sample);
        for (let i = 0; i < n; i++) {
            billOrders = billOrders.splice(billOrders.indexOf(ordersPool.get(i).get('uuid')), 1);
        }
        this.bill = this.bill.set('orders', billOrders);
    }

    closeAllOrders() {
        let table = diningTableEditingStore.getState().get('diningTable');
        let openedOrders = DiningTablesUtils.findTableOpenedOrders(table, this.bill);
        openedOrders = openedOrders.filter(order => !this.bill.get('orders').includes(order.get('uuid')));

        let billOrders = this.bill.get('orders');
        for (let i = 0; i < openedOrders.size; i++) {
            billOrders = billOrders.push(openedOrders.get(i).get('uuid'));
        }
        this.bill = this.bill.set('orders', billOrders);
    }

    openAllOrders() {
        this.bill = this.bill.set('orders', List());
    }

}

const tableClosingFeatureStore = new TableClosingFeatureStore();
export default tableClosingFeatureStore;