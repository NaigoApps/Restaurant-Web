import React, {Component} from 'react';
import Page from "../Page";
import printersPageStore from "./PrintersPageStore";
import printersPageActions from "./PrintersPageActions";
import PrinterEditor from "./PrinterEditor";
import PrintersNavigator from "./PrintersNavigator";
import PrintersNav from "./PrintersNav";
import {EditorStatus} from "../StoresUtils";
import {PrintersCreatorActions} from "./PrintersCreatorActions";
import {PrintersEditorActions} from "./PrintersEditorActions";

const {fromJS, Map} = require('immutable');

export default class PrintersPage extends Component {

    constructor(props) {
        super(props);
        this.state = printersPageStore.getState();

        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        printersPageStore.addChangeListener(this.updateState);

        printersPageActions.initPrintersPage();
    }

    updateState(state) {
        this.setState(state);
    }

    componentWillUnmount() {
        printersPageStore.removeChangeListener(this.updateState);
    }

    render() {
        let pageContent = this.makePageContent();
        return (
            <Page title="Stampanti">
                <PrintersNav data={this.state.data}/>
                {pageContent}
            </Page>
        )
    }

    makePageContent() {
        let state = this.state.data;
        switch (state.get('status')) {
            case EditorStatus.EDITING:
                return <PrinterEditor
                    data={state}
                    actionsProvider={PrintersEditorActions}
                />;
            case EditorStatus.CREATING:
                return <PrinterEditor
                    data={state}
                    actionsProvider={PrintersCreatorActions}
                />;
            default:
                return <PrintersNavigator data={state}/>
        }
    }

}