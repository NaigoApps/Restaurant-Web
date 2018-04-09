import {Dispatcher} from "flux";
import {ACTION_COMPLETED, ACTION_ERROR, ACTION_FAILED, ACTION_STARTED} from "../actions/ActionPhases";

/*
* Dispatcher sends actions to Stores
*
* Actions are made of:
* - Type
* - Entity name
* - Body
*
* */

class SimpleDispatcher extends Dispatcher {

    buildAction(phase, type, body) {
        return {
            phase: phase,
            type: type,
            body: body,
            isCompleted: function () {
                return this.phase === ACTION_COMPLETED;
            },
            isFailed: function () {
                return this.phase === ACTION_FAILED;
            },
            isError: function () {
                return this.phase === ACTION_ERROR;
            },
            isInProgress: function () {
                return this.phase === ACTION_STARTED;
            }
        }
    }

    fireStart(type, body) {
        console.log(type + " -> STARTING");
        this.dispatch(this.buildAction(ACTION_STARTED, type, body));
        console.log(type + " -> STARTED");
    }

    fireEnd(type, body) {
        console.log(type + " -> COMPLETING");
        console.log(body);
        this.dispatch(this.buildAction(ACTION_COMPLETED, type, body));
        console.log(type + " -> COMPLETED");
    }

    fireError(type, body) {
        this.dispatch(this.buildAction(ACTION_ERROR, type, body));
        console.log(type + " -> " + ACTION_ERROR);
    }

    fireFailure(type, body) {
        this.dispatch(this.buildAction(ACTION_FAILED, type, body));
        console.log(type + " -> " + ACTION_FAILED);
    }
}

const dispatcher = new SimpleDispatcher();

export default dispatcher;