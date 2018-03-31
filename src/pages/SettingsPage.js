import React, {Component} from 'react';
import Page from "./Page";
import RestaurantSettingsNav from "../components/RestaurantSettingsNav";
import FloatEditor from "../components/widgets/inputs/float/FloatEditor";

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
