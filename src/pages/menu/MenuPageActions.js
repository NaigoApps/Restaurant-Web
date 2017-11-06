import categoriesActions from "./CategoriesActions";
import dishesActions from "./DishesActions";
import locationsActions from "../../generic/LocationsActions";

class MenuPageActions {

    initMenuPage(){
        categoriesActions.retrieveCategories();
        dishesActions.retrieveAllDishes();
        locationsActions.retrieveLocations();
    }

}

const menuPageActions = new MenuPageActions();
export default menuPageActions;