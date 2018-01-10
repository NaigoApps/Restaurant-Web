import eveningActions from "../../actions/pages/EveningActions";
import waitersActions from "../../generic/WaitersActions";
import tablesActions from "../../generic/TablesActions";
import categoriesActions from "../menu/CategoriesActions";
import phasesActions from "../../actions/PhasesActions";
import additionsActions from "../../generic/AdditionsActions";
import dishesActions from "../menu/DishesActions";

class EveningPageActions {

    initEveningPage(){
        eveningActions.retrieveSelectedEvening();

        waitersActions.retrieveWaiters();
        phasesActions.retrievePhases();
        additionsActions.retrieveAdditions();
        tablesActions.retrieveTables();

        categoriesActions.retrieveCategories();
        dishesActions.retrieveAllDishes();
    }
}

const eveningPageActions = new EveningPageActions();
export default eveningPageActions;