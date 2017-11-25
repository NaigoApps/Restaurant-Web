import requestBuilder from "../../actions/RequestBuilder";
import {
    ACT_BEGIN_CREATE_CATEGORY,
    ACT_CREATE_CATEGORY, ACT_DESELECT_CATEGORY,
    ACT_UPDATE_CATEGORY_CREATOR_NAME
} from "../../actions/ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";


class CategoriesCreatorActions {

    beginCategoryCreation() {
        dispatcher.fireEnd(ACT_BEGIN_CREATE_CATEGORY);
    }

    createCategory(category) {
        requestBuilder.post(ACT_CREATE_CATEGORY, 'categories', category);
    }

    updateCategoryName(uuid, name){
        dispatcher.fireEnd(ACT_UPDATE_CATEGORY_CREATOR_NAME, name);
    }
    deselectCategory(){
        dispatcher.fireEnd(ACT_DESELECT_CATEGORY);
    }

}

const categoriesCreatorActions = new CategoriesCreatorActions();
export default categoriesCreatorActions;