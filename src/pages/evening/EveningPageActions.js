import eveningActions from "../../actions/pages/EveningActions";
import waitersActions from "../../generic/WaitersActions";
import tablesActions from "../../generic/TablesActions";
import categoriesActions from "../menu/CategoriesActions";
import dishesActions from "../menu/DishesActions";

class EveningPageActions {

    initEveningPage(){
        eveningActions.retrieveSelectedEvening();
        waitersActions.retrieveWaiters();
        tablesActions.retrieveTables();
        categoriesActions.retrieveCategories();
        dishesActions.retrieveAllDishes();
    }
}

const eveningPageActions = new EveningPageActions();
export default eveningPageActions;