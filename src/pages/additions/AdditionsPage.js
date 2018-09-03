import React, {Component} from 'react';
import Page from "../Page";
import additionsPageStore from "./AdditionsPageStore";
import additionsPageActions from "./AdditionsPageActions";
import {AdditionsEditorActions} from "./AdditionsEditorActions";
import AdditionEditor from "./AdditionEditor";
import AdditionsNavigator from "./AdditionsNavigator";
import {AdditionsCreatorActions} from "./AdditionsCreatorActions";
import AdditionsNav from "./AdditionsNav";
import EditorMode from "../../utils/EditorMode";

const {Map} = require('immutable');

export default class AdditionsPage extends Component {

    constructor(props) {
        super(props);
        this.state = additionsPageStore.getState();

        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        additionsPageStore.addChangeListener(this.updateState);

        additionsPageActions.initAdditionsPage();
    }

    updateState(state) {
        this.setState(state);
    }

    componentWillUnmount() {
        additionsPageStore.removeChangeListener(this.updateState);
    }


    render() {
        let pageContent = AdditionsPage.makePageContent(this.state.data);
        return (
            <Page title="Varianti">
                <AdditionsNav data={this.state.data}/>
                {pageContent}
            </Page>
        )
    }

    static makePageContent(state) {
        const editorStatus = state.get('editorStatus');
        if (editorStatus === EditorMode.EDITING) {
            return <AdditionEditor data={state} actionsProvider={AdditionsEditorActions}/>
        } else if (editorStatus === EditorMode.CREATING) {
            return <AdditionEditor data={state} actionsProvider={AdditionsCreatorActions}/>
        } else {
            return <AdditionsNavigator data={state}/>
        }
    }

}