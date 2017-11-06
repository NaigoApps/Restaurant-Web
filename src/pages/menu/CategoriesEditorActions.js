import requestBuilder from "../../actions/RequestBuilder";
import {ACT_DELETE_CATEGORY, ACT_SELECT_CATEGORY, ACT_UPDATE_CATEGORY} from "../../actions/ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import dishesActions from "./DishesActions";


class CategoriesEditorActions {

    deleteCategory(category) {
        requestBuilder.remove(ACT_DELETE_CATEGORY, 'categories', category)
    }

    updateCategoryName(uuid, value) {
        requestBuilder.put(ACT_UPDATE_CATEGORY, 'categories/' + uuid + '/name', value);
    }

    updateCategoryLocation(uuid, value) {
        requestBuilder.put(ACT_UPDATE_CATEGORY, 'categories/' + uuid + '/location', value);
    }

    selectCategory(category) {
        dispatcher.fireEnd(ACT_SELECT_CATEGORY, category);
        dishesActions.retrieveDishesByCategory(category);
    }

    deselectCategory() {
        dispatcher.fireEnd(ACT_SELECT_CATEGORY, null);
    }

}

const categoriesEditorActions = new CategoriesEditorActions();
export default categoriesEditorActions;