import React, {Component} from 'react';
import Page from "./Page";
import ConfigurationNav from "../components/ConfigurationNav";
import RestaurantNav from "../components/RestaurantNav";
import NavConfigurationButton from "../widgets/NavConfigurationButton";

class ConfigurationPage extends Component {
    render() {
        return (
            <Page title="Configurazione">
                <RestaurantNav>
                    <NavConfigurationButton active={true}/>
                </RestaurantNav>
                <ConfigurationNav/>
            </Page>
        );
    }
}

export default ConfigurationPage;
