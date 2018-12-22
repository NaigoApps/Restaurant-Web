import AbstractStore from "../../stores/AbstractStore";
import EditorMode from "../../utils/EditorMode";
import {EntitiesUtils} from "../../utils/EntitiesUtils";
import {ApplicationActionTypes} from "../../actions/ApplicationActions";
import applicationStore from "../../stores/ApplicationStore";
import dataStore from "../../stores/DataStore";
import Category from "../../model/Category";
import {Utils} from "../../utils/Utils";
import {CategoriesPageActions} from "./CategoriesPageActions";
import {DataActionTypes} from "../../actions/DataActions";

const EVT_CATEGORIES_PAGE_STORE_CHANGED = "EVT_CATEGORIES_PAGE_STORE_CHANGED";

class CategoriesPageStore extends AbstractStore {

    constructor() {
        super("categories", EVT_CATEGORIES_PAGE_STORE_CHANGED, applicationStore, dataStore);
        this.initEditor();
        this.navigator = {
            page: 0
        }
    }

    getActionsClass() {
        return CategoriesPageActions;
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

    buildState() {
        return {
            editor: this.editor,
            navigator: this.navigator,
        }
    }

    getActionCompletedHandlers() {
        const handlers = {};
        handlers[CategoriesPageActions.BEGIN_CATEGORY_CREATION] = () =>
            this.initEditor(Category.create(EntitiesUtils.newCategory(), dataStore.getPool()), true);
        handlers[CategoriesPageActions.SET_CATEGORY_EDITOR_NAME] = (value) => this.editor.category.name = value;
        handlers[CategoriesPageActions.SET_CATEGORY_EDITOR_LOCATION] = (value) => this.editor.category.location = value;
        handlers[CategoriesPageActions.SET_CATEGORY_EDITOR_COLOR] = (value) => this.editor.category.color = value;
        handlers[CategoriesPageActions.CREATE_CATEGORY] = (cat) =>
            this.initEditor(dataStore.getEntity(cat.uuid));
        handlers[CategoriesPageActions.SELECT_EDITING_CATEGORY] = (cat) => this.initEditor(cat);
        handlers[CategoriesPageActions.UPDATE_EDITING_CATEGORY] = (cat) =>
            this.initEditor(dataStore.getEntity(cat.uuid));
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