import DiningTablesUtils from "../../tables/DiningTablesUtils";
import eveningPageStore from "../../EveningPageStore";
import OrdinationsUtils from "../../OrdinationsUtils";
import SubFeatureStore from "../../../../stores/SubFeatureStore";
import {DiningTablesClosingActionTypes} from "./DiningTablesClosingActions";
import diningTablesEditingStore from "../DiningTableEditorStore";
import {EditorStatus} from "../../../StoresUtils";
import {findByUuid, iGet} from "../../../../utils/Utils";
import {DiningTablesEditorActionTypes} from "../DiningTablesEditorActions";
import {EntitiesUtils} from "../../../../utils/EntitiesUtils";

const {Map, List, fromJS} = require('immutable');

const EVT_DINING_TABLE_CLOSING_WIZARD_STORE_CHANGED = "EVT_DINING_TABLE_CLOSING_WIZARD_STORE_CHANGED";

export const DiningTableClosingWizardPages = {
    MODE_PAGE: "MODE_PAGE",
    SPLIT_PAGE: "SPLIT_PAGE",
    CUSTOMER_PAGE: "CUSTOMER_PAGE",
    REVIEW_PAGE: "REVIEW_PAGE",
};

class DiningTableClosingStore extends SubFeatureStore {

    constructor() {
        super(eveningPageStore, "diningTableClosing");
        this.init();
        this.editorStatus = EditorStatus.SURFING;
    }

    init() {
        this.selectedBill = null;

        this.billPage = 0;

        this.deletingBill = false;

        this.page = 0;
        this.wizardEditingMode = false;
        this.wizardVisible = false;

        this.printWizard = Map();

        this.quick = true;
        this.split = 1;
        this.percent = 0;
        this.customer = null;
        this.customerPage = 0;
        this.updatePages();
    }

    getActions() {
        return Object.values(DiningTablesClosingActionTypes);
    }

    getState() {
        return Map({
            editorStatus: this.editorStatus,

            selectedBill: this.selectedBill,
            billPage: this.billPage,

            deletingBill: this.deletingBill,

            page: this.page,
            wizardVisible: this.wizardVisible,
            quick: this.quick,

            split: this.split,
            percent: this.percent,

            customer: this.customer,
            customerPage: this.customerPage,

            pages: this.pages,

            printWizard: this.printWizard
        });
    }

    updatePages() {
        let pages = [];
        if (this.editorStatus !== EditorStatus.EDITING) {
            pages.push(DiningTableClosingWizardPages.MODE_PAGE);
        }
        if (!this.quick || this.editorStatus === EditorStatus.EDITING) {
            pages.push(DiningTableClosingWizardPages.SPLIT_PAGE);
        }
        pages.push(DiningTableClosingWizardPages.REVIEW_PAGE);
        this.pages = pages;
    }

