import dispatcher from "../dispatcher/SimpleDispatcher";
import requestBuilder from "./RequestBuilder";

export function selectEntity(entity, entityName) {
    // dispatcher.fireEnd(Actions.SELECTED_ENTITY, entityName, entity);
}

export function retrieveEntities(entityName, option) {
    // dispatcher.fireStart(LOAD_ENTITIES, entityName);
    // asyncActionBuilder.get('http://localhost:8080/restaurant/rest/' + entityName + '/' + option)
    //     .then((response) => response.json())
    //     .then((entitiesList) => {
    //         dispatcher.fireEnd(LOAD_ENTITIES, entityName, entitiesList);
    //     })
    //     .catch((error) => {
    //         dispatcher.fireFailure(LOAD_ENTITIES, entityName, error);
    //     });
}

export function confirmUpdateEntity(entity, entityName) {
    // fireAction(Actions.EDITING_ENTITY, entityName);
    // asyncActionBuilder.post('http://localhost:8080/restaurant/rest/' + entityName + '/update', JSON.stringify(entity))
    //     .then((response) => response.json())
    //     .then((entity) => {
    //         fireAction(Actions.UPDATED_ENTITY, entityName, entity);
    //     })
    //     .catch((error) => {
    //         fireAction(Actions.EDITING_ERROR, entityName, error);
    //     });
}

export function confirmCreateEntity(entity, entityName) {
    // dispatcher.fireStart(CREATE_ENTITY, entityName);
    // asyncActionBuilder.post('http://localhost:8080/restaurant/rest/' + entityName + '/create', JSON.stringify(entity))
    //     .then((response) => response.json())
    //     .then((entity) => {
    //         dispatcher.fireEnd(CREATE_ENTITY, entityName, entity);
    //     })
    //     .catch((error) => {
    //         dispatcher.fireFailure(CREATE_ENTITY, entityName, error);
    //     });
}

export function confirmDeleteEntity(entity, entityName) {
    // fireAction(Actions.DELETING_ENTITY, entityName);
    // if (entity.uuid !== undefined) {
    //     asyncActionBuilder.post('http://localhost:8080/restaurant/rest/' + entityName + '/delete', JSON.stringify(entity))
    //         .then((response) => response.json())
    //         .then((entity) => {
    //             fireAction(Actions.DELETED_ENTITY, entityName, entity);
    //         })
    //         .catch((error) => {
    //             fireAction(Actions.DELETING_ERROR, entityName, error);
    //         });
    // } else {
    //     fireAction(Actions.DELETING_ERROR, entityName, "Invalid");
    // }
}