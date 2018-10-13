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

export default class LocationsPage extends ViewController {

    constructor(props) {
        super(props, locationsPageStore);
    }

    componentDidMount() {
        super.componentDidMount();
        LocationsPageActions.initLocationsPage();
    }

    render() {
        let pageContent = LocationsPage.makePageContent(this.state);
        return (
            <Page title="Postazioni" {...this.state.general}>
                <LocationsNav {...this.state}/>
                {pageContent}
            </Page>
        )
    }

    static makePageContent(data) {
        const editor = data.editor;
        if (editor.mode === EditorMode.EDITING) {
            return <LocationEditor {...data}/>
        } else if (editor.mode === EditorMode.CREATING) {
            return <LocationCreator {...data}/>
        } else {
            return <LocationsNavigator {...data}/>
        }
    }
}