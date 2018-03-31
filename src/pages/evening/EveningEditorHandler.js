import {ACT_BEGIN_DINING_TABLE_CREATION} from "../../actions/ActionTypes";
import {iGet, iSet} from "../../utils/Utils";
import {
    ACT_EVENING_EDITOR_CC_ABORT,
    ACT_EVENING_EDITOR_CC_CHAR, ACT_EVENING_EDITOR_CC_CONFIRM,
    ACT_EVENING_EDITOR_CC_START
} from "./EveningEditorActionTypes";


const CC_EDITOR_ACTIONS = [
    ACT_EVENING_EDITOR_CC_START,
    ACT_EVENING_EDITOR_CC_CHAR,
    ACT_EVENING_EDITOR_CC_CONFIRM,
    ACT_EVENING_EDITOR_CC_START
];

class EveningEditorHandler{


    handleAction(storeData, action){
        if(CC_EDITOR_ACTIONS.includes(action.type)){
            let editorData = iGet(storeData, "ccEditor");
            return iSet(storeData, "ccEditor", FloatEditorHandle.handleEditorAction(editorData, action))
        }
        switch (action){
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
        }
    }
}

const eveningEditorHandler = new EveningEditorHandler();
export default eveningEditorHandler;