import React from 'react';
import Page from "../Page";
import additionsPageActions from "./AdditionsPageActions";
import AdditionEditor from "./AdditionEditor";
import AdditionsNavigator from "./AdditionsNavigator";
import AdditionsNav from "./AdditionsNav";
import EditorMode from "../../utils/EditorMode";
import ViewController from "../../widgets/ViewController";
import additionsPageStore from "./AdditionsPageStore";
import AdditionCreator from "./AdditionCreator";
import applicationStore from "../../stores/ApplicationStore";
import dataStore from "../../stores/DataStore";

export default class AdditionsPage extends ViewController {

    constructor(props) {
        super(props, additionsPageStore, applicationStore, dataStore);
    }

    componentDidMount() {
        super.componentDidMount();
        additionsPageActions.initAdditionsPage();
    }

    render() {
        let pageContent = AdditionsPage.makePageContent(this.state);
        return (
            <Page title="Varianti">
                <AdditionsNav {...this.state.additions}/>
                {pageContent}
            </Page>
        )
    }

    static makePageContent(data) {
        const editorMode = data.additions.editor.mode;
        if (editorMode === EditorMode.EDITING) {
            return <AdditionEditor {...data.additions}/>
        } else if (editorMode === EditorMode.CREATING) {
            return <AdditionCreator {...data.additions}/>
        } else {
            return <AdditionsNavigator data={data.data} general={data.general} page={data.additions.navigator.page}/>
        }
    }

}