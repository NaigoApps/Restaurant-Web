import DiningTablesUtils from "../../tables/DiningTablesUtils";
import eveningPageStore from "../../EveningPageStore";
import {INVOICE, RECEIPT} from "./DiningTableClosingView";
import OrdinationsUtils from "../../OrdinationsUtils";
import SubFeatureStore from "../../../../stores/SubFeatureStore";
import {DiningTablesClosingActionTypes} from "./DiningTablesClosingActions";
import diningTablesEditingStore from "../DiningTableEditorStore";
import StoresUtils from "../../../StoresUtils";
import {findByUuid, iGet} from "../../../../utils/Utils";

const {Map, List, fromJS} = require('immutable');

const EVT_DINING_TABLE_CLOSING_WIZARD_STORE_CHANGED = "EVT_DINING_TABLE_CLOSING_WIZARD_STORE_CHANGED";

const DiningTableClosingWizardPages = {
    MODE_PAGE: "MODE_PAGE",
    SPLIT_PAGE: "SPLIT_PAGE",
    CUSTOMER_PAGE: "CUSTOMER_PAGE",
    REVIEW_PAGE: "REVIEW_PAGE",
};

class DiningTableClosingStore extends SubFeatureStore {

    constructor() {
        super(eveningPageStore, "diningTableClosing");
        this.init();
    }

    init() {
        this.selectedBill = null;
        this.billPage = 0;

        this.deletingBill = false;

        this.page = 0;
        this.wizardVisible = false;

        this.orders = List();
        this.quick = true;
        this.splitInput = StoresUtils.initIntInput(1);
        this.finalTotalInput = StoresUtils.initFloatInput(0);
        this.percentInput = StoresUtils.initPercentInput(0);
        this.type = RECEIPT;
        this.coverCharges = 0;
        this.customer = null;
        this.customerPage = 0;
        this.updatePages();
    }

    getActions() {
        return Object.values(DiningTablesClosingActionTypes);
    }

    getState() {
        return Map({
            selectedBill: this.selectedBill,
            billPage: this.billPage,

            deletingBill: this.deletingBill,

            page: this.page,
            wizardVisible: this.wizardVisible,
            type: this.type,
            orders: this.orders,
            quick: this.quick,

            splitInput: this.splitInput,
            finalTotalInput: this.finalTotalInput,
            percentInput: this.percentInput,

            customer: this.customer,
            customerPage: this.customerPage,

            coverCharges: this.coverCharges,
            pages: this.pages
        });
    }

    updatePages() {
        let pages = [];
        pages.push(DiningTableClosingWizardPages.MODE_PAGE);
        if (!this.quick) {
            pages.push(DiningTableClosingWizardPages.SPLIT_PAGE);
        }
        if (this.type === INVOICE) {
            pages.push(DiningTableClosingWizardPages.CUSTOMER_PAGE);
        }
        pages.push(DiningTableClosingWizardPages.REVIEW_PAGE);
        this.pages = pages;
    }

