import {
    ACT_ABORT_EVENING_MONTH_EDITING,
    ACT_ABORT_EVENING_YEAR_EDITING,
    ACT_ASK_SELECTED_EVENING,
    ACT_CONFIRM_EVENING_MONTH_EDITING,
    ACT_CONFIRM_EVENING_YEAR_EDITING, ACT_DESELECT_EVENING,
    ACT_EVENING_YEAR_CHAR,
    ACT_SELECT_EVENING,
    ACT_SELECT_EVENING_MONTH,
    ACT_START_EVENING_MONTH_EDITING,
    ACT_START_EVENING_YEAR_EDITING
} from "../actions/ActionTypes";
import StoresUtils from "../pages/StoresUtils";
import {iSet} from "../utils/Utils";
import SubFeatureStore from "./SubFeatureStore";
import eveningPageStore from "../pages/evening/EveningPageStore";

const {Map} = require('immutable');

class EveningSelectionFormStore extends SubFeatureStore {

    constructor() {
        super(eveningPageStore, "eveningSelection");
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
            ACT_START_EVENING_MONTH_EDITING,
            ACT_SELECT_EVENING_MONTH,
            ACT_CONFIRM_EVENING_MONTH_EDITING,
            ACT_ABORT_EVENING_MONTH_EDITING,
            ACT_START_EVENING_YEAR_EDITING,
            ACT_EVENING_YEAR_CHAR,
            ACT_CONFIRM_EVENING_YEAR_EDITING,
            ACT_ABORT_EVENING_YEAR_EDITING
        ]
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case ACT_START_EVENING_MONTH_EDITING:
                this.setMonthEditorVisible(true);
                this.setMonthEditorValue(this.month);
                break;
            case ACT_SELECT_EVENING_MONTH:
                this.setMonthEditorValue(action.body);
                break;
            case ACT_CONFIRM_EVENING_MONTH_EDITING:
                this.setMonthEditorVisible(false);
                this.month = action.body;
                break;
            case ACT_ABORT_EVENING_MONTH_EDITING:
                this.setMonthEditorVisible(false);
                this.setMonthEditorValue(this.month);
                break;
            case ACT_START_EVENING_YEAR_EDITING:
                this.setYearEditorVisible(true);
                this.setYearEditorValue(this.year);
                break;
            case ACT_EVENING_YEAR_CHAR:
                this.appendYearChar(action.body);
                break;
            case ACT_CONFIRM_EVENING_YEAR_EDITING:
                this.setYearEditorVisible(false);
                this.year = action.body;
                break;
            case ACT_ABORT_EVENING_YEAR_EDITING:
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

    appendYearChar(value) {
        this.yearEditor = StoresUtils.intChar(this.yearEditor, value)
    }

}

const eveningSelectionFormStore = new EveningSelectionFormStore();
export default eveningSelectionFormStore;