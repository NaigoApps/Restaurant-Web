import EventEmitter from "events";
import dispatcher from "../dispatcher/SimpleDispatcher";
import StoresUtils from "../pages/StoresUtils";

export default class AbstractStore extends EventEmitter {

    constructor(storeName, changeEvent, ...children) {
        super();
        this.token = dispatcher.register(this.handleAction.bind(this));
        this.storeName = storeName;
        this.changeEvent = changeEvent;
        this.children = children.slice();
        this.actions = [];
        this.postConstruct();
    }

    postConstruct() {
        this.actionCompletedHandlers = this.getActionCompletedHandlers();
        const actionClass = this.getActionsClass();

        if (actionClass === StoresUtils.ALL_ACTIONS) {
            this.actions = StoresUtils.ALL_ACTIONS;
        } else if (actionClass) {
            this.actions = Reflect.ownKeys(actionClass)
                .filter(propName => typeof Reflect.getOwnPropertyDescriptor(actionClass, propName).value === "string");
        }
    }

    /**
     * Subclasses may override this
     * @returns {object} Class that contains action names. All string properties will be taken
     */
    getActionsClass() {
        return null;
    }

    getActions() {
        return this.actions;
    }

    /**
     * Subclasses may override this
     * @returns {object} Map of completion handlers
     */
    getActionCompletedHandlers() {
        return {};
    }

    getToken() {
        return this.token;
    }

    addChangeListener(callback) {
        this.addListener(this.changeEvent, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(this.changeEvent, callback);
    }

    waitFor(stores){

    }

    handleAction(action) {
        let changed = false;

        dispatcher.waitFor(this.children.map(child => child.getToken()));

        if (action.isCompleted()) {
            if (this.actionCompletedHandlers[action.type]) {
                this.actionCompletedHandlers[action.type](action.body, action.request);
                changed = true;
            } else {
                //FIXME Remove this
                changed |= this.handleCompletedAction(action);
            }
            // this.children.forEach(store => changed |= AbstractStore.isActionUsedBy(store, action));

        } else if (action.isInProgress()) {
            changed |= this.handleStartedAction(action);
        } else if (action.isError()) {
            changed |= this.handleErrorAction(action);
        } else if (action.isFailed()) {
            changed |= this.handleFailedAction(action);
        }


        if (changed) {
            // console.warn(action.type + " USED BY " + this.constructor.name);
            this.emit(this.changeEvent, this.getState());
        }
    }

    // static isActionUsedBy(store, action) {
    //     if (store.getActions() === StoresUtils.ALL_ACTIONS || store.getActions().includes(action.type)) {
    //         return true;
    //     }
    //     let used = false;
    //     store.children.forEach(child => used |= AbstractStore.isActionUsedBy(child, action));
    //     return used;
    // }

    buildState() {
        console.warn("No buildState() method definition in " + this.constructor.name);
        return {};
    }

    getState() {
        // this.children.forEach(store => {
        //     data[store.storeName] = store.getState();
        // });

        const state = {};
        state[this.storeName] = this.buildState();
        return state;
    }

    handleCompletedAction(action) {
        // console.warn("No completed event handler");
        return false;
    }

    handleStartedAction(action) {
        // console.warn("No started event handler");
        return false;
    }

    handleErrorAction(action) {
        // console.warn("No error event handler");
        return false;
    }

    handleFailedAction(action) {
        // console.warn("No failed event handler");
        return false;
    }

    static assign(handlers, actions, func){
        actions.forEach(action => handlers[action] = func)
    }
}
