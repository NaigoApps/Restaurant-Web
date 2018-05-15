import categoriesActions from "./CategoriesActions";
import dishesActions from "./DishesActions";
import locationsActions from "../../generic/LocationsActions";
import additionsActions from "../../generic/AdditionsActions";
import {ApplicationActions} from "../../actions/ApplicationActions";

class MenuPageActions {

    initMenuPage(){
        categoriesActions.retrieveCategories();
        dishesActions.retrieveAllDishes();
        dishesActions.retrieveDishesStatuses();
        locationsActions.retrieveLocations();
        additionsActions.retrieveAdditions();
        ApplicationActions.loadSettings();
    }

}

const menuPageActions = new MenuPageActions();
export default menuPageActions;