import asyncActionBuilder from "../../../../actions/RequestBuilder";
import ActionsFactory from "../../../../utils/ActionsFactory";
import dispatcher from "../../../../dispatcher/SimpleDispatcher";
import {uuid} from "../../../../utils/Utils";

export default class OrdersEditorActions {

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
                PRICE: ActionsFactory.next(),
                QUANTITY: {
                    LESS: ActionsFactory.next(),
                    MORE: ActionsFactory.next()
                },
                PHASE: ActionsFactory.next(),
                ADD_ADDITION: ActionsFactory.next(),
                REMOVE_ADDITION: ActionsFactory.next(),
                FREE_ADDITION: ActionsFactory.next()
            },
            REMOTE: {
                PRICE: ActionsFactory.next(),
                QUANTITY: ActionsFactory.next(),
                PHASE: ActionsFactory.next(),
                ADD_ADDITION: ActionsFactory.next(),
                REMOVE_ADDITION: ActionsFactory.next(),
                FREE_ADDITION: ActionsFactory.next()
            }
        }
    };

    static SET_ADDITIONS_PAGE = ActionsFactory.next();

    static updateOrdersPrice(orders, price) {
        asyncActionBuilder.put(
            OrdersEditorActions.CRUD.UPDATE.REMOTE.PRICE,
            'orders/' + orders[0].uuid + '/price',
            price
        );
    }

    static selectOrders(orders) {
        dispatcher.fireEnd(OrdersEditorActions.CRUD.SELECT, orders);
    }

    static deselectOrders() {
        dispatcher.fireEnd(OrdersEditorActions.CRUD.DESELECT);
    }

    static deleteOrders(orders) {
        asyncActionBuilder.remove(
            OrdersEditorActions.CRUD.DELETE,
            'orders',
            orders.map(order => order.uuid)
        );
    }

    static selectAdditionsPage(page) {
        dispatcher.fireEnd(this.SET_ADDITIONS_PAGE, page);
    }

    //Local updates

    static setFreeAddition(note) {
        dispatcher.fireEnd(this.CRUD.UPDATE.LOCAL.FREE_ADDITION, note);
    }

    static setAdditions(addition, add) {
        if (add) {
            dispatcher.fireEnd(this.CRUD.UPDATE.LOCAL.ADD_ADDITION, addition);
        } else {
            dispatcher.fireEnd(this.CRUD.UPDATE.LOCAL.REMOVE_ADDITION, addition);
        }
    }

    static setPrice(price) {
        dispatcher.fireEnd(this.CRUD.UPDATE.LOCAL.PRICE, price);
    }

    static increaseQuantity(order, increment) {
        const dtos = [];
        for (let i = 0; i < increment; i++) {
            const dto = order.toDto();
            dto.uuid = uuid();
            dtos.push(dto);
        }
        dispatcher.fireEnd(this.CRUD.UPDATE.LOCAL.QUANTITY.MORE, dtos);
    }

    static decreaseQuantity(orders) {
        dispatcher.fireEnd(this.CRUD.UPDATE.LOCAL.QUANTITY.LESS, orders);
    }

    static setPhase(phase) {
        dispatcher.fireEnd(this.CRUD.UPDATE.LOCAL.PHASE, phase);
    }

    static updateFreeAddition(orders, notes) {
        asyncActionBuilder.put(this.CRUD.UPDATE.REMOTE.FREE_ADDITION,
            "orders/notes",
            orders.map(order => order.uuid),
            {notes: notes}
        );
    }

    static updateAdditions(addition, add) {
        if (add) {
            dispatcher.fireEnd(this.CRUD.UPDATE.REMOTE.ADD_ADDITION, addition);
        } else {
            dispatcher.fireEnd(this.CRUD.UPDATE.REMOTE.REMOVE_ADDITION, addition);
        }
    }

    static updatePrice(order, price) {
        asyncActionBuilder.put(
            this.CRUD.UPDATE.REMOTE.PRICE,
            "orders/" + order.uuid + "/price",
            price);
    }

    static updateQuantity(quantity) {
        dispatcher.fireEnd(this.CRUD.UPDATE.REMOTE.QUANTITY, quantity);
    }

    static updatePhase(phase) {
        dispatcher.fireEnd(this.CRUD.UPDATE.REMOTE.PHASE, phase);
    }
};