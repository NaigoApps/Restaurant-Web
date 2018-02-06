import {
    ACT_ABORT_ENTITY_EDITING,
    ACT_ADD_TO_ENTITY_PROPERTY,
    ACT_ASK_SELECTED_EVENING,
    ACT_BEGIN_ENTITY_EDITING,
    ACT_CREATE_DINING_TABLE,
    ACT_CREATE_ORDINATION, ACT_DELETE_DINING_TABLE,
    ACT_DESELECT_EVENING,
    ACT_REMOVE_FROM_ENTITY_PROPERTY,
    ACT_SELECT_EVENING,
    ACT_SET_ENTITY_PROPERTY,
    ACT_UPDATE_DINING_TABLE,
    ACT_UPDATE_ENTITY,
    ACT_UPDATE_ENTITY_PROPERTY,
    ACT_UPDATE_ORDINATION
} from "../actions/ActionTypes";
import AbstractStore from "./AbstractStore";
import dispatcher from "../dispatcher/SimpleDispatcher";
import eveningSelectionFormStore from "./EveningSelectionFormStore";
import eveningStore from "./EveningStore";
import waitersStore from "./generic/WaitersStore";
import tablesStore from "./generic/TablesStore";
import categoriesStore from "./generic/CategoriesStore";
import dishesStore from "./generic/DishesStore";
import phasesStore from "./PhasesStore";
import additionsStore from "./generic/AdditionsStore";
import {findByUuid} from "../utils/Utils";

const {List, Map} = require('immutable');

const EVT_ENTITY_EDITOR_STORE_CHANGED = "EVT_ENTITY_EDITOR_STORE_CHANGED";

export const DINING_TABLE_TYPE = "DiningTable";
export const EVENING_TYPE = "Evening";
export const ORDINATION_TYPE = "Ordination";
export const ORDERS_TYPE = "Orders";

class EntityEditorStore extends AbstractStore {

    constructor() {
        super(EVT_ENTITY_EDITOR_STORE_CHANGED);
        this.entities = Map();
    }

    find(type) {
        return this.entities.get(type);
    }

    acquire(type, entity) {
        this.entities = this.entities.set(type, entity);
    }

    release(type) {
        this.entities = this.entities.remove(type);
    }

    setProperty(type, property, newValue) {
        this.entities = this.entities.updateIn([type, property], oldValue => newValue)
    }

    updateProperty(type, property, updater) {
        this.entities = this.entities.updateIn([type, property], updater)
    }

    addToProperty(type, property, newValues) {
        this.entities = this.entities.updateIn([type, property], list => list.concat(newValues))
    }

    removeFromProperty(type, property, index) {
        this.entities = this.entities.updateIn([type, property], list => list.remove(index))
    }

    handleCompletedAction(action) {
        dispatcher.waitFor([
            eveningSelectionFormStore.getToken(),
            eveningStore.getToken(),
            waitersStore.getToken(),
            tablesStore.getToken(),
            categoriesStore.getToken(),
            dishesStore.getToken(),
            phasesStore.getToken(),
            additionsStore.getToken()
        ]);

        let changed = true;
        switch (action.type) {
            case ACT_BEGIN_ENTITY_EDITING:
                this.acquire(action.body.get('type'), action.body.get('entity'));
                break;
            case ACT_ABORT_ENTITY_EDITING:
                this.release(action.body);
                break;
            case ACT_SET_ENTITY_PROPERTY:
                this.setProperty(action.body.get('type'), action.body.get('property'), action.body.get('value'));
                break;
            case ACT_UPDATE_ENTITY_PROPERTY:
                this.updateProperty(action.body.get('type'), action.body.get('property'), action.body.get('updater'));
                break;
            case ACT_UPDATE_ENTITY:
                let oldEntity = this.find(action.body.get('type'));
                let newEntity = action.body.get('updater')(oldEntity);
                this.acquire(action.body.get('type'), newEntity);
                break;
            case ACT_ADD_TO_ENTITY_PROPERTY:
                let values = action.body.get('values') ? action.body.get('values') : List(action.body.get('value'));
                this.addToProperty(action.body.get('type'), action.body.get('property'), values);
                break;
            case ACT_REMOVE_FROM_ENTITY_PROPERTY:
                this.removeFromProperty(action.body.get('type'), action.body.get('property'), action.body.get('index'))
                break;
            case ACT_SELECT_EVENING:
            case ACT_ASK_SELECTED_EVENING:
            case ACT_DESELECT_EVENING:
            case ACT_DELETE_DINING_TABLE:
                this.release(DINING_TABLE_TYPE);
                this.release(ORDINATION_TYPE);
                break;
            case ACT_CREATE_DINING_TABLE:
            case ACT_UPDATE_DINING_TABLE:
                this.acquire(DINING_TABLE_TYPE, action.body);
                break;
            case ACT_CREATE_ORDINATION:
            case ACT_UPDATE_ORDINATION:
                this.release(ORDERS_TYPE);
                this.acquire(ORDINATION_TYPE, action.body);
                this.acquire(DINING_TABLE_TYPE, findByUuid(eveningStore.getEvening().getPayload().get('diningTables'), action.body.get('table')));
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    getState() {
        return Map({
            entities: this.entities
        });
    }

}

const entityEditorStore = new EntityEditorStore();
export default entityEditorStore;