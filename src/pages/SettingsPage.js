import React, {Component} from 'react';
import Page from "./Page";
import RestaurantSettingsNav from "../components/RestaurantSettingsNav";

class SettingsPage extends Component {
    render() {
        return (
            <Page title="Opzioni">
                <RestaurantSettingsNav/>
            </Page>
        );
    }
}

export default SettingsPage;
