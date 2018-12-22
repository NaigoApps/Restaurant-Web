import React from 'react';
import Page from "../Page";
import locationsPageStore from "./LocationsPageStore";
import LocationEditor from "./LocationEditor";
import LocationsNavigator from "./LocationsNavigator";
import LocationsNav from "./LocationsNav";
import EditorMode from "../../utils/EditorMode";
import ViewController from "../../widgets/ViewController";
import LocationCreator from "./LocationCreator";
import {LocationsPageActions} from "./LocationsPageActions";
import applicationStore from "../../stores/ApplicationStore";
import dataStore from "../../stores/DataStore";

export default class LocationsPage extends ViewController {

    constructor(props) {
        super(props, locationsPageStore, applicationStore, dataStore);
    }

    componentDidMount() {
        super.componentDidMount();
        LocationsPageActions.initLocationsPage();
    }

    render() {
        let pageContent = LocationsPage.makePageContent(this.state);
        return (
            <Page title="Postazioni">
                <LocationsNav {...this.state.locations}/>
                {pageContent}
            </Page>
        )
    }

    static makePageContent(data) {
        const editor = data.locations.editor;
        if (editor.mode === EditorMode.EDITING) {
            return <LocationEditor {...data.locations} data={data.data}/>
        } else if (editor.mode === EditorMode.CREATING) {
            return <LocationCreator {...data.locations} data={data.data}/>
        } else {
            return <LocationsNavigator data={data.data} general={data.general} page={data.locations.navigator.page}/>
        }
    }
}