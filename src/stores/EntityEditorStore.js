import {
    ACT_ABORT_ENTITY_EDITING,
    ACT_BEGIN_ENTITY_EDITING,
    ACT_SET_ENTITY_PROPERTY,
    ACT_UPDATE_ENTITY,
    ACT_UPDATE_ENTITY_PROPERTY
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

const {List, Map} = require('immutable');

const EVT_ENTITY_EDITOR_STORE_CHANGED = "EVT_ENTITY_EDITOR_STORE_CHANGED";

export const DINING_TABLE_TYPE = "DiningTable";
export const EVENING_TYPE = "Evening";
export const ORDINATION_TYPE = "Ordination";
export const ORDERS_TYPE = "Orders";

class EntityEditorStore extends AbstractStore {

    constructor() {
        super(EVT_ENTITY_EDITOR_STORE_CHANGED);
        this.entities = List();
    }

    find(type) {
        let result = null;
        this.entities.forEach(entity => {
            if(entity.get('type') === type){
                result = entity.get('entity');
            }
        });
        return result;
    }

    acquire(type, entity) {
        this.entities = this.entities.push(Map({type: type, entity: entity}));
    }

    release(type) {
        let index = this.entities.findIndex(entity => entity.get('type') === type);
        if(index !== -1){
            this.entities = this.entities.splice(index);
        }
    }

    setProperty(type, property, newValue) {
        let oldEntity = this.entities.get(-1);
        if(oldEntity.get('type') === type) {
            oldEntity = oldEntity.updateIn(['entity', property], oldValue => newValue);
            this.entities = this.entities.splice(-1);
            this.entities = this.entities.push(oldEntity);
        }else{
            console.log("Editing wrong entity! " + type + " instead of " + oldEntity.get('type'));
        }
    }

    updateProperty(type, property, updater) {
        let oldEntity = this.entities.get(-1);
        if(oldEntity.get('type') === type) {
            oldEntity = oldEntity.updateIn(['entity', property], updater);
            this.entities = this.entities.splice(-1);
            this.entities = this.entities.push(oldEntity);
        }else{
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
                this.refreshEntity(action.body.get('type'), newEntity);
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