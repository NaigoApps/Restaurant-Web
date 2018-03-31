import {
    FLOAT_EDITOR_ABORT, FLOAT_EDITOR_CHAR, FLOAT_EDITOR_CONFIRM,
    FLOAT_EDITOR_START
} from "../../actions/ActionFamilies";

export default class FloatEditorHandler{
    static handleEditorAction(editor, action){
        switch (action.family){
            case FLOAT_EDITOR_START:
                break;
            case FLOAT_EDITOR_CHAR:
                break;
            case FLOAT_EDITOR_CONFIRM:
                break;
            case FLOAT_EDITOR_ABORT:
                break;
        }
    }
}

case ACT_EVENING_EDITOR_CC_START:
    this.state = iSet(this.state, "ccEditor", StoresUtils.initFloatEditor(currentEvening.get('coverCharge')));
break;
case ACT_EVENING_EDITOR_CC_CHAR:
    this.state = iSet(this.state, "ccEditor", StoresUtils.floatChar(this.state.get('ccEditor'), action.body));
break;
case ACT_EVENING_EDITOR_CC_CONFIRM:
    this.state = iSet(this.state, "ccEditor", StoresUtils.createFloatEditor(currentEvening.get('coverCharge')));
break;
case ACT_EVENING_EDITOR_CC_ABORT:
    this.state = iSet(this.state, "ccEditor", StoresUtils.createFloatEditor(currentEvening.get('coverCharge')));
break;