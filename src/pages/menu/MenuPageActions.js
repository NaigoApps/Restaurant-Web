import categoriesActions from "./CategoriesActions";
import dishesActions from "./DishesActions";
import locationsActions from "../../generic/LocationsActions";
import additionsActions from "../../generic/AdditionsActions";

class MenuPageActions {

    initMenuPage(){
        categoriesActions.retrieveCategories();
        dishesActions.retrieveAllDishes();
        dishesActions.retrieveDishesStatuses();
        locationsActions.retrieveLocations();
        additionsActions.retrieveAdditions();
    }

}

const menuPageActions = new MenuPageActions();
export default menuPageActions;