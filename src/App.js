import React from 'react';
import HomePage from "./pages/HomePage";
import ConfigurationPage from "./pages/ConfigurationPage";
import PrintersPage from "./pages/printers/PrintersPage";
import LocationsPage from "./pages/locations/LocationsPage";
import TablesPage from "./pages/tables/TablesPage";
import WaitersPage from "./pages/waiters/WaitersPage";
import CategoriesPage from "./pages/categories/CategoriesPage";
import AdditionsPage from "./pages/additions/AdditionsPage";
import CustomersPage from "./pages/customers/CustomersPage";
import EveningPage from "./pages/eveningEditing/EveningPage";
import applicationStore from "./stores/ApplicationStore";
import SettingsPage from "./pages/settings/SettingsPage";
import loadingStore from "./stores/LoadingStore";
import DishesPage from "./pages/dishes/DishesPage";
import ViewController from "./widgets/ViewController";
import EveningSelectionPage from "./pages/eveningEditing/eveningSelection/EveningSelectionPage";
import errorsStore from "./stores/ErrorsStore";

export class Pages {
    static HOME = "HOME";
    static CONFIGURATION = "CONFIGURATION";
    static SETTINGS = "SETTINGS";
    static PRINTERS = "PRINTERS";
    static LOCATIONS = "LOCATIONS";
    static TABLES = "TABLES";
    static WAITERS = "WAITERS";
    static CATEGORIES = "CATEGORIES";
    static DISHES = "DISHES";
    static ADDITIONS = "ADDITIONS";
    static CUSTOMERS = "CUSTOMERS";
    static EVENING_SELECTION = "EVENING_SELECTION";
    static EVENINGS = "EVENINGS";
}


let pages = {};
pages[Pages.HOME] = <HomePage/>;
pages[Pages.CONFIGURATION] = <ConfigurationPage/>;
pages[Pages.SETTINGS] = <SettingsPage/>;
pages[Pages.PRINTERS] = <PrintersPage/>;
pages[Pages.LOCATIONS] = <LocationsPage/>;
pages[Pages.TABLES] = <TablesPage/>;
pages[Pages.WAITERS] = <WaitersPage/>;
pages[Pages.CATEGORIES] = <CategoriesPage/>;
pages[Pages.DISHES] = <DishesPage/>;
pages[Pages.ADDITIONS] = <AdditionsPage/>;
pages[Pages.CUSTOMERS] = <CustomersPage/>;
pages[Pages.EVENING_SELECTION] = <EveningSelectionPage/>;
pages[Pages.EVENINGS] = <EveningPage/>;

class App extends ViewController {

    constructor(props) {
        super(props, applicationStore, loadingStore, errorsStore);
    }

    static catch(store) {
        console.log("Catching " + store.storeName);
    }

    render() {
        let page = pages[this.state.general.currentPage];
        return page || <HomePage/>;
    }
}

export default App;
