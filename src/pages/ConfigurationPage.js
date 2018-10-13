import React, {Component} from 'react';
import Page from "./Page";
import ConfigurationNav from "../components/ConfigurationNav";
import RestaurantNav from "../components/RestaurantNav";
import NavConfigurationButton from "../widgets/NavConfigurationButton";
import ViewController from "../widgets/ViewController";
import applicationStore from "../stores/ApplicationStore";

class ConfigurationPage extends ViewController {

    constructor(props){
        super(props, applicationStore);
    }

    render() {
        return (
            <Page title="Configurazione" {...this.state}>
                <RestaurantNav>
                    <NavConfigurationButton active={true}/>
                </RestaurantNav>
                <ConfigurationNav/>
            </Page>
        );
    }
}

export default ConfigurationPage;
