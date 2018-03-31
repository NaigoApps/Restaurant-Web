import {
    ACT_ABORT_ENTITY_EDITING,
    ACT_BEGIN_ENTITY_EDITING,
    ACT_SET_ENTITY_PROPERTY,
    ACT_UPDATE_ENTITY
} from "../actions/ActionTypes";
import AbstractStore from "./RootFeatureStore";
import dispatcher from "../dispatcher/SimpleDispatcher";
import eveningSelectionFormStore from "./EveningSelectionFormStore";
import eveningStore from "./EveningStore";
import waitersStore from "./generic/WaitersStore";
import tablesStore from "./generic/TablesStore";
import categoriesStore from "./generic/CategoriesStore";
import dishesStore from "./generic/DishesStore";
import phasesStore from "./generic/PhasesStore";
import additionsStore from "./generic/AdditionsStore";

const {List, Map} = require('immutable');

const EVT_ENTITY_EDITOR_STORE_CHANGED = "EVT_ENTITY_EDITOR_STORE_CHANGED";

export const DINING_TABLE_TYPE = "DiningTable";
export const EVENING_TYPE = "Evening";
export const ORDINATION_TYPE = "Ordination";
export const ORDERS_TYPE = "Orders";
export const CUSTOMER_TYPE = "Customers";

export const EDITING_MODE = 0;
export const CREATING_MODE = 1;

class EntityEditorStore extends AbstractStore {

    constructor() {
        super(EVT_ENTITY_EDITOR_STORE_CHANGED);
        this.entities = List();
    }

    findImpl(type) {
        let result = null;
        this.entities.forEach(entity => {
            if (entity.get('type') === type) {
                result = entity;
            }
        });
        return result;
    }

    find(type) {
        let result = this.findImpl(type);
        if (result) {
            return result.get('entity');
        }
        return null;
    }

    isEditing(type) {
        let result = this.findImpl(type);
        if (result) {
            return result.get('mode') === EDITING_MODE;
        }
        return false;
    }

    isCreating(type) {
        let result = this.findImpl(type);
        if (result) {
            return result.get('mode') === CREATING_MODE;
        }
        return false;
    }

    acquire(type, entity, mode) {
        this.entities = this.entities.push(Map({
            type: type,
            mode: mode || EDITING_MODE,
            entity: entity
        }));
    }

    release(type) {
        let index = this.entities.findIndex(entity => entity.get('type') === type);
        if (index !== -1) {
            this.entities = this.entities.splice(index);
        }
    }

    setProperty(type, property, newValue) {
        let oldEntity = this.entities.get(-1);
        if (oldEntity.get('type') === type) {
            oldEntity = oldEntity.updateIn(['entity', property], oldValue => newValue);
            this.entities = this.entities.splice(-1);
            this.entities = this.entities.push(oldEntity);
        } else {
            console.log("Editing wrong entity! " + type + " instead of " + oldEntity.get('type'));
        }
    }

    updateProperty(type, property, updater) {
        let oldEntity = this.entities.get(-1);
        if (oldEntity.get('type') === type) {
            oldEntity = oldEntity.updateIn(['entity', property], updater);
            this.entities = this.entities.splice(-1);
            this.entities = this.entities.push(oldEntity);
        } else {
            console.log("Editing wrong entity! " + type + " instead of " + oldEntity.get('type'));
        }
    }

    refreshEntity(type, newEntity) {
        this.release(type);
        this.acquire(type, newEntity);
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
                this.release(action.body.get('type'));
                this.acquire(action.body.get('type'), action.body.get('entity'), action.body.get('mode'));
                break;
            case ACT_UPDATE_ENTITY:
                let oldEntity = this.findImpl(action.body.get('type'));
                this.release(action.body.get('type'));
                this.acquire(action.body.get('type'),
                    action.body.get('updater')(oldEntity.get('entity')),
                    oldEntity.get('mode'));
                break;
            case ACT_ABORT_ENTITY_EDITING:
                this.release(action.body);
                break;
            case ACT_SET_ENTITY_PROPERTY:
                if (action.body.get('value')) {
                    this.setProperty(action.body.get('type'), action.body.get('property'), action.body.get('value'));
                } else {
                    this.updateProperty(action.body.get('type'), action.body.get('property'), action.body.get('updater'));
                }
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    getState() {
        return this.entities;
    }

}

const entityEditorStore = new EntityEditorStore();
export default entityEditorStore;