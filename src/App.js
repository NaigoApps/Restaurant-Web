import React, {Component} from 'react';
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
import eveningSelectorStore from "./pages/eveningEditing/eveningSelector/EveningSelectorStore";
import diningTableEditingStore from "./pages/eveningEditing/diningTableEditing/DiningTableEditorStore";
import ordinationEditingStore
    from "./pages/eveningEditing/diningTableEditing/ordinationsEditing/OrdinationEditingStore";
import ordersEditingStore
    from "./pages/eveningEditing/diningTableEditing/ordinationsEditing/ordersEditing/OrdersEditingStore";
import tableClosingFeatureStore
    from "./pages/eveningEditing/diningTableEditing/tableClosingFeature/TableClosingFeatureStore";
import SettingsPage from "./pages/settings/SettingsPage";
import loadingStore from "./stores/LoadingStore";
import DishesPage from "./pages/dishes/DishesPage";

const {Map} = require('immutable');

export const HOME = "HOME";
export const CONFIGURATION = "CONFIGURATION";
export const SETTINGS = "SETTINGS";
export const PRINTERS = "PRINTERS";
export const LOCATIONS = "LOCATIONS";
export const TABLES = "TABLES";
export const WAITERS = "WAITERS";
export const CATEGORIES = "CATEGORIES";
export const DISHES = "DISHES";
export const ADDITIONS = "ADDITIONS";
export const CUSTOMERS = "CUSTOMERS";
export const EVENINGS = "EVENINGS";

let pages = {
    HOME: <HomePage/>,
    CONFIGURATION: <ConfigurationPage/>,
    SETTINGS: <SettingsPage/>,
    PRINTERS: <PrintersPage/>,
    LOCATIONS: <LocationsPage/>,
    TABLES: <TablesPage/>,
    WAITERS: <WaitersPage/>,
    CATEGORIES: <CategoriesPage/>,
    DISHES: <DishesPage/>,
    ADDITIONS: <AdditionsPage/>,
    CUSTOMERS: <CustomersPage/>,
    EVENINGS: <EveningPage/>
};

class App extends Component {

    constructor(props) {
        super(props);
        this.state = applicationStore.getState();

        this.requireModules();

        this.updateState = this.updateState.bind(this);
    }

    static catch(store) {
        console.log("Catching " + store.getFeatureName());
    }

    requireModules() {
        App.catch(loadingStore);

        App.catch(eveningSelectorStore);
        App.catch(diningTableEditingStore);
        App.catch(ordinationEditingStore);
        App.catch(ordersEditingStore);
        App.catch(tableClosingFeatureStore);
    }

    componentDidMount() {
        applicationStore.addChangeListener(this.updateState);
    }

    updateState(state) {
        this.setState(state);
    }

    componentWillUnmount() {
        applicationStore.removeChangeListener(this.updateState);
    }

    render() {
        let page = pages[this.state.data.currentPage];
        return page || <HomePage/>;
    }
}

export default App;
