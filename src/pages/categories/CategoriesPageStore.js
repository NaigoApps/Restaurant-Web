import RootFeatureStore from "../../stores/RootFeatureStore";
import EditorMode from "../../utils/EditorMode";
import {EntitiesUtils} from "../../utils/EntitiesUtils";
import {ApplicationActionTypes} from "../../actions/ApplicationActions";
import applicationStore from "../../stores/ApplicationStore";
import dataStore, {Topics} from "../../stores/DataStore";
import Category from "../../model/Category";
import {Utils} from "../../utils/Utils";
import {CategoriesPageActions} from "./CategoriesPageActions";
import {DataActionTypes} from "../../actions/DataActions";

const EVT_CATEGORIES_PAGE_STORE_CHANGED = "EVT_CATEGORIES_PAGE_STORE_CHANGED";

class CategoriesPageStore extends RootFeatureStore {

    constructor() {
        super(EVT_CATEGORIES_PAGE_STORE_CHANGED);
        this.initEditor();
        this.navigator = {
            page: 0
        }
    }

    initEditor(category, creating) {
        this.editor = {
            mode: null,
            category: null
        };
        if (category) {
            this.editor.mode = creating ? EditorMode.CREATING : EditorMode.EDITING;
            this.editor.category = category;
        }
    }

    getState() {
        return {
            data: {
                categories: dataStore.getEntities(Topics.CATEGORIES),
                locations: dataStore.getEntities(Topics.LOCATIONS),
                additions: dataStore.getEntities(Topics.ADDITIONS),

                editor: this.editor,
                navigator: this.navigator,

                settings: applicationStore.getSettings()
            }
        }
    }

    getStoreDependencies() {
        return [dataStore, applicationStore];
    }

    getCompletionHandlers() {
        const handlers = {};
        handlers[CategoriesPageActions.BEGIN_CATEGORY_CREATION] = () =>
            this.initEditor(Category.create(EntitiesUtils.newCategory(), dataStore.getPool()), true);
        handlers[CategoriesPageActions.SET_CATEGORY_EDITOR_NAME] = (value) => this.editor.category.name = value;
        handlers[CategoriesPageActions.SET_CATEGORY_EDITOR_LOCATION] = (value) => this.editor.category.location = value;
        handlers[CategoriesPageActions.SET_CATEGORY_EDITOR_COLOR] = (value) => this.editor.category.color = value;
        handlers[CategoriesPageActions.CREATE_CATEGORY] = (cat) =>
            this.initEditor(Category.create(cat.toJS(), dataStore.getPool()));
        handlers[CategoriesPageActions.SELECT_EDITING_CATEGORY] = (cat) => this.initEditor(cat);
        handlers[CategoriesPageActions.UPDATE_EDITING_CATEGORY] = (cat) =>
            this.initEditor(Category.create(cat.toJS(), dataStore.getPool()));
        handlers[CategoriesPageActions.DELETE_EDITING_CATEGORY] = () =>
            this.initEditor();
        handlers[CategoriesPageActions.SELECT_EDITING_CATEGORY_PAGE] = (page) => this.navigator.page = page;


        handlers[ApplicationActionTypes.LOAD_SETTINGS] = () => Utils.nop();
        handlers[DataActionTypes.LOAD_CATEGORIES] = () => Utils.nop();
        handlers[DataActionTypes.LOAD_LOCATIONS] = () => Utils.nop();
        handlers[DataActionTypes.LOAD_ADDITIONS] = () => Utils.nop();
        return handlers;
    }

}

const categoriesPageStore = new CategoriesPageStore();
export default categoriesPageStore;