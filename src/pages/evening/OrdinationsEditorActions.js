import {
    ACT_ABORT_EDIT_ORDERS,
    ACT_ABORT_ENTITY_EDITING,
    ACT_BEGIN_EDIT_ORDERS,
    ACT_BEGIN_ENTITY_EDITING,
    ACT_DELETE_ORDINATION,
    ACT_EDIT_ORDINATION,
    ACT_PRINT_ORDINATION,
    ACT_SELECT_ORDINATION, ACT_UPDATE_ENTITY,
    ACT_UPDATE_ENTITY_PROPERTY,
    ACT_UPDATE_ORDINATION
} from "../../actions/ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";
import {EntitiesUtils} from "../../utils/EntitiesUtils";
import {ORDERS_TYPE, ORDINATION_TYPE} from "../../stores/EntityEditorStore";

const {fromJS, List} = require('immutable');

class OrdinationsEditorActions {

    beginOrdinationEditing(ordination) {
        dispatcher.fireEnd(ACT_BEGIN_ENTITY_EDITING, fromJS({
            type: ORDINATION_TYPE,
            entity: ordination
        }));
    }

    beginOrdersEditing(orders) {
        dispatcher.fireEnd(ACT_BEGIN_ENTITY_EDITING, fromJS({
            type: ORDERS_TYPE,
            entity: orders
        }));
    }

    abortOrdinationEditing() {
        dispatcher.fireEnd(ACT_ABORT_ENTITY_EDITING, ORDINATION_TYPE);
    }

    abortOrdersEditing() {
        dispatcher.fireEnd(ACT_ABORT_ENTITY_EDITING, ORDERS_TYPE);
    }

    selectOrdination(uuid) {
        dispatcher.fireEnd(ACT_SELECT_ORDINATION, uuid);
    }

    deselectOrdination() {
        dispatcher.fireEnd(ACT_SELECT_ORDINATION, null);
    }

    deleteOrdination(uuid) {
        asyncActionBuilder.remove(ACT_DELETE_ORDINATION, 'ordinations', uuid);
    }

    printOrdination(uuid) {
        asyncActionBuilder.post(ACT_PRINT_ORDINATION, 'printers/print', uuid);
    }

    editOrdination(uuid, orders) {
        asyncActionBuilder.put(ACT_UPDATE_ORDINATION, 'ordinations/' + uuid + "/orders", orders)
    }

    addOrders(dish, phase, quantity) {
        let newOrder = EntitiesUtils.newOrder(dish, phase);
        let orders = List(Array(quantity).fill(newOrder));

        dispatcher.fireEnd(ACT_UPDATE_ENTITY, fromJS({
            type: ORDERS_TYPE,
            updater: oldOrders => oldOrders.concat(orders)
        }));
    }

    addOrder(order) {
        dispatcher.fireEnd(ACT_UPDATE_ENTITY, fromJS({
            type: ORDERS_TYPE,
            updater: orders => orders.push(order)
        }));
    }

    removeOrder(index) {
        dispatcher.fireEnd(ACT_UPDATE_ENTITY, fromJS({
            type: ORDERS_TYPE,
            updater: orders => orders.delete(index)
        }));
    }

    updateOrderPrice(index, price) {
        dispatcher.fireEnd(ACT_UPDATE_ENTITY, fromJS({
            type: ORDERS_TYPE,
            updater: orders => {
                let order = orders.get(index).set('price', price);
                return orders.set(index, order);
            }
        }));
    }

    updateOrderFreeAddition(index, text) {
        dispatcher.fireEnd(ACT_UPDATE_ENTITY, fromJS({
            type: ORDERS_TYPE,
            updater: orders => {
                let order = orders.get(index).set('notes', text);
                return orders.set(index, order);
            }
        }));
    }

    addAddition(oIndex, aUuid, price) {
        dispatcher.fireEnd(ACT_UPDATE_ENTITY, fromJS({
            type: ORDERS_TYPE,
            updater: orders => {
                let order = orders.get(oIndex).set('price', oldPrice => oldPrice + price);
                let additions = orders.get(oIndex).get('additions');
                additions = additions.push(aUuid);
                order = order.set('additions', additions);
                return orders.set(oIndex, order);
            }
        }));
    }

    removeAddition(oIndex, aIndex, price) {
        dispatcher.fireEnd(ACT_UPDATE_ENTITY, fromJS({
            type: ORDERS_TYPE,
            updater: orders => {
                let order = orders.get(oIndex).set('price', oldPrice => oldPrice - price);
                let additions = orders.get(oIndex).get('additions').remove(aIndex);
                order = order.set('additions', additions);
                return orders.set(oIndex, order);
            }
        }));
    }
}

const ordinationsEditorActions = new OrdinationsEditorActions();

export default ordinationsEditorActions;