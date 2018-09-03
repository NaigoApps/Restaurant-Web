import {ACT_UPDATE_ENTITY} from "../../actions/DataActions";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import {EntitiesUtils} from "../../utils/EntitiesUtils";
import {uuid} from "../../utils/Utils";

const {fromJS, List} = require('immutable');

class OrdinationEditorWizardActions {

    addOrders(dish, phase, quantity) {
        let orders = List();
        for(let i = 0;i < quantity;i++) {
            let newOrder = EntitiesUtils.newOrder(dish, phase);
            orders = orders.push(newOrder);
        }

        //FIXME
        // dispatcher.fireEnd(ACT_UPDATE_ENTITY, fromJS({
        //     type: ORDERS_TYPE,
        //     updater: oldOrders => oldOrders.concat(orders)
        // }));
    }

    addOrder(order) {
        //FIXME
        // dispatcher.fireEnd(ACT_UPDATE_ENTITY, fromJS({
        //     type: ORDERS_TYPE,
        //     updater: orders => orders.push(order)
        // }));
    }

    duplicateOrder(orderUuid, times) {
        //FIXME
        // dispatcher.fireEnd(ACT_UPDATE_ENTITY, fromJS({
        //     type: ORDERS_TYPE,
        //     updater: orders => {
        //         let sample = orders.find(order => order.get('uuid') === orderUuid);
        //         for(let i = 0;i < times;i++) {
        //             orders = orders.push(sample.set('uuid', uuid()));
        //         }
        //         return orders;
        //     }
        // }));
    }



    removeOrder(index) {
        //FIXME
        // dispatcher.fireEnd(ACT_UPDATE_ENTITY, fromJS({
        //     type: ORDERS_TYPE,
        //     updater: orders => orders.delete(index)
        // }));
    }

    removeOrders(uuids){
        //FIXME
        // dispatcher.fireEnd(ACT_UPDATE_ENTITY, fromJS({
        //     type: ORDERS_TYPE,
        //     updater: orders => {
        //         return orders.filter(order => !uuids.includes(order.get('uuid')));
        //     }
        // }));
    }

    updateOrderPrice(index, price) {
        //FIXME
        // dispatcher.fireEnd(ACT_UPDATE_ENTITY, fromJS({
        //     type: ORDERS_TYPE,
        //     updater: orders => {
        //         let order = orders.get(index).set('price', price);
        //         return orders.set(index, order);
        //     }
        // }));
    }

    updateOrderPhase(index, phase) {
        //FIXME
        // dispatcher.fireEnd(ACT_UPDATE_ENTITY, fromJS({
        //     type: ORDERS_TYPE,
        //     updater: orders => {
        //         let order = orders.get(index).set('phase', phase);
        //         return orders.set(index, order);
        //     }
        // }));
    }

    updateOrderFreeAddition(index, text) {
        //FIXME
        // dispatcher.fireEnd(ACT_UPDATE_ENTITY, fromJS({
        //     type: ORDERS_TYPE,
        //     updater: orders => {
        //         let order = orders.get(index).set('notes', text);
        //         return orders.set(index, order);
        //     }
        // }));
    }

    addAddition(oIndex, aUuid, price) {
        //FIXME
        // dispatcher.fireEnd(ACT_UPDATE_ENTITY, fromJS({
        //     type: ORDERS_TYPE,
        //     updater: orders => {
        //         let oldPrice = orders.get(oIndex).get('price');
        //         let order = orders.get(oIndex).set('price', oldPrice + price);
        //         let additions = orders.get(oIndex).get('additions');
        //         additions = additions.push(aUuid);
        //         order = order.set('additions', additions);
        //         return orders.set(oIndex, order);
        //     }
        // }));
    }

    removeAddition(oIndex, aIndex, price) {
        //FIXME
        // dispatcher.fireEnd(ACT_UPDATE_ENTITY, fromJS({
        //     type: ORDERS_TYPE,
        //     updater: orders => {
        //         let oldPrice = orders.get(oIndex).get('price');
        //         let order = orders.get(oIndex).set('price', oldPrice - price);
        //         let additions = orders.get(oIndex).get('additions').remove(aIndex);
        //         order = order.set('additions', additions);
        //         return orders.set(oIndex, order);
        //     }
        // }));
    }
}

const ordinationsEditorActions = new OrdinationsEditorActions();

export default ordinationsEditorActions;