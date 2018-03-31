import dispatcher from "../../../dispatcher/SimpleDispatcher";
import {ACT_CLOSE_EDITOR, ACT_FLOAT_INPUT_DIGIT, ACT_OPEN_EDITOR} from "../../../actions/ActionTypes";

const {Map} = require('immutable');

class InputActions {

    openEditor(namespace){
        dispatcher.fireEnd(ACT_OPEN_EDITOR, namespace);
    }

    closeEditor(namespace){
        dispatcher.fireEnd(ACT_CLOSE_EDITOR, namespace);
    }
}

const inputActions = new InputActions();
export default inputActions;