    handleCompletedAction(action) {
        let changed = true;

        switch (action.type) {
            case DiningTablesEditorActionTypes.BEGIN_ORDINATIONS_EDITING:
            case DiningTablesEditorActionTypes.BEGIN_DATA_EDITING:
            case DiningTablesEditorActionTypes.BEGIN_BILLS_EDITING:
                this.selectedBill = null;
                this.editorStatus = EditorStatus.SURFING;
                break;
            case DiningTablesClosingActionTypes.SELECT_BILL_PAGE:
                this.billPage = action.body;
                break;
            case DiningTablesClosingActionTypes.BEGIN_BILL_PRINTING:
                this.printWizard = Map({
                    visible: true,
                    page: 0,
                    customer: null
                });
                break;
            case DiningTablesClosingActionTypes.SELECT_CUSTOMER:
                this.printWizard = this.printWizard.set('customer', action.body);
                break;
            case DiningTablesClosingActionTypes.SELECT_CUSTOMER_PAGE:
                this.printWizard = this.printWizard.set('page', action.body);
                break;
            case DiningTablesClosingActionTypes.ABORT_BILL_PRINTING:
                this.printWizard = Map({
                    visible: false,
                    page: 0,
                    customer: null
                });
                break;
            case DiningTablesClosingActionTypes.PRINT_BILL:
                this.printWizard = Map({
                    visible: false,
                    page: 0,
                    customer: null
                });
                break;
            case DiningTablesClosingActionTypes.SELECT_BILL:
                this.selectedBill = findByUuid(iGet(diningTablesEditingStore.getState(), 'diningTable.bills'), action.body);
                this.editorStatus = EditorStatus.EDITING;
                break;
            case DiningTablesClosingActionTypes.DESELECT_BILL:
                this.selectedBill = null;
                this.editorStatus = EditorStatus.SURFING;
                break;
            case DiningTablesClosingActionTypes.BEGIN_BILL_DELETION:
                this.deletingBill = true;
                break;
            case DiningTablesClosingActionTypes.ABORT_BILL_DELETION:
                this.deletingBill = false;
                break;
            case DiningTablesClosingActionTypes.DELETE_BILL:
                this.editorStatus = EditorStatus.SURFING;
                this.selectedBill = null;
                this.billPage = 0;
                this.deletingBill = false;
                break;
            case DiningTablesClosingActionTypes.BEGIN_BILL_CREATION:
                this.editorStatus = EditorStatus.CREATING;
                this.selectedBill = EntitiesUtils.newBill();

                this.page = 0;

                this.quick = true;
                this.split = 1;
                this.percent = 0;

                this.closeAllOrders();
                this.closeAllCoverCharges();
                this.updateFinalTotal();
                this.wizardVisible = true;
                this.updatePages();
                break;
            case DiningTablesClosingActionTypes.BEGIN_BILL_EDITING:
                this.page = 0;
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
            case DiningTablesClosingActionTypes.SET_SPLIT: {
                this.split = action.body;
                this.updateFinalTotal();
                break;
            }
            case DiningTablesClosingActionTypes.SET_FINAL_TOTAL: {
                this.selectedBill = this.selectedBill.set('total', action.body);
                break;
            }
            case DiningTablesClosingActionTypes.SET_PERCENT: {
                this.percent = action.body;
                this.updateFinalTotal();
                break;
            }
            case DiningTablesClosingActionTypes.SET_QUICK: {
                this.quick = action.body;
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
                this.selectedBill = this.selectedBill.set('coverCharges',
                    this.selectedBill.get('coverCharges') + action.body);
                this.updateFinalTotal();
                break;
            }
            case DiningTablesClosingActionTypes.OPEN_COVER_CHARGES: {
                this.selectedBill = this.selectedBill.set('coverCharges',
                    this.selectedBill.get('coverCharges') - action.body);
                this.updateFinalTotal();
                break;
            }
            case DiningTablesClosingActionTypes.CONFIRM_CLOSING:
                this.wizardVisible = false;
                break;
            case DiningTablesClosingActionTypes.ABORT_CLOSING:
                this.wizardVisible = false;
                this.editorStatus = EditorStatus.SURFING;
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    closeAllCoverCharges() {
        let currentTable = diningTablesEditingStore.getState().get('diningTable');
        let openedCcs = DiningTablesUtils.findTableOpenedCoverCharges(currentTable, this.selectedBill);
        this.selectedBill = this.selectedBill.set('coverCharges', openedCcs + this.selectedBill.get('coverCharges'));
    }

    openAllCoverCharges() {
        this.selectedBill = this.selectedBill.set('coverCharges', 0);
    }

    updateFinalTotal() {
        let table = diningTablesEditingStore.getState().get('diningTable');
        let orders = DiningTablesUtils.findTableOrders(table);
        if (orders) {
            let billOrders = this.selectedBill.get('orders');
            let billCcs = this.selectedBill.get('coverCharges');

            orders = orders.filter(order => billOrders.includes(order.get('uuid')));
            let total = OrdinationsUtils.total(orders);
            total += eveningPageStore.getState().data.get('evening').get('coverCharge') * billCcs;
            total = total - this.percent * total / 100;
            total = this.split > 0 ? Math.floor(total * 100 / this.split) * this.split / 100 : total;

            this.selectedBill = this.selectedBill.set('total', parseFloat(total.toFixed(2)));
        }
    }

    closeOrders(sample, n) {
        let table = diningTablesEditingStore.getState().get('diningTable');
        let openedOrders = DiningTablesUtils.findTableOpenedOrders(table, this.selectedBill);
        openedOrders = openedOrders.filter(order => !this.selectedBill.get('orders').includes(order.get('uuid')));
        openedOrders = DiningTablesUtils.findSimilarTo(openedOrders, sample);

        let billOrders = this.selectedBill.get('orders');
        for (let i = 0; i < openedOrders.size && i < n; i++) {
            billOrders = billOrders.push(openedOrders.get(i).get('uuid'));
        }
        this.selectedBill = this.selectedBill.set('orders', billOrders);
    }

    openOrders(sample, n) {
        let table = diningTablesEditingStore.getState().get('diningTable');
        let billOrders = this.selectedBill.get('orders');

        let ordersPool = DiningTablesUtils.findTableOrders(table)
            .filter(order => billOrders.includes(order.get('uuid')));

        ordersPool = DiningTablesUtils.findSimilarTo(ordersPool, sample);
        for (let i = 0; i < n; i++) {
            billOrders = billOrders.splice(billOrders.indexOf(ordersPool.get(i).get('uuid')), 1);
        }
        this.selectedBill = this.selectedBill.set('orders', billOrders);
    }

    closeAllOrders() {
        let table = diningTablesEditingStore.getState().get('diningTable');
        let openedOrders = DiningTablesUtils.findTableOpenedOrders(table, this.selectedBill);
        openedOrders = openedOrders.filter(order => !this.selectedBill.get('orders').includes(order.get('uuid')));

        let billOrders = this.selectedBill.get('orders');
        for (let i = 0; i < openedOrders.size; i++) {
            billOrders = billOrders.push(openedOrders.get(i).get('uuid'));
        }
        this.selectedBill = this.selectedBill.set('orders', billOrders);
    }

    openAllOrders() {
        this.selectedBill = this.selectedBill.set('orders', List());
    }

}

const diningTableClosingStore = new DiningTableClosingStore();
export default diningTableClosingStore;