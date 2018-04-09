import dispatcher from "../../dispatcher/SimpleDispatcher";
import {
    ACT_ABORT_DINING_TABLE_CLOSING,
    ACT_BEGIN_DINING_TABLE_CLOSING,
    ACT_BEGIN_ENTITY_EDITING,
    ACT_CLOSE_ALL_ORDERS,
    ACT_CLOSE_COVER_CHARGES,
    ACT_CLOSE_ORDERS,
    ACT_CREATE_BILL,
    ACT_DINING_TABLE_CLOSING_BACKWARD,
    ACT_DINING_TABLE_CLOSING_FORWARD,
    ACT_OPEN_ALL_ORDERS,
    ACT_OPEN_COVER_CHARGES,
    ACT_OPEN_ORDERS,
    ACT_RETRIEVE_ADDITIONS,
    ACT_RETRIEVE_CATEGORIES,
    ACT_RETRIEVE_DISHES,
    ACT_RETRIEVE_PHASES,
    ACT_RETRIEVE_RESTAURANT_TABLES,
    ACT_RETRIEVE_WAITERS,
    ACT_SELECT_INVOICE_CUSTOMER,
    ACT_SET_BILL_TYPE,
    ACT_SET_ENTITY_PROPERTY, ACT_SET_FINAL_TOTAL,
    ACT_SET_PERCENT,
    ACT_SET_QUICK,
    ACT_SET_SPLIT,
    ACT_UPDATE_DINING_TABLE,
    ACT_UPDATE_ENTITY,
    ACT_UPDATE_EVENING,
    ACT_UPDATE_ORDINATION
} from "../../actions/ActionTypes";
import DiningTablesUtils from "./tables/DiningTablesUtils";
import WizardStore from "../../components/widgets/wizard/WizardStore";
import eveningPageStore from "./EveningPageStore";
import {RECEIPT} from "./tables/DiningTableClosingView";
import OrdinationsUtils from "./OrdinationsUtils";

const {Map, List, fromJS} = require('immutable');

const EVT_DINING_TABLE_CLOSING_WIZARD_STORE_CHANGED = "EVT_DINING_TABLE_CLOSING_WIZARD_STORE_CHANGED";

class DiningTableClosingWizardStore extends WizardStore {

    constructor() {
        super(EVT_DINING_TABLE_CLOSING_WIZARD_STORE_CHANGED);
    }

