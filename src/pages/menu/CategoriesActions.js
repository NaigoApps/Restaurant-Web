import requestBuilder from "../../actions/RequestBuilder";
import {ACT_RETRIEVE_CATEGORIES} from "../../actions/ActionTypes";
import dishesActions from "./DishesActions";
import categoriesStore from "../../generic/CategoriesStore";


class CategoriesActions {

    retrieveCategories() {
        requestBuilder.get(ACT_RETRIEVE_CATEGORIES, 'categories');
    }

}

const categoriesActions = new CategoriesActions();
export default categoriesActions;