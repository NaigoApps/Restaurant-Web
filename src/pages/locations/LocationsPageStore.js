import AbstractStore from "../../stores/RootFeatureStore";
import {Utils} from "../../utils/Utils";
import {EntitiesUtils} from "../../utils/EntitiesUtils";
import {ApplicationActionTypes} from "../../actions/ApplicationActions";
import applicationStore from "../../stores/ApplicationStore";
import dataStore, {Topics} from "../../stores/DataStore";
import EditorMode from "../../utils/EditorMode";
import {DataActionTypes} from "../../actions/DataActions";
import {LocationsPageActionTypes} from "./LocationsPageActions";
import Location from "../../model/Location";

const EVT_LOCATIONS_PAGE_STORE_CHANGED = "EVT_LOCATIONS_PAGE_STORE_CHANGED";

class LocationsPageStore extends AbstractStore {

    constructor() {
        super(EVT_LOCATIONS_PAGE_STORE_CHANGED);
        this.navigator = {
            page: 0
        };
        this.editor = {
            mode: null,
            location: null
        };
    }

    getStoreDependencies() {
        return [dataStore, applicationStore];
    }

    getCompletionHandlers() {
        const handlers = {};
        handlers[LocationsPageActionTypes.SELECT_EDITING_LOCATION] = (location) => this.initEditor(location, false);
        handlers[LocationsPageActionTypes.SELECT_LOCATION_NAVIGATOR_PAGE] = (index) => this.navigator.page = index;
        handlers[LocationsPageActionTypes.BEGIN_LOCATION_CREATION] = () =>
            this.initEditor(new Location(EntitiesUtils.newLocation(), dataStore.getPool()), true);
        handlers[LocationsPageActionTypes.SET_LOCATION_EDITOR_NAME] = (name) => this.editor.location.name = name;
        handlers[LocationsPageActionTypes.SET_LOCATION_EDITOR_PRINTER] = (printer) => this.editor.location.printer = printer;
        handlers[LocationsPageActionTypes.CREATE_LOCATION] = (location) =>
            this.initEditor(new Location(location.toJS(), dataStore.getPool()));
        handlers[LocationsPageActionTypes.UPDATE_EDITING_LOCATION] = (location) =>
            this.initEditor(new Location(location.toJS(), dataStore.getPool()));
        handlers[LocationsPageActionTypes.DELETE_EDITING_LOCATION] = () => this.initEditor();

        handlers[DataActionTypes.LOAD_LOCATIONS] = () => Utils.nop();
        handlers[ApplicationActionTypes.LOAD_SETTINGS] = () => Utils.nop();

        return handlers;
    }

    initEditor(location, creating) {
        this.editor = {
            mode: null,
            location: null
        };
        if (location) {
            this.editor.mode = creating ? EditorMode.CREATING : EditorMode.EDITING;
            this.editor.location = location;
        }
    }

    getState() {
        return {
            data: {
                locations: dataStore.getEntities(Topics.LOCATIONS),
                printers: dataStore.getEntities(Topics.PRINTERS),

                navigator: this.navigator,
                editor: this.editor,
                settings: applicationStore.getSettings()
            }
        }

    }
}

const locationsPageStore = new LocationsPageStore();
export default locationsPageStore;