    handleCompletedAction(action) {
        dispatcher.waitFor([
            eveningPageStore.getToken(),
        ]);

        let changed = true;

        switch (action.type) {
            case ACT_RETRIEVE_WAITERS:
            case ACT_RETRIEVE_RESTAURANT_TABLES:
            case ACT_RETRIEVE_CATEGORIES:
            case ACT_RETRIEVE_DISHES:
            case ACT_RETRIEVE_PHASES:
            case ACT_RETRIEVE_ADDITIONS:

            case ACT_UPDATE_EVENING:
            case ACT_UPDATE_DINING_TABLE:
            case ACT_UPDATE_ORDINATION:

            case ACT_BEGIN_DINING_TABLE_CLOSING:
                super.init(2);
                super.setWizardData(fromJS({
                    orders: [],
                    quick: true,
                    split: 1,
                    finalTotal: 0,
                    type: RECEIPT,
                    percent: 0,
                    coverCharges: 0,
                    customer: null
                }));
                //FIXME
                // this.closeAllOrders();
                // this.closeCoverCharges(eveningPageStore.getState().data.get('editingTable').get('coverCharges'));
                // this.updateFinalTotal();
                break;
            case ACT_DINING_TABLE_CLOSING_BACKWARD:
                super.backward();
                break;
            case ACT_DINING_TABLE_CLOSING_FORWARD:
                super.forward(action.body);
                break;
            case ACT_SET_BILL_TYPE: {
                let oldData = super.getState().wizardData;
                oldData = oldData.set('type', action.body);
                super.setWizardData(oldData);
                break;
            }
            case ACT_SET_SPLIT: {
                let oldData = super.getState().wizardData;
                oldData = oldData.set('split', action.body);
                super.setWizardData(oldData);
                this.updateFinalTotal();
                break;
            }
            case ACT_SET_PERCENT: {
                let oldData = super.getState().wizardData;
                oldData = oldData.set('percent', action.body);
                super.setWizardData(oldData);
                this.updateFinalTotal();
                break;
            }
            case ACT_SET_QUICK: {
                let oldData = super.getState().wizardData;
                oldData = oldData.set('quick', action.body);
                super.setWizardData(oldData);
                break;
            }
            case ACT_SET_FINAL_TOTAL: {
                let oldData = super.getState().wizardData;
                oldData = oldData.set('finalTotal', action.body);
                super.setWizardData(oldData);
                break;
            }
            case ACT_SELECT_INVOICE_CUSTOMER: {
                let oldData = super.getState().wizardData;
                super.setWizardData(oldData.set('customer', action.body));
                break;
            }
            case ACT_CREATE_BILL:
                super.destroy();
                break;
            case ACT_CLOSE_ORDERS:
                this.closeOrders(action.body.order, action.body.quantity);
                this.updateFinalTotal();
                break;
            case ACT_CLOSE_ALL_ORDERS:
                this.closeAllOrders();
                this.updateFinalTotal();
                break;
            case ACT_CLOSE_COVER_CHARGES: {
                this.closeCoverCharges(action.body);
                break;
            }
            case ACT_OPEN_ORDERS:
                this.openOrders(action.body.order, action.body.quantity);
                this.updateFinalTotal();
                break;
            case ACT_OPEN_ALL_ORDERS:
                this.openAllOrders();
                this.updateFinalTotal();
                break;
            case ACT_OPEN_COVER_CHARGES: {
                let ccs = super.getState().wizardData.get('coverCharges');
                super.setWizardData(super.getState().wizardData.set('coverCharges', ccs - action.body));
                this.updateFinalTotal();
                break;
            }
            case ACT_ABORT_DINING_TABLE_CLOSING:
                super.destroy();
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    closeCoverCharges(value){
        let ccs = super.getState().wizardData.get('coverCharges');
        super.setWizardData(super.getState().wizardData.set('coverCharges', ccs + value));
        this.updateFinalTotal();
    }

    updateFinalTotal(){
        let invoiceOrdersUuids = super.getState().wizardData.get('orders');
        let table = eveningPageStore.getState().data.get('editingTable');
        let orders = DiningTablesUtils.findTableOrders(table);
        if(orders) {
            orders = orders.filter(order => invoiceOrdersUuids.includes(order.get('uuid')));
            let total = OrdinationsUtils.total(orders);
            let coverCharges = super.getState().wizardData.get('coverCharges');
            let discount = super.getState().wizardData.get('percent');
            let split = super.getState().wizardData.get('split');
            total += eveningPageStore.getState().data.get('evening').get('coverCharge') * coverCharges;
            total = total - discount * total / 100;
            total = split > 0 ? total / split : total;
            super.setWizardData(super.getState().wizardData.set('finalTotal', Math.floor(total * 100) / 100));
        }
    }

    closeOrders(sample, n) {
        let table = eveningPageStore.getState().data.get('editingTable');
        let openedOrders = DiningTablesUtils.findTableOpenedOrders(table);
        let oldOrders = super.getState().wizardData.get('orders');
        openedOrders = openedOrders.filter(order => !oldOrders.includes(order.get('uuid')));
        openedOrders = DiningTablesUtils.findSimilarTo(openedOrders, sample);
        for (let i = 0; i < openedOrders.size && i < n; i++) {
            oldOrders = oldOrders.push(openedOrders.get(i).get('uuid'));
        }
        super.setWizardData(super.getState().wizardData.set('orders', oldOrders))
    }

    openOrders(sample, n) {
        let table = eveningPageStore.getState().data.get('editingTable');
        let openedOrders = DiningTablesUtils.findTableOpenedOrders(table);
        let oldOrders = super.getState().wizardData.get('orders');
        openedOrders = openedOrders.filter(order => oldOrders.includes(order.get('uuid')));
        openedOrders = DiningTablesUtils.findSimilarTo(openedOrders, sample);
        for (let i = 0; i < n; i++) {
            oldOrders = oldOrders.splice(oldOrders.indexOf(openedOrders.get(i).get('uuid')), 1);
        }
        super.setWizardData(super.getState().wizardData.set('orders', oldOrders))

    }

    closeAllOrders() {
        let table = eveningPageStore.getState().data.get('editingTable');
        let openedOrders = DiningTablesUtils.findTableOpenedOrders(table);
        let oldOrders = super.getState().wizardData.get('orders');
        openedOrders = openedOrders.filter(order => !oldOrders.includes(order.get('uuid')));
        for (let i = 0; i < openedOrders.size; i++) {
            oldOrders = oldOrders.push(openedOrders.get(i).get('uuid'));
        }
        super.setWizardData(super.getState().wizardData.set('orders', oldOrders));
    }

    openAllOrders() {
        super.setWizardData(super.getState().wizardData.set('orders', List()));
    }

}

const diningTableClosingWizardStore = new DiningTableClosingWizardStore();
export default diningTableClosingWizardStore;