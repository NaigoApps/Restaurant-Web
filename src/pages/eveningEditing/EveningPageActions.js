import waitersActions from "../../generic/WaitersActions";
import tablesActions from "../../generic/TablesActions";
import categoriesActions from "../menu/CategoriesActions";
import phasesActions from "../../actions/PhasesActions";
import additionsActions from "../../generic/AdditionsActions";
import dishesActions from "../menu/DishesActions";
import customersPageActions from "../customers/CustomersPageActions";
import asyncActionBuilder from "../../actions/RequestBuilder";
import {EveningEditingActionTypes} from "./EveningEditorActions";
import {ApplicationActions} from "../../actions/ApplicationActions";

class EveningPageActions {

    initEveningPage(){
        this.retrieveSelectedEvening();

        waitersActions.retrieveWaiters();
        phasesActions.retrievePhases();
        additionsActions.retrieveAdditions();
        tablesActions.retrieveTables();
        customersPageActions.initCustomersPage();

        categoriesActions.retrieveCategories();
        dishesActions.retrieveAllDishes();
        ApplicationActions.loadSettings();
    }

    retrieveSelectedEvening() {
        asyncActionBuilder.get(EveningEditingActionTypes.GET_SELECTED, 'evenings/selected');
    }
}

const eveningPageActions = new EveningPageActions();
export default eveningPageActions;