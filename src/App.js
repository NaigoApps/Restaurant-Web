import React, {Component} from 'react';
import HomePage from "./pages/HomePage";
import ConfigurationPage from "./pages/ConfigurationPage";
import PrintersPage from "./pages/printers/PrintersPage";
import LocationsPage from "./pages/locations/LocationsPage";
import TablesPage from "./pages/tables/TablesPage";
import WaitersPage from "./pages/waiters/WaitersPage";
import MenuPage from "./pages/menu/MenuPage";
import AdditionsPage from "./pages/additions/AdditionsPage";
import CustomersPage from "./pages/customers/CustomersPage";
import EveningPage from "./pages/eveningsEditing/EveningPage";
import applicationStore from "./stores/ApplicationStore";
import eveningSelectorStore from "./pages/eveningsEditing/eveningSelector/EveningSelectorStore";
import diningTablesEditingStore from "./pages/eveningsEditing/diningTablesEditing/DiningTableEditorStore";
import ordinationEditingStore from "./pages/eveningsEditing/diningTablesEditing/ordinationsEditing/OrdinationEditingStore";
import ordersEditingStore from "./pages/eveningsEditing/diningTablesEditing/ordinationsEditing/ordersEditing/OrdersEditingStore";
import diningTableClosingStore
    from "./pages/eveningsEditing/diningTablesEditing/diningTableClosing/DiningTableClosingStore";
import SettingsPage from "./pages/SettingsPage";

const {Map} = require('immutable');

export const HOME = "HOME";
export const CONFIGURATION = "CONFIGURATION";
export const SETTINGS = "SETTINGS";
export const PRINTERS = "PRINTERS";
export const LOCATIONS = "LOCATIONS";
export const TABLES = "TABLES";
export const WAITERS = "WAITERS";
export const MENU = "MENU";
export const ADDITIONS = "ADDITIONS";
export const CUSTOMERS = "CUSTOMERS";
export const EVENINGS = "EVENINGS";

let pages = Map({
    HOME: <HomePage/>,
    CONFIGURATION: <ConfigurationPage/>,
    SETTINGS: <SettingsPage/>,
    PRINTERS: <PrintersPage/>,
    LOCATIONS: <LocationsPage/>,
    TABLES: <TablesPage/>,
    WAITERS: <WaitersPage/>,
    MENU: <MenuPage/>,
    ADDITIONS: <AdditionsPage/>,
    CUSTOMERS: <CustomersPage/>,
    EVENINGS: <EveningPage/>
});

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: null
        };

        this.requireModules();

        this.updateState = this.updateState.bind(this);
    }

    requireModules(){
        console.log("Requiring " + eveningSelectorStore.getFeatureName());
        console.log("Requiring " + diningTablesEditingStore.getFeatureName());
        console.log("Requiring " + ordinationEditingStore.getFeatureName());
        console.log("Requiring " + ordersEditingStore.getFeatureName());
        console.log("Requiring " + diningTableClosingStore.getFeatureName());
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
        let pageName = this.state.currentPage;
        for (let key of pages.keys()) {
            if (key === pageName) {
                return pages.get(pageName);
            }
        }
        return <HomePage/>;
    }
}

export default App;
