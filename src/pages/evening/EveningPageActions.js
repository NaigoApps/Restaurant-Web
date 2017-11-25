import eveningActions from "../../actions/pages/EveningActions";
import waitersActions from "../../generic/WaitersActions";
import tablesActions from "../../generic/TablesActions";
import categoriesActions from "../menu/CategoriesActions";
import dishesActions from "../menu/DishesActions";
import phasesActions from "../../actions/PhasesActions";

class EveningPageActions {

    initEveningPage(){
        eveningActions.retrieveSelectedEvening();
        waitersActions.retrieveWaiters();
        tablesActions.retrieveTables();
        categoriesActions.retrieveCategories();
        dishesActions.retrieveAllDishes();
        phasesActions.retrievePhases();
    }
}

const eveningPageActions = new EveningPageActions();
export default eveningPageActions;