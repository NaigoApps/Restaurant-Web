import {
    ACT_ASK_SELECTED_EVENING,
    ACT_DESELECT_EVENING,
    ACT_SELECT_EVENING
} from "../../../actions/ActionTypes";
import StoresUtils from "../../StoresUtils";
import {iSet} from "../../../utils/Utils";
import SubFeatureStore from "../../../stores/SubFeatureStore";
import eveningPageStore from "../EveningPageStore";
import {Actions} from "./EveningSelectorActions";

const {Map} = require('immutable');

class EveningSelectorStore extends SubFeatureStore {

    constructor() {
        super(eveningPageStore, "eveningSelector");
        let date = new Date();
        this.month = date.getMonth();
        this.year = date.getFullYear();

        this.monthEditor = StoresUtils.createSelectEditor(this.month);
        this.yearEditor = StoresUtils.createIntEditor(this.year)
    }

    getState() {
        return Map({
            month: this.month,
            year: this.year,
            monthEditor: this.monthEditor,
            yearEditor: this.yearEditor
        })
    }

    getActions() {
        return [
            ACT_SELECT_EVENING,
            ACT_DESELECT_EVENING,
            ACT_ASK_SELECTED_EVENING,
        ].concat(Object.values(Actions))
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case Actions.ACT_START_EVENING_MONTH_EDITING:
                this.setMonthEditorVisible(true);
                this.setMonthEditorValue(this.month);
                break;
            case Actions.ACT_SELECT_EVENING_MONTH:
                this.setMonthEditorValue(action.body);
                break;
            case Actions.ACT_CONFIRM_EVENING_MONTH_EDITING:
                this.setMonthEditorVisible(false);
                this.month = action.body;
                break;
            case Actions.ACT_ABORT_EVENING_MONTH_EDITING:
                this.setMonthEditorVisible(false);
                this.setMonthEditorValue(this.month);
                break;
            case Actions.ACT_START_EVENING_YEAR_EDITING:
                this.setYearEditorVisible(true);
                this.setYearEditorValue(this.year);
                break;
            case Actions.ACT_EVENING_YEAR_CHANGE:
                this.setYearText(action.body);
                break;
            case Actions.ACT_EVENING_YEAR_CHAR:
                this.addYearChar(action.body);
                break;
            case Actions.ACT_CONFIRM_EVENING_YEAR_EDITING:
                this.setYearEditorVisible(false);
                this.year = action.body;
                this.setYearEditorValue(this.year);
                break;
            case Actions.ACT_ABORT_EVENING_YEAR_EDITING:
                this.setYearEditorVisible(false);
                this.setYearEditorValue(this.year);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    setMonthEditorVisible(value) {
        this.monthEditor = iSet(this.monthEditor, "visible", value);
    }

    setYearEditorVisible(value) {
        this.yearEditor = iSet(this.yearEditor, "visible", value);
    }

    setYearEditorValue(value) {
        this.yearEditor = iSet(this.yearEditor, "text", value.toString());
    }

    setMonthEditorValue(value) {
        this.monthEditor = iSet(this.monthEditor, "value", value);
    }

    setYearText(text) {
        this.yearEditor = iSet(this.yearEditor, "text", text.toString());
    }

    addYearChar(char) {
        this.yearEditor = StoresUtils.intChar(this.yearEditor, char);
    }

}

const eveningSelectorStore = new EveningSelectorStore();
export default eveningSelectorStore;