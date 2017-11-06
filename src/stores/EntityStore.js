import EventEmitter from "events";
import {strcmp} from "../utils/Utils";

export default class EntityStore extends EventEmitter {
    constructor(entityName) {
        super();
        this.entityName = entityName;
        this.entities = new Map();
    }

    storeEntities(entities) {
        this.entities.clear();
        entities.forEach(e => {
            this.entities.set(e.uuid, e);
        })
    }

    getEntities() {
        return Array.from(this.entities.values());
    }

    getSortedEntities() {
        return Array.from(this.entities.values()).sort(this.getComparator);
    }

    getComparator(e1, e2) {
        return strcmp(e1.uuid, e2.uuid);
    }

    addEntity(entity) {
        this.entities.set(entity.uuid, entity);
    }

    deleteEntity(entity) {
        this.entities.delete(entity.uuid);
    }

    updateEntity(entity) {
        this.entities.set(entity.uuid, entity);
    }

    handleAction(action){
        if(action.isCompleted()){
            this.handleCompletedAction(action);
        }else if(action.isInProgress()){
            this.handleStartedAction(action);
        }else if(action.isError()){
            this.handleErrorAction(action);
        }else if(action.isFailed()){
            this.handleFailedAction(action);
        }
    }

    handleCompletedAction(action){}
    handleStartedAction(action){}
    handleErrorAction(action){}
    handleFailedAction(action){}
}
