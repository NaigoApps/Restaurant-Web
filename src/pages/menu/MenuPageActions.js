import categoriesActions from "./CategoriesActions";
import dishesActions from "./DishesActions";
import locationsActions from "../../generic/LocationsActions";

class MenuPageActions {

    initMenuPage(){
        categoriesActions.retrieveCategories();
        dishesActions.retrieveAllDishes();
        dishesActions.retrieveDishesStatuses();
        locationsActions.retrieveLocations();
    }

}

const menuPageActions = new MenuPageActions();
export default menuPageActions;