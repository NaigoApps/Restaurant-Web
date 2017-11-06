import dispatcher from "../dispatcher/SimpleDispatcher";
import EntityStore from "./EntityStore";
import {ORDERED_DISHES} from "./RESTPaths";

class OrderedDishesStore extends EntityStore {
    constructor() {
        super(ORDERED_DISHES);
    }
}

const orderedDishesStore = new OrderedDishesStore();
// dispatcher.register(orderedDishesStore.handleAction.bind(orderedDishesStore));

export default orderedDishesStore;