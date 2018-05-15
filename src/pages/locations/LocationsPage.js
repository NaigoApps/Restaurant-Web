import React, {Component} from 'react';
import Page from "../Page";
import locationsPageStore from "./LocationsPageStore";
import locationsPageActions from "./LocationsPageActions";
import {LocationsEditorActions} from "./LocationsEditorActions";
import {findByUuid} from "../../utils/Utils";
import LocationEditor from "./LocationEditor";
import LocationsNavigator from "./LocationsNavigator";
import LocationsNav from "./LocationsNav";
import {LocationsCreatorActions} from "./LocationsCreatorActions";
import {EditorStatus} from "../StoresUtils";

const {fromJS} = require('immutable');

export default class LocationsPage extends Component {

    constructor(props) {
        super(props);
        this.state = locationsPageStore.getState();

        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        locationsPageStore.addChangeListener(this.updateState);

        locationsPageActions.initLocationsPage();
    }

    updateState(state) {
        this.setState(state);
    }

    componentWillUnmount() {
        locationsPageStore.removeChangeListener(this.updateState);
    }

    render() {
        let pageContent = LocationsPage.makePageContent(this.state.data);
        return (
            <Page title="Postazioni">
                <LocationsNav data={this.state.data}/>
                {pageContent}
            </Page>
        )
    }

    static makePageContent(state) {
        let editorStatus = state.get('editorStatus');
        if (editorStatus === EditorStatus.EDITING) {
            return <LocationEditor
                data={state}
                actionsProvider={LocationsEditorActions}
            />
        } else if (editorStatus === EditorStatus.CREATING) {
            return <LocationEditor
                data={state}
                actionsProvider={LocationsCreatorActions}
            />
        } else {
            return <LocationsNavigator data={state}/>
        }
    }
}