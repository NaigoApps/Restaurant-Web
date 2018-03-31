import React, {Component} from 'react';
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import PrintersPage from "./pages/printers/PrintersPage";
import LocationsPage from "./pages/locations/LocationsPage";
import TablesPage from "./pages/tables/TablesPage";
import WaitersPage from "./pages/waiters/WaitersPage";
import MenuPage from "./pages/menu/MenuPage";
import AdditionsPage from "./pages/additions/AdditionsPage";
import CustomersPage from "./pages/customers/CustomersPage";
import EveningPage from "./pages/evening/EveningPage";
import applicationStore from "./stores/ApplicationStore";

const {Map} = require('immutable');

export const HOME = "HOME";
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

        this.updateState = this.updateState.bind(this);
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