    handleCompletedAction(action) {
        let changed = true;

        switch (action.type) {
            case DiningTablesClosingActionTypes.SELECT_BILL_PAGE:
                this.billPage = action.body;
                break;
            case DiningTablesClosingActionTypes.PRINT_BILL:
                //FIXME, meglio non copiare i dati del conto ma tenere solo l'uuid
                this.selectedBill = findByUuid(iGet(diningTablesEditingStore.getState(), 'diningTable.bills'), action.body.get('uuid'));
                break;
            case DiningTablesClosingActionTypes.SELECT_BILL:
                this.selectedBill = findByUuid(iGet(diningTablesEditingStore.getState(), 'diningTable.bills'), action.body);
                break;
            case DiningTablesClosingActionTypes.DESELECT_BILL:
                this.selectedBill = null;
                break;
            case DiningTablesClosingActionTypes.BEGIN_BILL_DELETION:
                this.deletingBill = true;
                break;
            case DiningTablesClosingActionTypes.ABORT_BILL_DELETION:
                this.deletingBill = false;
                break;
            case DiningTablesClosingActionTypes.DELETE_BILL:
                this.selectedBill = null;
                this.billPage = 0;
                this.deletingBill = false;
                break;
            case DiningTablesClosingActionTypes.BEGIN_CLOSING:
                this.init();
                this.closeAllOrders();
                this.closeAllCoverCharges();
                this.updateFinalTotal();
                this.wizardVisible = true;
                this.updatePages();
                break;
            case DiningTablesClosingActionTypes.BACKWARD:
                if (this.page > 0) {
                    this.page--;
                }
                break;
            case DiningTablesClosingActionTypes.FORWARD:
                if (this.page < this.pages.length - 1) {
                    this.page++;
                }
                break;
            case DiningTablesClosingActionTypes.SET_BILL_TYPE: {
                this.type = action.body;
                this.updatePages();
                break;
            }
            case DiningTablesClosingActionTypes.SPLIT_CHANGE: {
                if (StoresUtils.isInteger(action.body)) {
                    this.splitInput = StoresUtils.initIntInput(parseInt(action.body));
                    this.updateFinalTotal();
                }
                break;
            }
            case DiningTablesClosingActionTypes.SPLIT_CHAR: {
                this.splitInput = StoresUtils.intChar(this.splitInput, action.body);
                this.updateFinalTotal();
                break;
            }
            case DiningTablesClosingActionTypes.FINAL_TOTAL_CHANGE: {
                if (StoresUtils.isFloat(action.body)) {
                    this.finalTotalInput = StoresUtils.initFloatInput(parseFloat(action.body));
                }
                break;
            }
            case DiningTablesClosingActionTypes.FINAL_TOTAL_CHAR: {
                this.finalTotalInput = StoresUtils.floatChar(this.finalTotalInput, action.body);
                break;
            }
            case DiningTablesClosingActionTypes.PERCENT_CHANGE: {
                if (StoresUtils.isPercent(action.body)) {
                    this.percentInput = StoresUtils.initPercentInput(parseInt(action.body));
                    this.updateFinalTotal();
                }
                break;
            }
            case DiningTablesClosingActionTypes.PERCENT_CHAR: {
                this.percentInput = StoresUtils.percentChar(this.percentInput, action.body);
                this.updateFinalTotal();
                break;
            }
            case DiningTablesClosingActionTypes.SET_QUICK: {
                this.quick = action.body;
                this.updatePages();
                break;
            }
            case DiningTablesClosingActionTypes.SELECT_CUSTOMER: {
                this.customer = action.body;
                break;
            }
            case DiningTablesClosingActionTypes.SELECT_CUSTOMER_PAGE: {
                this.customerPage = action.body;
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
                this.coverCharges += action.body;
                this.updateFinalTotal();
                break;
            }
            case DiningTablesClosingActionTypes.OPEN_COVER_CHARGES: {
                this.coverCharges -= action.body;
                this.updateFinalTotal();
                break;
            }
            case DiningTablesClosingActionTypes.CONFIRM_CLOSING:
                this.wizardVisible = false;
                break;
            case DiningTablesClosingActionTypes.ABORT_CLOSING:
                this.wizardVisible = false;
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    closeAllCoverCharges() {
        let currentTable = diningTablesEditingStore.getState().get('diningTable');
        let all = currentTable.get('coverCharges');
        let otherBills = currentTable.get('bills');
        otherBills.forEach(bill => all -= bill.get('coverCharges'));
        this.coverCharges = all;
    }

    openAllCoverCharges() {
        this.coverCharges = 0;
    }

    updateFinalTotal() {
        let table = diningTablesEditingStore.getState().get('diningTable');
        let orders = DiningTablesUtils.findTableOrders(table);
        const split = this.splitInput.get('value');
        const percent = this.percentInput.get('value');
        if (orders) {
            orders = orders.filter(order => this.orders.includes(order.get('uuid')));
            let total = OrdinationsUtils.total(orders);
            total += eveningPageStore.getState().data.get('evening').get('coverCharge') * this.coverCharges;
            total = total - percent * total / 100;
            total = split > 0 ? total / split : total;
            this.finalTotalInput = StoresUtils.initFloatInput(parseFloat(total.toFixed(2)));
        }
    }

    closeOrders(sample, n) {
        let table = diningTablesEditingStore.getState().get('diningTable');
        let openedOrders = DiningTablesUtils.findTableOpenedOrders(table);
        openedOrders = openedOrders.filter(order => !this.orders.includes(order.get('uuid')));
        openedOrders = DiningTablesUtils.findSimilarTo(openedOrders, sample);
        for (let i = 0; i < openedOrders.size && i < n; i++) {
            this.orders = this.orders.push(openedOrders.get(i).get('uuid'));
        }
    }

    openOrders(sample, n) {
        let table = diningTablesEditingStore.getState().get('diningTable');
        let openedOrders = DiningTablesUtils.findTableOpenedOrders(table);
        openedOrders = openedOrders.filter(order => this.orders.includes(order.get('uuid')));
        openedOrders = DiningTablesUtils.findSimilarTo(openedOrders, sample);
        for (let i = 0; i < n; i++) {
            this.orders = this.orders.splice(this.orders.indexOf(openedOrders.get(i).get('uuid')), 1);
        }
    }

    closeAllOrders() {
        let table = diningTablesEditingStore.getState().get('diningTable');
        let openedOrders = DiningTablesUtils.findTableOpenedOrders(table);
        openedOrders = openedOrders.filter(order => !this.orders.includes(order.get('uuid')));
        for (let i = 0; i < openedOrders.size; i++) {
            this.orders = this.orders.push(openedOrders.get(i).get('uuid'));
        }
    }

    openAllOrders() {
        this.orders = List();
    }

}

const diningTableClosingStore = new DiningTableClosingStore();
export default diningTableClosingStore;