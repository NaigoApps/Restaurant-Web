import eveningActions from "../../actions/pages/EveningActions";
import waitersActions from "../../generic/WaitersActions";
import tablesActions from "../../generic/TablesActions";
import categoriesActions from "../menu/CategoriesActions";
import dishesActions from "../menu/DishesActions";
import phasesActions from "../../actions/PhasesActions";
import additionsActions from "../../generic/AdditionsActions";
import ordinationsActions from "./OrdinationsActions";

class EveningPageActions {

    initEveningPage(){
        eveningActions.retrieveSelectedEvening();
        waitersActions.retrieveWaiters();
        tablesActions.retrieveTables();
        ordinationsActions.retrieveOrdinations();
        categoriesActions.retrieveCategories();
        dishesActions.retrieveAllDishes();
        phasesActions.retrievePhases();
        additionsActions.retrieveAdditions();
    }
}

const eveningPageActions = new EveningPageActions();
export default eveningPageActions;